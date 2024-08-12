importScripts('TerrainGenerator.js');

const terrainGenerator = new TerrainGenerator();

self.onmessage = function(e) {
  const { action, chunkX, chunkZ } = e.data;

  if (action === 'generateChunk') {
    const chunk = terrainGenerator.generateChunk(chunkX, chunkZ);
    self.postMessage({
      action: 'chunkGenerated',
      chunkX,
      chunkZ,
      chunk
    });
  }
};