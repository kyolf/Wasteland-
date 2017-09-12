'use strict';

Game.Level2 = function(game) {
};

Game.Level2.prototype = {
    init: function() {
        this.losingTime = false;
    }, 
    create: function(game) {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        //Reset the game.global values
        game.global.shadowTexture.destroy();
        game.global.initials = '';
        game.global.tentacleFrame = 'start';
        game.global.shadowFrame = 'start';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Map Creation
        this.layer2 = createMaps(game, 'map2', 'lvl2bg');
      
        //Player Initialization
        this.player = createPlayer(game, 250, game.world.height - 1100);

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
        new Piglet(game, 896, game.world.height - 896, 100, this.livesGroup);

        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 576, game.world.height - 704, 100, this.enemyGroup);
        new Shadow(game, 480, game.world.height - 384, 100, this.enemyGroup);
        new Shadow(game, 1760, game.world.height - 960, 100, this.enemyGroup);
        new Shadow(game, 3808, game.world.height - 832, 100, this.enemyGroup);
        new Shadow(game, 3104, game.world.height - 128, 100, this.enemyGroup);

        this.enemyGroup.setAll('body.immovable', true);

        //Creating Tentacles
        this.tentacleGroup = game.add.group();
        new Tentacle(game, 1024, game.world.height - 880, 100,  this.tentacleGroup);
        new Tentacle(game, 1184, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 1408, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 1728, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 2016, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 3164, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 3584, game.world.height - 180, 100,  this.tentacleGroup);
        new Tentacle(game, 4608, game.world.height - 400, 100,  this.tentacleGroup);
        
        this.tentacleGroup.setAll('body.immovable', true);

        //Creating Bats
        this.flyingGroup = game.add.group();
        new Bat(game, 1760, game.world.height - 992, 3136, this.flyingGroup);
        new Bat(game, 3424, game.world.height - 448, 4576, this.flyingGroup);

        this.flyingGroup.setAll('body.immovable', true);
        
        //Creating Batteries
        this.batteries = game.add.group();
        new Batteries(game, 1312, game.world.height - 1184, this.batteries);
        new Batteries(game, 2368, game.world.height - 160, this.batteries);
        new Batteries(game, 2784, game.world.height - 192, this.batteries);
        new Batteries(game, 3435, game.world.height - 1376, this.batteries);
        
        this.exit = game.add.sprite(4640, game.world.height - 1270, 'portal');
        // this.exit = game.add.sprite(500, game.world.height - 970, 'portal');
        game.physics.arcade.enable(this.exit); 
        this.exit.enableBody = true;
        
        //LIGHTING BEGINS
        game.global.shadowTexture = game.add.bitmapData(4800, 4000);
        
        this.light = game.add.image(0, 0, game.global.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        //CREATE CUSTOM TIMER
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, tick, this);

        const {lifeTxt, scoreTxt, timerTxt} = createLevelText(game, '30px murderFont');
        this.lifeTxt = lifeTxt;
        this.scoreTxt = scoreTxt;
        this.timerTxt = timerTxt;

    }, 
    update: function(game) {
        //Player collision with map
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer2);
        
        //Battery collision with player and map
        game.physics.arcade.collide(this.batteries, this.layer2);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        //LIGHTING
        updateShadowTexture(game, this.player, game.global.shadowTexture);

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
        game.physics.arcade.overlap(this.player, this.flyingGroup, this.resetPlayer, null, this);

        //collision with exit
        game.physics.arcade.collide(this.player, this.exit, this.nextLevel, null, this);

        //Uncomment for collision to spark victory
        //  game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('Victory');
        // });

        if(game.global.lives === 0){
            destroyLevel(this);
            destroyMusic();
            game.state.start('GameOver');
        }
        
        //Player collsion with piglets
        game.physics.arcade.collide(this.player, this.livesGroup, gainLife, null, this);
        
        this.scoreTxt.setText(`Score: ${game.global.score}`);
        this.lifeTxt.setText(`lives: ${game.global.lives}`);
        this.timerTxt.setText(`Timer: ${game.global.time}s`);

    },
    nextLevel: function(){
        this.game.global.score += this.game.global.time;
        destroyLevel(this);
        this.state.start('Level3');
    },
    resetPlayer: function(player, enemyGroup){
        this.game.global.lives--;
        player.reset(250, this.game.world.height - 1100);
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
