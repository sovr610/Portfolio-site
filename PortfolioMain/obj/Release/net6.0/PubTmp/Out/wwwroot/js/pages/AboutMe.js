var gameReady = false;
function runGame() {
    var lockedMovement = true;
    const config = {
        type: Phaser.AUTO,
        parent: 'overlay',
        width: 1024,
        height: 786,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload() {
        this.load.setBaseURL('/assets');
        this.load.audio('song1', 'music/song-1.mp3');
        this.load.audio('song2', 'music/song-2.mp3');
        this.load.audio('song3', 'music/song-3.mp3');
        this.load.audio('song4', 'music/song-4.mp3');
        this.load.audio('song5', 'music/song-5.mp3');
        this.load.audio('song6', 'music/song-6.mp3');
        this.load.image('floor', 'textures/floor.jpeg'); 
        // Load other assets similarly
        this.load.image('ibm-computer', 'textures/computers/ibm5150_animated.gif');
        this.load.image('robot', 'textures/robot.png');
        this.load.spritesheet('idle', 'textures/Wizard Pack/Idle.png', { frameWidth: 229, frameHeight: 185 });
        this.load.spritesheet('run', 'textures/Wizard Pack/Run.png', { frameWidth: 229, frameHeight: 185 });
    }

    function create() {
        this.sprites = [];
        this.floor = this.add.tileSprite(0, 0, 1600, 1200, 'floor').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, 1600, 1200);

        const robot = this.add.sprite(100, 100, 'robot').setScale(0.25).setInteractive();
        robot.name = "robot";
        this.sprites.push(robot);

        const ibmComputer = this.add.sprite(200, 100, 'ibm-computer').setScale(1.5).setInteractive();
        ibmComputer.name = "IBM Computer";
        this.sprites.push(ibmComputer);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }), // Adjust the start and end frame indexes
            frameRate: 15,
            repeat: -1
        });

        this.player = this.physics.add.sprite(200, 300, 'idle').play('idle');
        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 1600, 1200);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        this.input.on('pointerdown', (pointer) => {
            this.sprites.forEach(sprite => {
                if (isPointWithinSpriteWorld(pointer.x, pointer.y, sprite)) {
                    console.log(`Clicked on ${sprite.name} at X=${pointer.x}, Y=${pointer.y}`);
                    sprite.setTint(0xff0000);
                    this.time.delayedCall(500, () => sprite.clearTint());

                    const leftMostX = this.cameras.main.scrollX;
                    const leftMostY = this.cameras.main.scrollY;

                    console.log(leftMostX)
                    console.log(leftMostY)

                    let width = this.sys.game.config.width + leftMostX;
                    let height = this.sys.game.config.height + leftMostY;
                    let graphics = this.add.graphics();
                    let dialogHeight = height / 4;

                    if (sprite.name = "IBM Computer") {

                        let content = this.add.text(10, height - dialogHeight + 10, '', { font: '18px Arial', fill: '#ffffff', wordWrap: { width: width - 20 } });
                        createDialogBox("I started my software development journey with Java and VB.NET back in 2005. I remember downloading JDK and Visual Studio 2003", width, height, graphics, content, this);
                    }

                    if (sprite.name = "robot") {
                        let content = this.add.text(10, height - dialogHeight + 10, '', { font: '18px Arial', fill: '#ffffff', wordWrap: { width: width - 20 } });
                        createDialogBox("I started with electronic design, first analog, then digital, and lastly micro-controllers. Building robots were a big part of my life of becoming a software engineer.", width, height, graphics, content, this);
                    }
                }
            });
        });

        playMusicWithPause(this);
    }

    function isPointWithinSpriteWorld(x, y, sprite) {
        // Get the bounds of the sprite in world space
        let bounds = sprite.getBounds();
        console.log(bounds);
        console.log(sprite.name);
        // Check if the point is within the bounds of the sprite
        return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
    }

    function isPointWithinSpriteScreen(x, y, sprite, camera) {
        // Get the bounds of the sprite and factor in the camera's scroll position
        const spriteBounds = sprite.getBounds();
        const spriteScreenLeft = spriteBounds.x - camera.scrollX;
        const spriteScreenTop = spriteBounds.y - camera.scrollY;
        const spriteScreenWidth = spriteBounds.width;
        const spriteScreenHeight = spriteBounds.height;

        // Check if the point is within the sprite's bounds on screen
        return x >= spriteScreenLeft &&
            x <= spriteScreenLeft + spriteScreenWidth &&
            y >= spriteScreenTop &&
            y <= spriteScreenTop + spriteScreenHeight;
    }

    function isPointWithinSprite(x, y, sprite) {
        // Calculate the bounds of the sprite



        const spriteLeft = sprite.x - sprite.width * sprite.originX;
        const spriteRight = spriteLeft + sprite.width;
        const spriteTop = sprite.y - sprite.height * sprite.originY;
        const spriteBottom = spriteTop + sprite.height;

        console.log('spriteLeft: ', spriteLeft);
        console.log('spriteRight: ', spriteRight);
        console.log('spriteTop: ', spriteTop);
        console.log('spriteBottom: ', spriteBottom);
        console.log('pointerX: ', x);
        console.log('pointerY: ', y);
        console.log('name: ', sprite.name);

        // Check if the point is within the bounds of the sprite
        return x >= spriteLeft && x <= spriteRight && y >= spriteTop && y <= spriteBottom;
    }
    function createDialogBox(text, width, height, graphics, content, thisGame) {
        lockedMovement = false;
          // Adjust this to change the dialog size
        let dialogHeight = height / 4;
        // Create a graphics object to draw the black background
        graphics.fillStyle(0x000000, 1);  // Black, fully opaque
        graphics.fillRect(0, height - dialogHeight, width, dialogHeight);

        // Add text object
        typeText(content, text, thisGame);

        // Set up an event listener for any key press
        thisGame.input.keyboard.on('keydown', () => {
            if (lockedMovement) {
                graphics.clear(); // Clear the graphics
                content.destroy(); // Remove the text
            }
        });
    }

    function typeText(textObject, fullText, thisGame) {
        const length = fullText.length;
        let i = 0;
        thisGame.time.addEvent({
            callback: () => {
                textObject.text += fullText[i];
                i++;

                if (i >= fullText.length) { // Additional check if needed
                    lockedMovement = true;
                }
            },
            repeat: length - 1,
            delay: 50, // Adjust typing speed (milliseconds per character)
        });
    }

    function playMusicWithPause(scene) {
        const songs = ['song1', 'song2', 'song3', 'song4', 'song5', 'song6'];
        Phaser.Utils.Array.Shuffle(songs);
        let index = 0;

        const playNextSong = () => {
            if (index < songs.length) {
                const song = scene.sound.add(songs[index++], { volume: 0.5 });
                song.play();

                song.once('complete', () => {
                    scene.time.delayedCall(1000, playNextSong);
                });
            } else {
                index = 0;
                Phaser.Utils.Array.Shuffle(songs);
                playNextSong();
            }
        };

        playNextSong();
    }

    function update() {


        this.player.setVelocity(0, 0); // Reset both X and Y velocities
        if (lockedMovement) {
            // Handling horizontal movement
            if (this.cursors.left.isDown || this.wasd.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('run', true);
                this.player.flipX = true; // Flip sprite to face left
            } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('run', true);
                this.player.flipX = false; // Make sprite face right (normal orientation)
            }

            // Handling vertical movement
            if (this.cursors.up.isDown || this.wasd.up.isDown) {
                this.player.setVelocityY(-160);
                this.player.anims.play('run', true);
                // Note: Flipping logic for up/down can be omitted if not needed
            } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
                this.player.setVelocityY(160);
                this.player.anims.play('run', true);
            }

            // Diagonal movement adjustment
            if ((this.cursors.left.isDown || this.wasd.left.isDown || this.cursors.right.isDown || this.wasd.right.isDown) &&
                (this.cursors.up.isDown || this.wasd.up.isDown || this.cursors.down.isDown || this.wasd.down.isDown)) {
                const diagonalSpeed = Math.sqrt(160 * 160 / 2); // Adjust speed to maintain consistent movement speed diagonally
                this.player.setVelocityX(diagonalSpeed * (this.player.body.velocity.x < 0 ? -1 : 1));
                this.player.setVelocityY(diagonalSpeed * (this.player.body.velocity.y < 0 ? -1 : 1));
            }

            // If no keys are pressed, play the idle animation
            if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
                this.player.anims.play('idle', true);
                this.player.flipX = false; // Reset flip when idling
            }
        }
    }


}

$(document).ready(() => {
    runGame();
})




