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
        this.losingTime = false;
    }, 
    create: function(game) {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#00112d';

        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(1, 1);
        
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

        //Music
        this.music = game.add.audio('level1_music');
        this.music.play('', 0, 1, true, true);
        this.music1Created = false;
     

         ////////////LIGHTING BEGINS///////////
        this.lightRadius = 400;
        this.shadowTexture = game.add.bitmapData(3600, 1000);
        
        this.light = game.add.image(0, 0, this.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

         ////////CREATE CUSTOM TIMER///////////////////
        this.totalTime = 30;
        this.timerTxt = createText(game, `Timer: ${this.totalTime}s`, 1350, 75, '30px Freckle Face', '#FFF', 'center');
        this.timerTxt.anchor.setTo(0.5, 0.5);
        this.timerTxt.fixedToCamera = true;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);

        ///////////////CUSTOM TIMER ABOVE///////////////////

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Freckle Face', '#FFF');
        this.scoreText.fixedToCamera = true;


        this.timerTxt.setText(`Timer: ${this.totalTime}s`);


    }, 
    tick: function(game) {
        this.totalTime--;
        this.lightRadius -= 20;
        
        if(this.totalTime <= 10 || this.lightRadius <= 60 && !this.losingTime){
            this.music.pause();
            if(!this.music1Created){
                this.music1 = this.add.audio('losing_light');
                this.music1.play('', 0, 1, true, true);
                this.music1Created = true;
            }
            else{
                this.music1.resume();
            }
            this.losingTime = true;
            this.music1Played = true;
        }
        else if(this.totalTime > 10 && this.losingTime && this.music1Played){
            this.music1.pause();
            this.music.resume();
            this.losingTime = false;
            this.music1Played = false;
        }

        if(this.totalTime === 0 || this.lightRadius === 0) {
            this.camera.reset();
            this.music1.stop();
            this.music.stop();
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

        this.timerTxt.setText(`Timer: ${this.totalTime}s`);

    },
    updateShadowTexture: function (game, player) {
        this.shadowTexture.context.fillStyle = '#4e535b';
        this.shadowTexture.context.fillRect(0, 0, 3600, 1000);
    
        let gradient = this.shadowTexture.context.createRadialGradient(
            this.player.x, this.player.y, this.lightRadius * 0.65,
            this.player.x, this.player.y, this.lightRadius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#ffffff');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(this.player.x + 35, this.player.y + 10, this.lightRadius, 0, Math.PI * 2);
        this.shadowTexture.context.fill();
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
