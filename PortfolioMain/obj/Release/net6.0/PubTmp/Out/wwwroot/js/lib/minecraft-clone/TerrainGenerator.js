import SimplexNoise from 'simplex-noise';

class TerrainGenerator {
  constructor(params = {}) {
    this.CHUNK_SIZE = params.chunkSize || 16;
    this.WORLD_HEIGHT = params.worldHeight || 256;
    this.RENDER_DISTANCE = params.renderDistance || 8;
    this.UNLOAD_DISTANCE = this.RENDER_DISTANCE + 2;

    this.BASE_SCALE = params.baseScale || 0.01;
    this.MOUNTAIN_SCALE = params.mountainScale || 0.008;
    this.HILL_SCALE = params.hillScale || 0.05;
    this.VALLEY_SCALE = params.valleyScale || 0.03;
    
    this.BASE_ELEVATION = params.baseElevation || 64;
    this.MOUNTAIN_ELEVATION = params.mountainElevation || 32;
    this.HILL_ELEVATION = params.hillElevation || 16;
    this.VALLEY_DEPTH = params.valleyDepth || 8;

    this.MOISTURE_SCALE = params.moistureScale || 0.007;
    this.TEMPERATURE_SCALE = params.temperatureScale || 0.005;

    this.CAVE_SCALE = params.caveScale || 0.03;
    this.CAVE_THRESHOLD = params.caveThreshold || 0.3;
    this.TUNNEL_SCALE = params.tunnelScale || 0.05;
    this.TUNNEL_THRESHOLD = params.tunnelThreshold || 0.7;
    this.CAVERN_SCALE = params.cavernScale || 0.02;
    this.CAVERN_THRESHOLD = params.cavernThreshold || 0.6;

    this.ORE_SCALES = params.oreScales || {
      DIAMOND: 0.1,
      GOLD: 0.08,
      IRON: 0.06,
      COAL: 0.05
    };
    this.ORE_THRESHOLDS = params.oreThresholds || {
      DIAMOND: 0.8,
      GOLD: 0.7,
      IRON: 0.6,
      COAL: 0.5
    };
    this.ORE_MAX_HEIGHTS = params.oreMaxHeights || {
      DIAMOND: 16,
      GOLD: 32,
      IRON: 64,
      COAL: 128
    };

    this.simplex = new SimplexNoise(params.seed);
    this.generatedChunks = new Map();
    this.lastPlayerChunk = { x: 0, z: 0 };

    this.CHUNK_VOLUME = this.CHUNK_SIZE * this.CHUNK_SIZE * this.WORLD_HEIGHT;
  }

  generateChunk(chunkX, chunkZ) {
    const chunkKey = this.getChunkKey(chunkX, chunkZ);
    if (this.generatedChunks.has(chunkKey)) {
      return this.generatedChunks.get(chunkKey);
    }

    const chunk = new Uint8Array(this.CHUNK_VOLUME);

    for (let x = 0; x < this.CHUNK_SIZE; x++) {
      for (let z = 0; z < this.CHUNK_SIZE; z++) {
        const worldX = chunkX * this.CHUNK_SIZE + x;
        const worldZ = chunkZ * this.CHUNK_SIZE + z;
        const elevation = this.getElevation(worldX, worldZ);
        const moisture = this.getMoisture(worldX, worldZ);
        const temperature = this.getTemperature(worldX, worldZ);

        for (let y = 0; y < this.WORLD_HEIGHT; y++) {
          const blockType = this.getBlockType(worldX, y, worldZ, elevation, moisture, temperature);
          chunk[this.getBlockIndex(x, y, z)] = this.getBlockTypeId(blockType);
        }

        this.addBiomeFeatures(chunk, x, elevation, z, worldX, worldZ);
      }
    }

    this.generateCaveDecorations(chunk, chunkX, chunkZ);
    this.generatedChunks.set(chunkKey, chunk);
    return chunk;
  }

  getElevation(x, z) {
    let elevation = this.simplex.noise2D(x * this.BASE_SCALE, z * this.BASE_SCALE);
    
    const mountainNoise = this.simplex.noise2D(x * this.MOUNTAIN_SCALE, z * this.MOUNTAIN_SCALE);
    elevation += Math.pow(Math.max(0, mountainNoise), 2) * this.MOUNTAIN_ELEVATION;
    
    const hillNoise = this.simplex.noise2D(x * this.HILL_SCALE, z * this.HILL_SCALE);
    elevation += (hillNoise + 1) * this.HILL_ELEVATION;
    
    const valleyNoise = this.simplex.noise2D(x * this.VALLEY_SCALE, z * this.VALLEY_SCALE);
    elevation -= Math.abs(valleyNoise) * this.VALLEY_DEPTH;

    elevation = (elevation + 1) * 0.5 * this.BASE_ELEVATION;
    
    return Math.floor(Math.max(0, Math.min(this.WORLD_HEIGHT - 1, elevation)));
  }

  getMoisture(x, z) {
    return (this.simplex.noise2D(x * this.MOISTURE_SCALE, z * this.MOISTURE_SCALE) + 1) * 0.5;
  }

  getTemperature(x, z) {
    return (this.simplex.noise2D((x + 1000) * this.TEMPERATURE_SCALE, (z + 1000) * this.TEMPERATURE_SCALE) + 1) * 0.5;
  }

  getBlockType(x, y, z, elevation, moisture, temperature) {
    if (y < elevation) {
      const isCave = this.isCave(x, y, z);
      if (!isCave) {
        if (y === elevation - 1) {
          return this.getSurfaceBlock(elevation, moisture, temperature);
        }
        if (y > elevation - 4) return 'DIRT';
        return this.generateOre(x, y, z);
      }
      if (y < this.WORLD_HEIGHT * 0.1) return 'LAVA';
    } else if (y < this.WORLD_HEIGHT * 0.4) {
      return 'WATER';
    }
    return 'AIR';
  }

  getSurfaceBlock(elevation, moisture, temperature) {
    if (elevation > this.BASE_ELEVATION * 0.8) return 'SNOW';
    if (elevation > this.BASE_ELEVATION * 0.6) return 'STONE';
    if (moisture > 0.6 && temperature > 0.5) return 'GRASS';
    if (moisture > 0.3 && temperature > 0.3) return 'DIRT';
    if (temperature > 0.7) return 'SAND';
    return 'GRAVEL';
  }

  isCave(x, y, z) {
    const caveNoise = this.simplex.noise3D(x * this.CAVE_SCALE, y * this.CAVE_SCALE, z * this.CAVE_SCALE);
    const tunnelNoise = this.simplex.noise3D(x * this.TUNNEL_SCALE, y * this.TUNNEL_SCALE, z * this.TUNNEL_SCALE);
    const cavernNoise = this.simplex.noise3D(x * this.CAVERN_SCALE, y * this.CAVERN_SCALE, z * this.CAVERN_SCALE);

    return caveNoise > this.CAVE_THRESHOLD || 
           (tunnelNoise > this.TUNNEL_THRESHOLD && y < this.WORLD_HEIGHT / 2) || 
           (cavernNoise > this.CAVERN_THRESHOLD && y < this.WORLD_HEIGHT / 3);
  }

  generateOre(x, y, z) {
    for (const [ore, scale] of Object.entries(this.ORE_SCALES)) {
      const oreNoise = this.simplex.noise3D(x * scale, y * scale, z * scale);
      if (oreNoise > this.ORE_THRESHOLDS[ore] && y < this.ORE_MAX_HEIGHTS[ore]) {
        return `${ore}_ORE`;
      }
    }
    return 'STONE';
  }

  addBiomeFeatures(chunk, x, elevation, z, worldX, worldZ) {
    if (elevation > this.BASE_ELEVATION * 0.6 && this.getMoisture(worldX, worldZ) > 0.6 && this.getTemperature(worldX, worldZ) > 0.4) {
      this.generateTree(chunk, x, elevation, z);
    } else if (elevation > this.BASE_ELEVATION * 0.3 && this.getMoisture(worldX, worldZ) > 0.3 && this.getTemperature(worldX, worldZ) > 0.5) {
      if (Math.random() < 0.1) {
        chunk[this.getBlockIndex(x, elevation, z)] = this.getBlockTypeId('FLOWER');
      }
    }
  }

  generateTree(chunk, x, baseY, z) {
    const treeHeight = Math.floor(Math.random() * 3) + 4;
    for (let y = baseY; y < baseY + treeHeight && y < this.WORLD_HEIGHT; y++) {
      chunk[this.getBlockIndex(x, y, z)] = this.getBlockTypeId('LOG');
    }
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        for (let dy = 0; dy <= 2; dy++) {
          if (Math.abs(dx) + Math.abs(dz) + Math.abs(dy) <= 3) {
            const nx = x + dx, ny = baseY + treeHeight - 1 + dy, nz = z + dz;
            if (this.isInChunk(nx, ny, nz) && chunk[this.getBlockIndex(nx, ny, nz)] === this.getBlockTypeId('AIR')) {
              chunk[this.getBlockIndex(nx, ny, nz)] = this.getBlockTypeId('LEAVES');
            }
          }
        }
      }
    }
  }

  generateCaveDecorations(chunk, chunkX, chunkZ) {
    for (let x = 0; x < this.CHUNK_SIZE; x++) {
      for (let y = 0; y < this.WORLD_HEIGHT; y++) {
        for (let z = 0; z < this.CHUNK_SIZE; z++) {
          const index = this.getBlockIndex(x, y, z);
          if (chunk[index] === this.getBlockTypeId('AIR')) {
            if (y < this.WORLD_HEIGHT - 1 && chunk[this.getBlockIndex(x, y + 1, z)] !== this.getBlockTypeId('AIR')) {
              if (Math.random() < 0.05) {
                chunk[index] = this.getBlockTypeId('STALAGMITE');
              }
            } else if (y > 0 && chunk[this.getBlockIndex(x, y - 1, z)] !== this.getBlockTypeId('AIR')) {
              if (Math.random() < 0.05) {
                chunk[index] = this.getBlockTypeId('STALACTITE');
              }
            }
          }
        }
      }
    }
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

  isInChunk(x, y, z) {
    return x >= 0 && x < this.CHUNK_SIZE &&
           y >= 0 && y < this.WORLD_HEIGHT &&
           z >= 0 && z < this.CHUNK_SIZE;
  }

  getChunkKey(chunkX, chunkZ) {
    return `${chunkX},${chunkZ}`;
  }

  updatePlayerPosition(playerX, playerY, playerZ) {
    const playerChunkX = Math.floor(playerX / this.CHUNK_SIZE);
    const playerChunkZ = Math.floor(playerZ / this.CHUNK_SIZE);

    if (playerChunkX !== this.lastPlayerChunk.x || playerChunkZ !== this.lastPlayerChunk.z) {
      this.lastPlayerChunk = { x: playerChunkX, z: playerChunkZ };
      this.unloadDistantChunks(playerChunkX, playerChunkZ);
    }
  }

  unloadDistantChunks(playerChunkX, playerChunkZ) {
    for (const [chunkKey, chunk] of this.generatedChunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      const distance = Math.max(Math.abs(chunkX - playerChunkX), Math.abs(chunkZ - playerChunkZ));

      if (distance > this.UNLOAD_DISTANCE) {
        this.generatedChunks.delete(chunkKey);
      }
    }
  }

  getChunksToRender(playerChunkX, playerChunkZ) {
    const chunksToRender = [];

    for (let dx = -this.RENDER_DISTANCE; dx <= this.RENDER_DISTANCE; dx++) {
      for (let dz = -this.RENDER_DISTANCE; dz <= this.RENDER_DISTANCE; dz++) {
        const chunkX = playerChunkX + dx;
        const chunkZ = playerChunkZ + dz;
        chunksToRender.push(this.generateChunk(chunkX, chunkZ));
      }
    }

    return chunksToRender;
  }
}


export default TerrainGenerator;