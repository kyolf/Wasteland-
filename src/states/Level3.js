'use strict';

Game.Level3 = function(game){
};

Game.Level3.prototype = {
    init: function() {
        this.losingTime = false;
    }, 
    create: function(game) {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        game.global.initials = '';
        game.global.tentacleFrame = 'start';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#00112d';

        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(0.5, 0.5);
        
        this.layer2 = createMaps(game, 'map3', 'lvl3bg');
      
        //see collision blocks
        //this.layer2.debug = true;
        this.player = createPlayer(game);
        game.global.lives = 3;

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
        this.lifesGroup = game.add.group();
        new Piglet(game, 1472, game.world.height - 864, 100, this.layer, this.lifesGroup);


        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 1024, game.world.height - 736, 100, this.layer, this.enemyGroup);
        new Shadow(game, 224, game.world.height - 576, 100, this.layer, this.enemyGroup);
        new Shadow(game, 1024, game.world.height - 480, 100, this.layer, this.enemyGroup);
        new Shadow(game, 256, game.world.height - 192, 100, this.layer, this.enemyGroup);
        new Shadow(game, 3104, game.world.height - 128, 100, this.layer, this.enemyGroup);
        new Shadow(game, 2400, game.world.height - 64, 100, this.layer, this.enemyGroup);
        new Shadow(game, 2176, game.world.height - 1056, 100, this.layer, this.enemyGroup);
        new Shadow(game, 3136, game.world.height - 1024, 100, this.layer, this.enemyGroup);
        new Shadow(game, 3040, game.world.height - 64, 100, this.layer, this.enemyGroup);
        
        this.enemyGroup.setAll('body.immovable', true);

        this.tentacleGroup = game.add.group();
        new Tentacle(game, 832, game.world.height - 480, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 992, game.world.height - 96, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 1532, game.world.height - 96, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 1728, game.world.height - 96, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 1920, game.world.height - 832, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 2560, game.world.height - 640, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 3584, game.world.height - 768, 100, this.layer, this.tentacleGroup);
        
        this.tentacleGroup.setAll('body.immovable', true);

        this.flyingGroup = game.add.group();
        new Bat(game, 384, game.world.height - 1056, 960, this.layer, this.flyingGroup);
        new Bat(game, 128, game.world.height - 320, 1536, this.layer, this.flyingGroup);
        new Bat(game, 1664, game.world.height - 544, 2176, this.layer, this.flyingGroup);
        new Bat(game, 2528, game.world.height - 672, 3296, this.layer, this.flyingGroup);
        new Bat(game, 3712, game.world.height - 672, 4096, this.layer, this.flyingGroup);
        
        this.flyingGroup.setAll('body.immovable', true);
        
        //Creating Batteries
        this.batteries = game.add.group();
        new Batteries(game, 96, game.world.height - 800, 0, this.layer, this.batteries);
        new Batteries(game, 128, game.world.height - 224, 0, this.layer, this.batteries);
        new Batteries(game, 1152, game.world.height - 768, 0, this.layer, this.batteries);
        new Batteries(game, 1216, game.world.height - 128, 0, this.layer, this.batteries);
        new Batteries(game, 1952, game.world.height - 928, 0, this.layer, this.batteries);
        new Batteries(game, 2816, game.world.height - 672, 0, this.layer, this.batteries);
        new Batteries(game, 2656, game.world.height - 96, 0, this.layer, this.batteries);
        new Batteries(game, 3232, game.world.height - 128, 0, this.layer, this.batteries);

        this.exit = game.add.sprite(4640, game.world.height - 1270, 'portal');
        game.physics.arcade.enable(this.exit); 
        this.exit.enableBody = true;

        //Music
        //window.music = game.add.audio('level1_music');
        // window.music.play('', 0, 1, true, true);
        // window.music1 = game.add.audio('heart_slow');
        // window.music2 = game.add.audio('heart_fast');
        // this.hbFastStopped = true;
        // this.hbSlowStopped = true;
        
         ////////////LIGHTING BEGINS///////////
        game.global.lightRadius = 350;
        this.shadowTexture = game.add.bitmapData(5000, 5000);
        
        this.light = game.add.image(0, 0, this.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

         ////////CREATE CUSTOM TIMER///////////////////
        game.global.time = 30;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, tick, game);

        ///////////////CUSTOM TIMER ABOVE///////////////////
        const {lifeTxt, scoreTxt, timerTxt} = createLevelText(game, '30px murderFont');
        this.lifeTxt = lifeTxt;
        this.scoreTxt = scoreTxt;
        this.timerTxt = timerTxt;

    }, 
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer2);
        game.physics.arcade.collide(this.batteries, this.layer2);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, game);

        /////LIGHTING BEGINS//////
        updateShadowTexture(game, this.player, this.shadowTexture);

        //////////////LIGHTING ENDS//////////////

        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with piglet
        game.physics.arcade.collide(this.livesGroup, this.layer2);
        pigletAnimations(this.livesGroup);


        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer2);
        shadowAnimations(this.enemyGroup);

        game.physics.arcade.collide(this.tentacleGroup, this.layer2);
        tentacleAnimations(this.tentacleGroup);
        
        game.physics.arcade.collide(this.flyingGroup, this.layer2);
        flyingAnimations(this.flyingGroup);

        //player collision with enemies
        game.physics.arcade.collide(this.player, this.enemyGroup, this.resetPlayer, null, game);
        game.physics.arcade.collide(this.player, this.tentacleGroup, this.resetPlayer, null, game);
        game.physics.arcade.collide(this.player, this.flyingGroup, this.resetPlayer, null, game);

        //collision with exit
        game.physics.arcade.collide(this.player, this.exit, this.nextLevel, null, game);

        //Uncomment for collision to spark victory
        //  game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('Victory');
        // });

        if(game.global.lives === 0){
            window.music.stop();
            window.music = null;
            goToGameOver(window.music1, window.music2, game.state);
        }

        game.physics.arcade.collide(this.player, this.livesGroup, gainLife, null, game);
        
        this.scoreTxt.setText(`Score: ${game.global.score}`);
        this.lifeTxt.setText(`lives: ${game.global.lives}`);
        this.timerTxt.setText(`Timer: ${game.global.time}s`);

    },
    nextLevel: function(){
        this.global.score += this.global.totalTime;
        this.state.start('Victory');
    },
    resetPlayer: function(player, enemyGroup){
        this.global.lives--;
        player.reset(632, 50);
    },
    render:function(game) {
        // Sprite debug info
        // game.debug.spriteInfo(this.shadow, 80, 70);
        // let y = 0;
        this.enemyGroup.forEach(function(enemy){
            // game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.tentacleGroup.forEach(function(enemy){
            // game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.flyingGroup.forEach(function(enemy){
            // game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        // game.debug.body(this.player);
        // game.debug.bodyInfo(this.player, 32, 256);
    }
};
