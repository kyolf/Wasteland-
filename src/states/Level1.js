'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        let platforms;
        let player;
        let cursors;
        let shadowTexture;
        let lightSprite;
        let batteries;
        let score;
        let scoreText;
        let timer;
        let timerTxt;
        // let layer;
    }, 
    create: function(game) {
        game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.parentIsWindow = true;
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;

        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // game.add.sprite(0, 0, 'bg2');
        let background = game.add.sprite(0, 0, 'bg2');
        game.add.sprite(1500, 0, 'bg2');
        
        let platforms = game.add.group();
        platforms.enableBody = true;

        let ground = platforms.create(0, game.world.height - 64, 'platform');
        ground.scale.setTo(5, 2);
        ground.body.immovable = true;

        let ledge = platforms.create(400, 400, 'platform');
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'platform');
        ledge.body.immovable = true;
         
        // this.layer = createMaps(game, 'map');
        // game.input.onDown.add(resize, this);
      
        //see collision blocks
        //this.layer.debug = true;
        this.player = createPlayer(game);


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

        this.timerTxt = createText(game, `Timer: ${(this.timer.duration/1000).toPrecision(2)}s`, 600, 50, '30px Arial', '#FFF', 'center');

        this.scoreText = createText(game, 'Score: 0', 16, 16, '32px', '#FFF');

        // ///////LIGHTING EFFECT//////////
        // this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
        // this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
        // this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    }, 
    update: function(game) {
        // let hitPlatforms = this.game.physics.arcade.collide(this.player, this.layer);
        // game.physics.arcade.collide(this.batteries, this.layer);

        let hitPlatforms = this.game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.batteries, this.platforms);

        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        playerActions(this.cursors, this.player, hitPlatforms);

        this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);

        // ///////LIGHT EFFECTS/////////
        // this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
        // this.updateShadowTexture();
    },
    render: function(game) {
        game.debug.spriteInfo(this.piglet, 32, 32);
        game.debug.body(this.piglet);
        game.debug.bodyInfo(this.piglet, 32, 128);
        game.debug.body(this.player);
        game.debug.bodyInfo(this.player, 32, 256);
    }


};
