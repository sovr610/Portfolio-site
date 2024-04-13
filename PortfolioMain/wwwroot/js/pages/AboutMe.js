var gameReady = false;
function runGame() {

    const config = {
        type: Phaser.AUTO,
        parent: 'gameContainer',
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }, // Top down game, so no gravity
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };


    const game = new Phaser.Game(config);

    function preload() {
        this.load.image('floor', '/assets/textures/floor.jpeg'); // Replace with your floor texture path
        this.load.spritesheet('idle', '/assets/textures/Wizard Pack/Idle.png', { frameWidth: 229, frameHeight: 185, margin: 0, spacing: 0 }); // Adjust the frame size accordingly
        this.load.spritesheet('run', '/assets/textures/Wizard Pack/Run.png', { frameWidth: 229, frameHeight: 185, margin: 0, spacing: 0 }); // Adjust the frame size accordingly
    }

    function create() {
        // Create a tiled sprite for the floor that covers the entire game world
        this.floor = this.add.tileSprite(0, 0, 1600, 1200, 'floor').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, 1600, 1200); // Set the world bounds

        // Create the player sprite
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }), // Adjust the start and end frame indexes
            frameRate: 5,
            repeat: -1 // Loop forever
        });

        // Running animation
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }), // Adjust the start and end frame indexes
            frameRate: 15,
            repeat: -1
        });

        // Create the player sprite and start with the 'idle' animation
        this.player = this.physics.add.sprite(200, 300, 'idle');
        this.player.anims.play('idle');
        this.player.setCollideWorldBounds(true); // Prevent the player from going out of bounds

        // Set up the camera
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 1600, 1200);

        // Set up the cursor keys and WASD controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        gameReady = true;
    }

    function update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('run', true);
            this.player.flipX = true; // Flip sprite to face left
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('run', true);
            this.player.flipX = false; // Make sprite face right (normal orientation)
        } else if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('run', true);
            this.player.flipX = false; // Optional: Reset flip when moving up if desired
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('run', true);
            this.player.flipX = false; // Optional: Reset flip when moving down if desired
        } else {
            // If no movement keys are pressed, play the idle animation
            this.player.anims.play('idle', true);
            this.player.flipX = false; // Optional: Reset flip when idling if desired
        }
    }


}



