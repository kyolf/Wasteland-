'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        this.losingTime = false;
    }, 
    create: function(game) {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.global.score = 0;
        game.global.initials = '';
        game.global.tentacleFrame = 'start';
        game.global.shadowFrame = 'start';
        
        this.layer2 = createMaps(game, 'map1', 'lvl1bg');
      
        this.player = createPlayer(game);
        game.global.lives = 3;

        this.player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
        this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

        createRain(game);

        //////////IF YOU WANT UP TO BE JUMP, UNCOMMENT THE BELOW////////////
        // this.cursors = game.input.keyboard.createCursorKeys();

        //////////IF YOU WANT SPACEBAR TO BE JUMP, UNCOMMENT THE BELOW////////////
        this.cursors = game.input.keyboard.addKeys({
        	'up': Phaser.Keyboard.SPACEBAR,
        	'down': Phaser.Keyboard.DOWN,
        	'left': Phaser.Keyboard.LEFT,
        	'right': Phaser.Keyboard.RIGHT
        });
        
        //Creating Piglets
        this.livesGroup = game.add.group();
        new Piglet(game, 576, game.world.height - 300, 100, this.livesGroup);

        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 992, game.world.height - 448, 100, this.enemyGroup);
        new Shadow(game, 1984, game.world.height - 832, 100, this.enemyGroup);
        new Shadow(game, 3104, game.world.height - 800, 100, this.enemyGroup);
        new Shadow(game, 3968, game.world.height - 550, 100, this.enemyGroup);

        this.enemyGroup.setAll('body.immovable', true);

        this.tentacleGroup = game.add.group();
        //new Tentacle(game, 1300, game.world.height - 275, 100, this.tentacleGroup);
        //new Tentacle(game, 350, game.world.height - 180, 100, this.tentacleGroup);
        //new Tentacle(game, 2460, game.world.height - 405, 100, this.tentacleGroup);

        this.tentacleGroup.setAll('body.immovable', true);

        this.flyingGroup = game.add.group();
        new Bat(game, 1120, game.world.height - 930, 3000, this.flyingGroup);
        //new Bat(game, 1400, game.world.height - 200, 600, this.flyingGroup);
        //new Bat(game, 2000, game.world.height - 550, 1000, this.flyingGroup);

        this.flyingGroup.setAll('body.immovable', true);

        this.batteries = game.add.group();
        new Batteries(game, 1350, game.world.height - 960, this.batteries);
        new Batteries(game, 2050, game.world.height - 1440, this.batteries);
        new Batteries(game, 2528, game.world.height - 640, this.batteries);
        new Batteries(game, 4256, game.world.height - 550, this.batteries);

        this.exit = game.add.sprite(4640, game.world.height - 1270, 'portal');
        // this.exit = game.add.sprite(300, game.world.height - 970, 'portal');
        game.physics.arcade.enable(this.exit); 
        this.exit.enableBody = true;

        //Music
        window.music = game.add.audio('level1_music');
        window.music.play('', 0, 1, true, true);
        window.music1 = game.add.audio('heart_slow');
        window.music2 = game.add.audio('heart_fast');
        
         ////////////LIGHTING BEGINS///////////
        game.global.lightRadius = 350;
        game.global.shadowTexture = game.add.bitmapData(4800, 4000);
        
        this.light = game.add.image(0, 0, game.global.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

         ////////CREATE CUSTOM TIMER///////////////////
        game.global.time = 100;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, tick, this);

        ///////////////CUSTOM TIMER ABOVE///////////////////
        const {lifeTxt, scoreTxt, timerTxt} = createLevelText(game, '30px murderFont');
        this.lifeTxt = lifeTxt;
        this.scoreTxt = scoreTxt;
        this.timerTxt = timerTxt;

    }, 
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer2);
        game.physics.arcade.collide(this.batteries, this.layer2);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        /////LIGHTING BEGINS//////
        updateShadowTexture(game, this.player, game.global.shadowTexture);

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
        game.physics.arcade.collide(this.player, this.enemyGroup, this.resetPlayer, null, this);
        game.physics.arcade.collide(this.player, this.tentacleGroup, this.resetPlayer, null, this);
        game.physics.arcade.collide(this.player, this.flyingGroup, this.resetPlayer, null, this);

        //Uncomment for collision to spark victory
        // game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('Victory');
        // });

        //collision with exit
        game.physics.arcade.collide(this.player, this.exit, this.nextLevel, null, this);


        if(game.global.lives === 0){
            destroyLevel(this);
            destroyMusic();
            game.state.start('GameOver');
        }
        
        game.physics.arcade.collide(this.player, this.livesGroup, gainLife, null, this);
        
        this.scoreTxt.setText(`Score: ${game.global.score}`);
        this.lifeTxt.setText(`lives: ${game.global.lives}`);
        this.timerTxt.setText(`Timer: ${game.global.time}s`);

    },
    nextLevel: function(){
        this.game.global.score += this.game.global.time;
        destroyLevel(this);
        this.state.start('Level2');
    },
    resetPlayer: function(player, enemyGroup){
        this.game.global.lives--;
        player.reset(250, 800);
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
