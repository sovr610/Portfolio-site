import * as THREE from 'three';

class MinecraftSky {
    constructor(scene, params = {}) {
        this.scene = scene;
        this.skyColor = params.skyColor || 0x87CEEB;
        this.sunColor = params.sunColor || 0xFFFFFF;
        this.cloudColor = params.cloudColor || 0xFFFFFF;
        this.cloudCount = params.cloudCount || 20;
        this.worldSize = params.worldSize || 1000;
        this.cloudHeight = params.cloudHeight || 200;
        this.cloudSpeed = params.cloudSpeed || 0.2;

        this.createSky();
        this.createSun();
        this.createClouds();
    }

    createSky() {
        const skyGeometry = new THREE.SphereGeometry(this.worldSize, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({
            color: this.skyColor,
            side: THREE.BackSide
        });
        this.skyDome = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(this.skyDome);
    }

    createSun() {
        const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: this.sunColor });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.position.set(this.worldSize / 2, this.worldSize / 2, -this.worldSize / 2);
        this.scene.add(this.sun);
    }

    createClouds() {
        this.clouds = new THREE.Group();
        const cloudGeometry = new THREE.PlaneGeometry(100, 100);
        const cloudTexture = new THREE.TextureLoader().load('path/to/cloud_texture.png');
        const cloudMaterial = new THREE.MeshBasicMaterial({
            map: cloudTexture,
            transparent: true,
            depthWrite: false
        });

        for (let i = 0; i < this.cloudCount; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            cloud.position.set(
                Math.random() * this.worldSize - this.worldSize / 2,
                this.cloudHeight,
                Math.random() * this.worldSize - this.worldSize / 2
            );
            cloud.rotation.x = -Math.PI / 2;
            this.clouds.add(cloud);
        }

        this.scene.add(this.clouds);
    }

    update(deltaTime) {
        // Move clouds
        this.clouds.children.forEach(cloud => {
            cloud.position.x += this.cloudSpeed * deltaTime;
            if (cloud.position.x > this.worldSize / 2) {
                cloud.position.x = -this.worldSize / 2;
            }
        });

        // Rotate sun (optional)
        this.sun.rotation.y += 0.001 * deltaTime;
    }
}

export default MinecraftSky;