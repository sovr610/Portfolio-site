import * as THREE from 'three';
import TerrainGenerator from './TerrainGenerator';
import ChunkPool from './ChunkLoader';
import MinecraftSky from './MinecraftSky';

class MinecraftWorld {
  constructor(params = {}) {
    this.CHUNK_SIZE = params.chunkSize || 16;
    this.WORLD_HEIGHT = params.worldHeight || 256;
    this.RENDER_DISTANCE = params.renderDistance || 8;
    this.BLOCK_SIZE = params.blockSize || 1;
    this.UPDATE_INTERVAL = params.updateInterval || 1000;

    this.CHUNK_VOLUME = this.CHUNK_SIZE * this.CHUNK_SIZE * this.WORLD_HEIGHT;
    this.BLOCK_TYPES = {};
    this.chunks = new Map();
    this.terrainGenerator = new TerrainGenerator(params);

    this.playerChunk = { x: 0, z: 0 };
    this.playerPosition = { x: 0, y: 0, z: 0 };
    
    this.camera = null;
    this.frustum = new THREE.Frustum();
    this.projScreenMatrix = new THREE.Matrix4();
    this.cameraViewProjectionMatrix = new THREE.Matrix4();
    this.chunkBoundingSpheres = new Map();

    this.chunkPool = new ChunkPool(100);
    this.dirtyChunks = new Set();

    this.worker = new Worker(new URL('./ChunkWorker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = this.handleWorkerMessage.bind(this);

    this.sky = null;
    this.lastTime = 0;
    
    this.scene = null;
    this.cameraReady = false;
  }

  init(scene, camera) {
    this.scene = scene;
    this.setCamera(camera);
    this.loadInitialChunks();
    this.placePlayerOnGround(scene);
    this.startBlockUpdates();
    this.initChunkBoundingSpheres();

    this.sky = new MinecraftSky(scene, {
      worldSize: this.RENDER_DISTANCE * this.CHUNK_SIZE * this.BLOCK_SIZE * 2,
      cloudHeight: this.WORLD_HEIGHT * this.BLOCK_SIZE * 0.8
    });

    this.waitForCamera();
  }

  setCamera(camera) {
    this.camera = camera;
    this.cameraReady = false;
  }

  waitForCamera() {
    if (this.camera.components && this.camera.components.camera && this.camera.components.camera.camera) {
      this.cameraReady = true;
      console.log('Camera is ready');
    } else {
      console.log('Waiting for camera to initialize...');
      setTimeout(() => this.waitForCamera(), 100);
    }
  }

  loadInitialChunks() {
    const chunkX = Math.floor(this.playerPosition.x / this.CHUNK_SIZE);
    const chunkZ = Math.floor(this.playerPosition.z / this.CHUNK_SIZE);
    this.playerChunk = { x: chunkX, z: chunkZ };
    
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const cx = chunkX + dx;
        const cz = chunkZ + dz;
        const chunkKey = `${cx},${cz}`;
        if (!this.chunks.has(chunkKey)) {
          this.worker.postMessage({ action: 'generateChunk', chunkX: cx, chunkZ: cz });
        }
      }
    }
  }

  handleWorkerMessage(event) {
    const { action, chunkX, chunkZ, chunk } = event.data;
    if (action === 'chunkGenerated') {
      const chunkKey = `${chunkX},${chunkZ}`;
      this.chunks.set(chunkKey, chunk);
      this.renderChunk(chunk, chunkX, chunkZ);
    }
  }

  placePlayerOnGround(scene) {
    const chunkX = this.playerChunk.x;
    const chunkZ = this.playerChunk.z;
    const localX = Math.floor(this.playerPosition.x % this.CHUNK_SIZE);
    const localZ = Math.floor(this.playerPosition.z % this.CHUNK_SIZE);
    
    const chunk = this.chunks.get(`${chunkX},${chunkZ}`);
    if (!chunk) return;
    
    let y = this.WORLD_HEIGHT - 1;
    while (y > 0 && chunk[this.getBlockIndex(localX, y, localZ)] === 0) {
      y--;
    }
    
    this.playerPosition.y = (y + 1) * this.BLOCK_SIZE;
    
    if (this.camera) {
      this.camera.setAttribute('position', {
        x: this.playerPosition.x * this.BLOCK_SIZE,
        y: this.playerPosition.y + 1.6,
        z: -this.playerPosition.z * this.BLOCK_SIZE
      });
    }
    
    const playerEntity = scene.querySelector('#player');
    if (playerEntity) {
      playerEntity.setAttribute('position', {
        x: this.playerPosition.x * this.BLOCK_SIZE,
        y: this.playerPosition.y,
        z: -this.playerPosition.z * this.BLOCK_SIZE
      });
    }
  }

  addBlockType(block) {
    if (!block || typeof block !== 'object' || !block.name) return;
    this.BLOCK_TYPES[block.name] = block;
  }

  updatePlayerPosition(x, y, z) {
    this.playerPosition = { x, y, z };
    const chunkX = Math.floor(x / this.CHUNK_SIZE);
    const chunkZ = Math.floor(z / this.CHUNK_SIZE);

    if (chunkX !== this.playerChunk.x || chunkZ !== this.playerChunk.z) {
      this.playerChunk = { x: chunkX, z: chunkZ };
      this.loadChunks();
      this.unloadDistantChunks();
    }

    this.terrainGenerator.updatePlayerPosition(x, y, z);
  }

  loadChunks() {
    const chunksToLoad = [];
    for (let dx = -this.RENDER_DISTANCE; dx <= this.RENDER_DISTANCE; dx++) {
      for (let dz = -this.RENDER_DISTANCE; dz <= this.RENDER_DISTANCE; dz++) {
        const chunkX = this.playerChunk.x + dx;
        const chunkZ = this.playerChunk.z + dz;
        const distance = Math.max(Math.abs(dx), Math.abs(dz));
        chunksToLoad.push({ chunkX, chunkZ, distance });
      }
    }
    
    chunksToLoad.sort((a, b) => a.distance - b.distance);
    
    for (const { chunkX, chunkZ } of chunksToLoad) {
      const chunkKey = `${chunkX},${chunkZ}`;
      if (!this.chunks.has(chunkKey)) {
        this.worker.postMessage({ action: 'generateChunk', chunkX, chunkZ });
      }
    }
  }

  unloadDistantChunks() {
    for (const [chunkKey, chunk] of this.chunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      const distance = Math.max(
        Math.abs(chunkX - this.playerChunk.x),
        Math.abs(chunkZ - this.playerChunk.z)
      );

      if (distance > this.RENDER_DISTANCE + 2) {
        this.chunks.delete(chunkKey);
        this.removeChunkFromScene(chunkX, chunkZ);
        this.chunkBoundingSpheres.delete(chunkKey);
      }
    }
  }

  renderChunk(chunk, chunkX, chunkZ) {
    const chunkEntity = document.createElement('a-entity');
    chunkEntity.setAttribute('id', `chunk-${chunkX}-${chunkZ}`);

    for (let x = 0; x < this.CHUNK_SIZE; x++) {
      for (let y = 0; y < this.WORLD_HEIGHT; y++) {
        for (let z = 0; z < this.CHUNK_SIZE; z++) {
          const blockType = chunk[this.getBlockIndex(x, y, z)];
          if (blockType === 0) continue; // Skip air blocks

          if (this.isBlockExposed(chunk, x, y, z)) {
            const blockEntity = document.createElement('a-box');
            blockEntity.setAttribute('position', {
              x: x + chunkX * this.CHUNK_SIZE,
              y: y,
              z: z + chunkZ * this.CHUNK_SIZE
            });
            blockEntity.setAttribute('width', this.BLOCK_SIZE);
            blockEntity.setAttribute('height', this.BLOCK_SIZE);
            blockEntity.setAttribute('depth', this.BLOCK_SIZE);

            const blockTypeName = this.getBlockTypeName(blockType);
            if (this.BLOCK_TYPES[blockTypeName]) {
              const material = this.BLOCK_TYPES[blockTypeName].material;
              for (const [key, value] of Object.entries(material)) {
                blockEntity.setAttribute(key, value);
              }
            }

            chunkEntity.appendChild(blockEntity);
          }
        }
      }
    }

    this.scene.appendChild(chunkEntity);
    this.createChunkBoundingSphere(chunkX, chunkZ);
  }

  removeChunkFromScene(chunkX, chunkZ) {
    const chunkEntity = document.querySelector(`#chunk-${chunkX}-${chunkZ}`);
    if (chunkEntity) {
      chunkEntity.parentNode.removeChild(chunkEntity);
    }
  }

  getBlock(x, y, z) {
    const chunkX = Math.floor(x / this.CHUNK_SIZE);
    const chunkZ = Math.floor(z / this.CHUNK_SIZE);
    const chunkKey = `${chunkX},${chunkZ}`;

    const chunk = this.chunks.get(chunkKey);
    if (chunk) {
      const localX = Math.floor(x % this.CHUNK_SIZE);
      const localZ = Math.floor(z % this.CHUNK_SIZE);
      return chunk[this.getBlockIndex(localX, y, localZ)];
    }
    return 0;
  }

  setBlock(x, y, z, blockType) {
    const chunkX = Math.floor(x / this.CHUNK_SIZE);
    const chunkZ = Math.floor(z / this.CHUNK_SIZE);
    const chunkKey = `${chunkX},${chunkZ}`;

    let chunk = this.chunks.get(chunkKey);
    if (!chunk) {
      this.worker.postMessage({ action: 'generateChunk', chunkX, chunkZ });
      return;
    }

    const localX = x % this.CHUNK_SIZE;
    const localZ = z % this.CHUNK_SIZE;

    if (y >= 0 && y < this.WORLD_HEIGHT) {
      const index = this.getBlockIndex(localX, y, localZ);
      const oldBlockType = chunk[index];
      const newBlockTypeId = this.getBlockTypeId(blockType);
      chunk[index] = newBlockTypeId;

      if (oldBlockType !== newBlockTypeId) {
        this.dirtyChunks.add(chunkKey);
        this.updateNeighborChunks(chunkX, chunkZ);
      }
    }
  }

  updateNeighborChunks(chunkX, chunkZ) {
    const neighbors = [
      [chunkX - 1, chunkZ], [chunkX + 1, chunkZ],
      [chunkX, chunkZ - 1], [chunkX, chunkZ + 1]
    ];

    for (const [neighborX, neighborZ] of neighbors) {
      const neighborKey = `${neighborX},${neighborZ}`;
      if (this.chunks.has(neighborKey)) {
        this.dirtyChunks.add(neighborKey);
      }
    }
  }

  startBlockUpdates() {
    setInterval(() => {
      this.updateBlocks();
    }, this.UPDATE_INTERVAL);
  }

  updateBlocks() {
    for (const chunkKey of this.dirtyChunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      this.updateChunkGeometry(chunkX, chunkZ);
    }
    this.dirtyChunks.clear();
  }

  updateChunkGeometry(chunkX, chunkZ) {
    const chunk = this.chunks.get(`${chunkX},${chunkZ}`);
    if (!chunk) return;

    this.removeChunkFromScene(chunkX, chunkZ);
    this.renderChunk(chunk, chunkX, chunkZ);
  }

  isBlockExposed(chunk, x, y, z) {
    const neighbors = [
      [x - 1, y, z], [x + 1, y, z],
      [x, y - 1, z], [x, y + 1, z],
      [x, y, z - 1], [x, y, z + 1]
    ];

    for (const [nx, ny, nz] of neighbors) {
      if (nx < 0 || nx >= this.CHUNK_SIZE || nz < 0 || nz >= this.CHUNK_SIZE || ny < 0 || ny >= this.WORLD_HEIGHT) {
        return true;
      }
      if (chunk[this.getBlockIndex(nx, ny, nz)] === 0) {
        return true;
      }
    }

    return false;
  }

  getBlockIndex(x, y, z) {
    return (y * this.CHUNK_SIZE * this.CHUNK_SIZE) + (z * this.CHUNK_SIZE) + x;
  }

  getBlockTypeId(blockType) {
    const blockTypeMap = {
      'AIR': 0,
      'GRASS': 1,
      'DIRT': 2,
      'STONE': 3,
      'WATER': 4,
      'SAND': 5,
      'GRAVEL': 6,
      'SNOW': 7,
      'LOG': 8,
      'LEAVES': 9,
      'FLOWER': 10,
      'LAVA': 11,
      'DIAMOND_ORE': 12,
      'GOLD_ORE': 13,
      'IRON_ORE': 14,
      'COAL_ORE': 15,
      'STALAGMITE': 16,
      'STALACTITE': 17
    };
    return blockTypeMap[blockType] || 0;
  }

getBlockTypeName(blockTypeId) {
    const blockTypeNames = [
      'AIR', 'GRASS', 'DIRT', 'STONE', 'WATER', 'SAND', 'GRAVEL', 'SNOW',
      'LOG', 'LEAVES', 'FLOWER', 'LAVA', 'DIAMOND_ORE', 'GOLD_ORE',
      'IRON_ORE', 'COAL_ORE', 'STALAGMITE', 'STALACTITE'
    ];
    return blockTypeNames[blockTypeId] || 'AIR';
  }

  updateFrustum() {
    if (!this.cameraReady) {
      return;
    }

    const cameraEl = this.camera.components.camera.camera;
    if (!cameraEl || !cameraEl.projectionMatrix || !cameraEl.matrixWorldInverse) {
      console.warn('Camera matrices are not available');
      return;
    }

    try {
      this.camera.object3D.updateMatrixWorld();
      this.cameraViewProjectionMatrix.multiplyMatrices(
        cameraEl.projectionMatrix,
        cameraEl.matrixWorldInverse
      );
      this.frustum.setFromProjectionMatrix(this.cameraViewProjectionMatrix);
    } catch (error) {
      console.error('Error updating frustum:', error);
    }
  }

  initChunkBoundingSpheres() {
    for (const [chunkKey, chunk] of this.chunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      this.createChunkBoundingSphere(chunkX, chunkZ);
    }
  }

  createChunkBoundingSphere(chunkX, chunkZ) {
    const center = new THREE.Vector3(
      (chunkX + 0.5) * this.CHUNK_SIZE * this.BLOCK_SIZE,
      this.WORLD_HEIGHT / 2 * this.BLOCK_SIZE,
      (chunkZ + 0.5) * this.CHUNK_SIZE * this.BLOCK_SIZE
    );
    const radius = Math.sqrt(
      Math.pow(this.CHUNK_SIZE * this.BLOCK_SIZE / 2, 2) +
      Math.pow(this.CHUNK_SIZE * this.BLOCK_SIZE / 2, 2) +
      Math.pow(this.WORLD_HEIGHT * this.BLOCK_SIZE / 2, 2)
    );
    this.chunkBoundingSpheres.set(`${chunkX},${chunkZ}`, new THREE.Sphere(center, radius));
  }

  isChunkVisible(chunkX, chunkZ) {
    const boundingSphere = this.chunkBoundingSpheres.get(`${chunkX},${chunkZ}`);
    if (!boundingSphere) return false;
    return this.frustum.intersectsSphere(boundingSphere);
  }

  updateVisibleChunks() {
    if (!this.cameraReady) {
      return;
    }

    this.updateFrustum();
    
    for (const [chunkKey, chunk] of this.chunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      const chunkEntity = document.querySelector(`#chunk-${chunkX}-${chunkZ}`);
      
      if (chunkEntity) {
        const isVisible = this.isChunkVisible(chunkX, chunkZ);
        chunkEntity.object3D.visible = isVisible;
      }
    }
  }

  update(currentTime) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    try {
      if (this.cameraReady) {
        this.updateVisibleChunks();
      }
      
      this.updateBlocks();

      // Update the sky
      if (this.sky) {
        this.sky.update(deltaTime);
      }
    } catch (error) {
      console.error('Error in MinecraftWorld update:', error);
    }
  }
}

export default MinecraftWorld;