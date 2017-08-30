'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        let platforms;
        let player;
        let cursors;
        let batteries;
        let score;
        let scoreText;
        let timer;
        let timerTxt;
        let layer;
    }, 
    create: function(game) {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // game.add.sprite(0, 0, 'bg2');
        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(0.5, 1);

         
        this.layer = createMaps(game, 'map');
      
        //see collision blocks
        //this.layer.debug = true;
        this.player = createPlayer(game);

        this.player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
        this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

        //ALL CODE BELOW IS FOR RAIN EFFECT

        let emitter = game.add.emitter(game.world.centerX, 0, 400);
      
        emitter.width = game.world.width;
        // emitter.angle = 30; // uncomment to set an angle for the rain.
      
        emitter.makeParticles('rain');
      
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
      
        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);
      
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
      
        emitter.start(false, 1600, 5, 0);

        //RAIN EFFECT CODE ENDS

        //////////IF YOU WANT UP TO BE JUMP, UNCOMMENT THE BELOW////////////
        this.cursors = game.input.keyboard.createCursorKeys();

        //////////IF YOU WANT SPACEBAR TO BE JUMP, UNCOMMENT THE BELOW////////////
        // this.cursors = this.game.input.keyboard.addKeys({
        // 	'up': Phaser.Keyboard.SPACEBAR,
        // 	'down': Phaser.Keyboard.DOWN,
        // 	'left': Phaser.Keyboard.LEFT,
        // 	'right': Phaser.Keyboard.RIGHT
        // });

        this.batteries = createBatteries(game);

        this.timer = createTimer(game,
                                ()=>{
                                    this.camera.reset();
                                    this.state.start('GameOver');
                                });


        this.timerTxt = createText(game, `Timer: ${(this.timer.duration/1000).toPrecision(2)}s`, 1300, 50, '30px Freckle Face', '#FFF', 'center');
        this.timerTxt.fixedToCamera = true;

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Freckle Face', '#FFF');
        this.scoreText.fixedToCamera = true;
    }, 
    update: function(game) {
        let hitPlatforms = this.game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.batteries, this.layer);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        playerActions(this.cursors, this.player, hitPlatforms);

        this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);
    }

};
