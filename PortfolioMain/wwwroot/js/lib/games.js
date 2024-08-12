        const games = [
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "" },
            { title: "Coming Soon", image: "https://via.placeholder.com/300x300?text=Coming+Soon", description: "" },
            { title: "Minecraft Chunk Gen", image: "assets/games/minecraft-world.png", description: "This example replicates generating a minecraft terrain chunk with basic wasd controls and look controls." },

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
            document.getElementById('gameDescription').textContent = games[currentGame].description;
        }

        function changeGame(direction) {
            currentGame = (currentGame + direction + games.length) % games.length;
            updateCarousel();
        }

        createGameCards();