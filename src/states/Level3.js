'use strict';

Game.Level3 = function(game) {
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

        //Reset the game.global values
        game.global.shadowTexture.destroy();
        game.global.initials = '';
        game.global.tentacleFrame = 'start';
        game.global.shadowFrame = 'start';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Map Creation
        this.layer2 = createMaps(game, 'map3', 'lvl3bg');
      
        //Player Initialization
        this.player = createPlayer(game, 632, game.world.height - 1450);

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
        new Piglet(game, 1472, game.world.height - 864, 100, this.livesGroup);


        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 1024, game.world.height - 800, 100, this.enemyGroup);
        new Shadow(game, 224, game.world.height - 660, 100, this.enemyGroup);
        new Shadow(game, 1024, game.world.height - 540, 100, this.enemyGroup);
        new Shadow(game, 256, game.world.height - 250, 100, this.enemyGroup);
        new Shadow(game, 3104, game.world.height - 190, 100, this.enemyGroup);
        new Shadow(game, 2400, game.world.height - 120, 100, this.enemyGroup);
        new Shadow(game, 2176, game.world.height - 1656, 100, this.enemyGroup);
        new Shadow(game, 3136, game.world.height - 1624, 100, this.enemyGroup);
        new Shadow(game, 3040, game.world.height - 124, 100, this.enemyGroup);
        
        this.enemyGroup.setAll('body.immovable', true);

        //Creating Tentacles
        this.tentacleGroup = game.add.group();
        new Tentacle(game, 832, game.world.height - 540, 100, this.tentacleGroup);
        new Tentacle(game, 992, game.world.height - 160, 100, this.tentacleGroup);
        new Tentacle(game, 1532, game.world.height - 160, 100, this.tentacleGroup);
        new Tentacle(game, 1728, game.world.height - 160, 100, this.tentacleGroup);
        new Tentacle(game, 1920, game.world.height - 890, 100, this.tentacleGroup);
        new Tentacle(game, 2560, game.world.height - 700, 100, this.tentacleGroup);
        new Tentacle(game, 3584, game.world.height - 830, 100, this.tentacleGroup);
        
        this.tentacleGroup.setAll('body.immovable', true);

        //Creating Bats
        this.flyingGroup = game.add.group();
        new Bat(game, 384, game.world.height - 1056, 960, this.flyingGroup);
        new Bat(game, 128, game.world.height - 320, 1536, this.flyingGroup);
        new Bat(game, 1664, game.world.height - 544, 2176, this.flyingGroup);
        new Bat(game, 2528, game.world.height - 672, 3296, this.flyingGroup);
        new Bat(game, 3712, game.world.height - 672, 4096, this.flyingGroup);
        
        this.flyingGroup.setAll('body.immovable', true);
        
        //Creating Batteries
        this.batteries = game.add.group();
        new Batteries(game, 96, game.world.height - 860, this.batteries);
        new Batteries(game, 128, game.world.height - 280, this.batteries);
        new Batteries(game, 1152, game.world.height - 830, this.batteries);
        new Batteries(game, 1216, game.world.height - 190, this.batteries);
        new Batteries(game, 1952, game.world.height - 990, this.batteries);
        new Batteries(game, 2816, game.world.height - 730, this.batteries);
        new Batteries(game, 2656, game.world.height - 160, this.batteries);
        new Batteries(game, 3232, game.world.height - 230, this.batteries);

        
        this.exit = game.add.sprite(4640, game.world.height - 1270, 'portal');
        // this.exit = game.add.sprite(500, game.world.height - 970, 'portal');
        game.physics.arcade.enable(this.exit); 
        this.exit.enableBody = true;
        
         //LIGHTING BEGINS
        game.global.shadowTexture = game.add.bitmapData(4800, 4000);
        
        this.light = game.add.image(0, 0, game.global.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

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
        game.physics.arcade.collide(this.player, this.flyingGroup, this.resetPlayer, null, this);

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
        destroyMusic();
        this.state.start('Victory');
    },
    resetPlayer: function(player, enemyGroup){
        this.game.global.lives--;
        player.reset(632, this.game.world.height - 1450);
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
