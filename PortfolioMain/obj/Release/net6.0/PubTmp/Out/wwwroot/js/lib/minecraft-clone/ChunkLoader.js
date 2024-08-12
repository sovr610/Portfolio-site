class ChunkPool {
    constructor(size) {
      this.pool = new Array(size).fill().map(() => this.createChunkEntity());
      this.inUse = new Set();
    }
  
    createChunkEntity() {
      return document.createElement('a-entity');
    }
  
    getChunk() {
      const chunk = this.pool.find(c => !this.inUse.has(c));
      if (chunk) {
        this.inUse.add(chunk);
        return chunk;
      }
      return this.createChunkEntity();
    }
  
    releaseChunk(chunk) {
      chunk.innerHTML = '';
      this.inUse.delete(chunk);
    }
  }

  export default ChunkPool;