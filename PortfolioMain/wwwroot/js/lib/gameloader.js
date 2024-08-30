class GameLoader {
    constructor(containerId, games) {
        this.container = document.getElementById(containerId);
        this.currentGame = null;
        this.games = games;
    }

    loadGame(gameId) {
        if (this.currentGame) {
            this.container.innerHTML = '';
            // Remove the previously added script
            const oldScript = document.getElementById(`game-script-${this.currentGame}`);
            if (oldScript) {
                oldScript.remove();
            }
        }

        const game = this.games[gameId];

        // Add the HTML content first
        this.container.innerHTML = game.scene;

        // Create and load the script
        const script = document.createElement('script');
        script.id = `game-script-${gameId}`;

        // Encapsulate the game script in a function
        const wrappedScript = `
            (function() {
                ${game.script}
            })();
        `;

        script.textContent = wrappedScript;
        

        // Append the script to the document body
        document.body.appendChild(script);

        this.currentGame = gameId;
    }

    getGames() {
        return this.games;
    }
}