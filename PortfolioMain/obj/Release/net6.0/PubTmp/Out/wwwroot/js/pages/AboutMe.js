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

        this.load.audio('playerAttack', 'sounds/hit-swing-sword-small-2-95566.mp3');
        this.load.audio('enemyHit', 'sounds/metal-whoosh-hit-9-201909.mp3');

        // Load other assets similarly
        this.load.image('enemy', 'textures/enemy/green-virus.png');
        this.load.image('ibm-computer', 'textures/computers/ibm5150_animated.gif');
        this.load.image('robot', 'textures/robot.png');
        this.load.spritesheet('idle', 'textures/Wizard Pack/Idle.png', { frameWidth: 229, frameHeight: 185 });
        this.load.spritesheet('run', 'textures/Wizard Pack/Run.png', { frameWidth: 229, frameHeight: 185 });
    }

    function handleCollision(player, enemy) {
        // Calculate the direction from the enemy to the player
        var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);

        // Set the magnitude of the knockback
        var knockbackSpeed = 1000;

        // Apply the velocity in the opposite direction
        enemy.setVelocityX(-Math.cos(angle) * knockbackSpeed);
        enemy.setVelocityY(-Math.sin(angle) * knockbackSpeed);

        // Optionally, use a short timer to reset enemy velocity, simulating a quick push back
        this.time.delayedCall(100, function () {
            enemy.setVelocity(0, 0);  // Stop enemy's movement after knockback
        }, [], this);
    }

    function create() {
        this.sprites = [];
        this.floor = this.add.tileSprite(0, 0, 1600, 1200, 'floor').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, 1600, 1200);


        this.soundEffects = {
            playerAttack: this.sound.add('playerAttack'),
            enemyHit: this.sound.add('enemyHit')
        };

        /*const robot = this.add.sprite(100, 100, 'robot').setScale(0.25).setInteractive();
        robot.name = "robot";
        this.sprites.push(robot);

        const ibmComputer = this.add.sprite(200, 100, 'ibm-computer').setScale(1.5).setInteractive();
        ibmComputer.name = "IBM Computer";
        this.sprites.push(ibmComputer);*/

        const spriteData = [
            { x: 100, y: 100, key: 'robot', name: 'robot', scale: 0.25 },
            { x: 200, y: 100, key: 'ibm-computer', name: 'IBM Computer', scale: 1.5}
        ]

        spriteData.forEach(data => {
            let sprite = this.add.sprite(data.x, data.y, data.key);
            sprite.setName(data.name); // Set a name for each sprite for easy identification
            sprite.setInteractive();   // Make the sprite interactive
            sprite.setScale(data.scale);
            sprite.on('pointerdown', (pointer) => {
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

                if (sprite.name === "IBM Computer") {
                    console.log('hit IBM computer generating dialogbox');
                    let content = this.add.text(10, height - dialogHeight + 10, '', { font: '18px Arial', fill: '#ffffff', wordWrap: { width: width - 20 } });
                    createDialogBox("I started my software development journey with Java and VB.NET back in 2005. I remember downloading JDK and Visual Studio 2003. I would design basic Desktop console and UI apps for fun, then work on more complex things to further understand how to code.", width, height, graphics, content, this);
                }

                if (sprite.name === "robot") {
                    console.log('hit robot generating dialogbox');
                    let content = this.add.text(10, height - dialogHeight + 10, '', { font: '18px Arial', fill: '#ffffff', wordWrap: { width: width - 20 } });
                    createDialogBox("I started with electronic design, first analog, then digital, and lastly micro-controllers. Building robots were a big part of my life of becoming a software engineer.", width, height, graphics, content, this);
                }
            });
            this.sprites.push(sprite); // Add to the array of sprites
        });

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

        this.enemies = this.physics.add.group({
            key: 'enemy',
            repeat: 5,
            setXY: { x: 100, y: 100, stepX: 70 }
        });

        this.enemies.children.iterate(function (enemy) {
            enemy.hp = 100;
            enemy.sightRadius = 200;
            // Create the detection zone and associate it with the enemy
            enemy.detectionZone = this.add.circle(enemy.x, enemy.y, enemy.sightRadius, 0x6666ff, 0.1);
            this.physics.add.existing(enemy.detectionZone);
            enemy.detectionZone.body.setCircle(enemy.sightRadius);
            enemy.setScale(0.25);
            enemy.setCollideWorldBounds(true);  // Make enemies stay within game bounds

            const radius = enemy.width * 0.25 * 0.01; // 50% of the sprite's width after scaling
            enemy.body.setCircle(radius, (enemy.width * 0.01) - radius, (enemy.height * 0.01) - radius);

            // Store a reference to the enemy in the detectionZone's data manager
            enemy.detectionZone.setData('linkedEnemy', enemy);
        }, this);

        this.player = this.physics.add.sprite(200, 300, 'idle').play('idle');
        this.player.setCollideWorldBounds(true);
        this.player.hp = 100;

        this.player.maxHp = 100; // Set the max HP for scaling the health bar.

        const newWidth = 32;
        const newHeight = 32;

        // Calculate the offset needed to center the new collision box within the original sprite's bounds
        const offsetX = (64 - newWidth) / 2; // Adjust the X offset to center the smaller collision box
        const offsetY = (64 - newHeight) / 2; // Adjust the Y offset to center the smaller collision box

        // Apply the new size and offset to the player's physics body
        this.player.body.setSize(newWidth, newHeight);
        this.player.body.setOffset(offsetX, offsetY);

        // Create Health Bar Background
        this.healthBarBackground = this.add.graphics();
        this.healthBarBackground.fillStyle(0x000000, 1); // Black background for contrast
        this.healthBarBackground.fillRect(10, 10, 200, 20); // x, y, width, height
        this.healthBarBackground.setScrollFactor(0); // Ignore camera movement


        // Create Health Bar Fill
        this.healthBarFill = this.add.graphics();
        this.healthBarFill.fillStyle(0xff0000, 1); // Red fill
        this.healthBarFill.fillRect(10, 10, 200, 20); // Initial full health bar
        this.healthBarFill.setScrollFactor(0);

        this.plasmaShots = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create Health Bar Text
        this.healthText = this.add.text(10, 30, 'Health', { color: '#ffffff', fontSize: '16px' });
        this.healthText.setScrollFactor(0);

        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 1600, 1200);
        //this.physics.add.collider(this.player, this.enemies); // Prevent overlap with player
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.overlap(this.player, this.enemies.children.entries.map(e => e.detectionZone), activateSeek, null, this);
        this.physics.add.collider(this.player, this.enemies, handleCollision, null, this);
        this.physics.add.collider(this.plasmaShots, this.enemies, this.hitEnemy, null, this);


        //this.input.keyboard.on('keydown_SPACE', () => {
        //    this.enemies.children.iterate((enemy) => {
        //        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y) < 100) {
        //            enemy.hp -= 30;
        //            this.soundEffects.playerAttack.play();
        //            if (enemy.hp <= 0) {
        //                enemy.destroy();
        //            }
        //        }
        //    });
        //});

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        /*this.input.on('pointerdown', (pointer) => {
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
            });*/
        

        playMusicWithPause(this);
    }

    function firePlasmaShot(obj) {
        let shot = obj.plasmaShots.get(obj.player.x, obj.player.y, 'plasmaShot');
        if (shot) {
            shot.setActive(true);
            shot.setVisible(true);
            shot.setVelocityX(400); // Adjust velocity as needed for direction
        }
    }

    function activateSeek(player, zone) {
        let enemy = zone.getData('linkedEnemy');
        var dx = player.x - enemy.x;
        var dy = player.y - enemy.y;
        var angle = Math.atan2(dy, dx);
        enemy.setVelocity(Math.cos(angle) * 100, Math.sin(angle) * 100);

        if (Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y) < 70) {
            if (Phaser.Math.Between(0, 2) === 0) {
                player.hp -= 0.3;
                this.soundEffects.enemyHit.play();
            }
        }
    }

    function hitEnemy(shot, enemy) {
        shot.setActive(false);
        shot.setVisible(false);
        shot.destroy(); // Remove the shot

        // Reduce enemy HP
        enemy.hp -= 10; // Adjust damage as necessary
        if (enemy.hp <= 0) {
            enemy.destroy(); // Eliminate enemy if HP is 0 or less
        }

        // Apply knockback from the direction of the shot
        let angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, shot.x, shot.y);
        enemy.setVelocityX(Math.cos(angle) * 200); // Adjust magnitude as necessary
        enemy.setVelocityY(Math.sin(angle) * 200);
    }


    function isPointWithinSpriteWorld(x, y, sprite) {
        // Get the bounds of the sprite in world space
        let bounds = sprite.getBounds();
        // Define the percentage to shrink the bounds by
        const shrinkPercentage = 0.88; // Reduces each side by 20%

        // Calculate the amount to shrink the bounds on each side
        const widthShrink = (bounds.width * shrinkPercentage) / 2;
        const heightShrink = (bounds.height * shrinkPercentage) / 2;

        // Shrink the bounds
        bounds.left += widthShrink;
        bounds.right -= widthShrink;
        bounds.top += heightShrink;
        bounds.bottom -= heightShrink;

        console.log(bounds);
        console.log(sprite.name);

        // Check if the point is within the modified bounds of the sprite
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

    function updateHealthBar(healthBarFill, player) {
        // Calculate health bar width based on player's current HP
        var healthBarWidth = (player.hp / player.maxHp) * 200; // 200 is the full width of the health bar
        healthBarFill.clear(); // Clear the old bar
        healthBarFill.fillStyle(0xff0000, 1); // Same red color
        healthBarFill.fillRect(10, 10, healthBarWidth, 20); // Redraw with new width
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

    function endGame(physics, obj) {
        physics.pause(); // Optionally pause the game physics
        let gameOverText = obj.add.text(400, 300, 'You Got Corrupted', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        obj.time.delayedCall(5000, () => {
            restartGame(obj);
        }, [], obj); // Delay in milliseconds
    }

    function restartGame(obj) {
        obj.scene.restart(); // Restarts the current scene
    }

    function update() {
        this.enemies.children.iterate(function (enemy) {
            enemy.detectionZone.x = enemy.x;
            enemy.detectionZone.y = enemy.y;
        });

        if (this.player.hp <= 0) {
            endGame(this.physics, this);
        }

        if (this.fireKey.isDown) {
            firePlasmaShot(this);
        }


        updateHealthBar(this.healthBarFill, this.player);

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
    try {
        runGame();
    } catch (e) {
        console.error(e)
        setTimeout(runGame, 1000);
    }
})




