const gameConfig = { "game-art": {
    scene: `
    <style>
        /* Loading screen styles */
        #loading-screen-xr {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: black;
            color: #00ff00;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: 'Courier New', Courier, monospace;
        }

        #loading-text-xr {
            font-size: 24px;
            margin-bottom: 20px;
        }

        #progress-bar-xr {
            width: 80%;
            height: 20px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        #progress-xr {
            height: 100%;
            background-color: #00ff00;
            width: 0;
            transition: width 0.2s ease;
        }

        #percentage-xr {
            font-size: 18px;
        }
    </style>


        <div id="loading-screen-xr">
        <div id="loading-text-xr">Loading the Virtual World...</div>
        <div id="progress-bar-xr">
            <div id="progress-xr"></div>
        </div>
        <div id="percentage-xr">0%</div>
    </div>

    <a-scene id="scener" effects="bloom, fxaa, godrays" fxaa="true" godrays="src: #sun; threshold: 0. 2; intensity: 9" bloom="strength: 0.6; radius:0.2;" renderer="antialias: true; physicallyCorrectLights: true; shadows: true; toneMapping:ACESFilmic" vr-mode-ui="enabled: true">
        <a-assets>
        <a-asset-item id="room-model" src="assets/games/art-gallery-resources/art-gallery-final.glb"></a-asset-item>
        <img id="normal-map" src="assets/games/art-gallery-resources/main-normal.png">
        <img id="env-map" src="assets/games/art-gallery-resources/floor_4K_Albedo.jpg">
      </a-assets>

      <!-- Camera with controls and boundary constraint -->
      <a-entity position="0 1.6 0">
        <a-camera look-controls wasd-controls boundary-constraint="minX: -12; maxX: 12; minY: 12; maxY: 12; minZ: -12; maxZ: 12">
          <!-- Post-processing effects -->
          <a-entity light="type: point; intensity: 0.35; distance: 0; decay: 2" position="0 0 -1"></a-entity>
        </a-camera>
      </a-entity>

      <!-- Load the GLB model with all enhancements -->
      <a-entity gltf-model="#room-model" 
                material="shader: custom-material; color: #ffffff; roughness: 0.7; metalness: 0.2; normalMap: #normal-map; envMap: #env-map"
                model-setup
                render-order="order: 0"
                shadow-material></a-entity>

      <!-- Enhanced lighting with improved shadow settings -->
      <a-light type="ambient" color="#BBB" intensity="0.3"></a-light>
      <a-light type="directional" 
               color="#FFF" 
               intensity="0.8" 
               position="-1 1 2" 
               cast-shadow="true" 
               shadow="mapSize: 4096x4096; bias: -0.0001; radius: 1"></a-light>
      <a-light type="point" 
               color="#FFF" 
               intensity="0.6" 
               position="2 4 -2" 
               cast-shadow="true"
               shadow="mapSize: 1024x1024; bias: -0.0001; radius: 1"></a-light>
       <a-entity id="sun" geometry="primitive: sphere; radius: 10;" material="shader: flat; transparent: true; color: #ffffff"
               light="type: directional; color: #FFF; intensity: 0.6" position="0 40 0"></a-entity>
      <!-- Dynamic sky and environment -->
      <a-entity environment="preset: default; 
                            skyType: atmosphere; 
                            lighting: none; 
                            shadow: false; 
                            fog: 0.6; 
                            cloudColor: #c5dee5; 
                            dressing: none; 
                            ground: none; 
                            playArea: 0; 
                            groundYScale: 0; 
                            groundColor: #444; 
                            groundColor2: #555; 
                            grid: none"></a-entity>

      <!-- Particle system for atmosphere -->
      <a-entity particle-system="preset: dust; particleCount: 2000; color: #FFD700,#FF6347; size: 0.5,2; accelerationValue: 0.1 0.1 0.1; velocityValue: 0.1 0.3 0.1"></a-entity>
    </a-scene>`,
    script: `
            const scene = document.getElementById('scener');
            const loadingScreen = document.getElementById('loading-screen-xr');
            const progressBar = document.getElementById('progress-xr');
            const percentageText = document.getElementById('percentage-xr');

            const loadingDuration = 40000;
            let startTime = null;

            function animateLoading(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;
                const progress = Math.min(elapsedTime / loadingDuration, 1);
                let vx = progress * 100;
                progressBar.style.width =  vx.toString() + '%';
                let vv = Math.floor(progress * 100);
                percentageText.textContent = vv.toString() + '%';

                if (progress < 1) {
                    requestAnimationFrame(animateLoading);
                } else {
                    loadingScreen.style.display = 'none';
                }
            }

            requestAnimationFrame(animateLoading);
    
    `
}}


const game_loader = new GameLoader('WebXR', gameConfig);


const games = [
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "", id: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "", id: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "", id: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "", id: ""},
            { title: "Art Gallery", image: "assets/games/art-gallery.png", description: "This interactive demo showcases a virtual art gallery built using A-Frame.js, a powerful web framework for building virtual reality (VR) experiences.", id: "game-art" },

        ];

        let currentGame = 4; // Starting with Game 5
        const carousel = document.getElementById('gameCarousel');

        function createGameCards() {
            games.forEach((game, index) => {
                const card = document.createElement('div');
                card.className = 'game-card-games';
                card.style.backgroundImage = `url(${game.image})`;
                carousel.appendChild(card);
            });
            updateCarousel();
        }

function startGame() {
    var game = $('#startGameBtn').data('game');
    game_loader.loadGame(game);
    closeModal();
    $('#sidePanel').addClass('active');

    $('body').find('#Introduction').hide();
    $('body').find('#project-main').hide();
    $('body').find('#LLM').hide();
    $('body').find('#WebXR').show();
    $('body').find('#components').hide();
    $('body').find('#Misc').hide();
}

        function updateCarousel() {
            const cards = document.querySelectorAll('.game-card-games');
            cards.forEach((card, index) => {
                const offset = (index - currentGame + games.length) % games.length;
                const zIndex = 5 - Math.abs(offset);
                const translateX = offset * 250;
                const translateZ = -Math.abs(offset) * 200;
                const rotateY = offset * 45;
                const scale = 1 - Math.abs(offset) * 0.2;
                
                card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-rotateY}deg) scale(${scale})`;
                card.style.zIndex = zIndex;
                card.style.opacity = 1 - Math.abs(offset) * 0.2;
            });

            document.getElementById('gameTitle').textContent = games[currentGame].title;
            document.getElementById('gameDescription').innerHTML = games[currentGame].description + `<br/><button onClick="startGame()" id="startGameBtn" class="btn" data-game="${games[currentGame].id}">Start Game</button>`;
            
        }

        function changeGame(direction) {
            currentGame = (currentGame + direction + games.length) % games.length;
            updateCarousel();
        }

createGameCards();