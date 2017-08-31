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
        let totalTime;
        let timerTxt;
        let layer;
        let enemyGroup;
        let light;
        let shadowTexture;
        let lightRadius;
    }, 
    create: function(game) {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(1, 1);

        game.stage.backgroundColor = '#43484f';
        
        this.layer = createMaps(game, 'map');
      
        //see collision blocks
        //this.layer.debug = true;
        this.player = createPlayer(game);

        this.player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
        this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

        createRain(game);

        //////////IF YOU WANT UP TO BE JUMP, UNCOMMENT THE BELOW////////////
        this.cursors = game.input.keyboard.createCursorKeys();

        //////////IF YOU WANT SPACEBAR TO BE JUMP, UNCOMMENT THE BELOW////////////
        // this.cursors = this.game.input.keyboard.addKeys({
        // 	'up': Phaser.Keyboard.SPACEBAR,
        // 	'down': Phaser.Keyboard.DOWN,
        // 	'left': Phaser.Keyboard.LEFT,
        // 	'right': Phaser.Keyboard.RIGHT
        // });
        
        //Creating Piglets
        this.enemyGroup = game.add.group();
        new Piglet(game, 500, game.world.height - 250, 100, this.layer, this.enemyGroup);
        new Piglet(game, 100, game.world.height - 100, 100, this.layer, this.enemyGroup);
        new Piglet(game, 1000, game.world.height - 100, 100, this.layer, this.enemyGroup);

        this.batteries = createBatteries(game);

        // this.timer = createTimer(game,
        //                         ()=>{
        //                             this.camera.reset();
        //                             this.state.start('GameOver');
        //                         });


        // this.timerTxt = createText(game, `Timer: ${(this.timer.duration/1000).toPrecision(2)}s`, 1300, 50, '30px Freckle Face', '#FFF', 'center');
        // this.timerTxt.fixedToCamera = true;

        ////////CREATE CUSTOM TIMER///////////////////
        this.totalTime = 30;
        this.timerTxt = createText(game, `Timer: ${this.totalTime}s`, 1350, 75, '30px Freckle Face', '#FFF', 'center');
        this.timerTxt.anchor.set(0.5, 0.5);
        this.timerTxt.fixedToCamera = true;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);

        ///////////////CUSTOM TIMER ABOVE///////////////////

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Freckle Face', '#FFF');
        this.scoreText.fixedToCamera = true;


        this.timerTxt.setText(`Timer: ${this.totalTime}s`);


         ////////////LIGHTING ATTEMPT///////////
        this.lightRadius = 300;
        this.shadowTexture = game.add.bitmapData(3200, 1000);
        
        this.light = game.add.sprite(this.player.x/2, this.player.y/5, this.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ATTEMPT ENDS/////////////

    }, 
    tick: function(game) {
        this.totalTime--;
        this.lightRadius -= 10;
        console.log('light radius in tick', this.lightRadius);
        if(this.totalTime === 0 || this.lightRadius === 0) {
            this.camera.reset();
            this.state.start('GameOver');
        }
    },
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.batteries, this.layer);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        /////LIGHTING BEGINS//////
        this.updateShadowTexture();

        //////////////LIGHTING ENDS//////////////

        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer);
        this.enemyGroup.forEach(function(enemy){
            if(enemy.previousPosition.x >= enemy.position.x){
                enemy.animations.play('left');
            }else{
                enemy.animations.play('right');
            }
        });

        //player collision with enemies
        game.physics.arcade.collide(this.player, this.enemyGroup, this.resetPlayer);

        //////////////////////////If we want game over//////////////////////////////
        // game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('GameOver');
        // });

        // this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);
        this.timerTxt.setText(`Timer: ${this.totalTime}s`);
    },
    updateShadowTexture: function (game, player) {
        this.shadowTexture.ctx.fillStyle = '#43484f';
        this.shadowTexture.ctx.fillRect(0, 0, 3200, 1000);


        let gradient = this.shadowTexture.ctx.createRadialGradient(
            this.player.x, this.player.y, this.lightRadius * 0.65,
            this.player.x, this.player.y, this.lightRadius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#ffffff');

        this.shadowTexture.ctx.beginPath();
        this.shadowTexture.ctx.fillStyle = gradient;
        this.shadowTexture.ctx.arc(this.player.x, this.player.y, this.lightRadius, 0, Math.PI * 2);
        this.shadowTexture.ctx.fill();
        this.shadowTexture.dirty = true;
    },
    resetPlayer: function(player, enemyGroup){
        player.reset(32, 650);
    },
    render:function(game) {
        
        // Sprite debug info
        // game.debug.spriteInfo(this.piglet, 32, 32);
        // let y = 0;
        // this.enemyGroup.forEach(function(enemy){
        //     game.debug.body(enemy);
        //     // game.debug.bodyInfo(enemy, 32, y=y+128);
        // });
        // game.debug.body(this.player);
        // game.debug.bodyInfo(this.player, 32, 256);
    }
};
