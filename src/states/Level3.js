'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        let platforms;
        let player;
        let cursors;
        let batteries;
        let lives;
        let lifeTxt;
        let score;
        let scoreText;
        let timer;
        let totalTime;
        let timerTxt;
        let layer;
        let enemyGroup;
        let exit;
        let flyingGroup;
        let tentacleGroup;
        let light;
        let shadowTexture;
        let lightRadius;
        this.losingTime = false;
    }, 
    create: function(game) {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        game.global.score = 0;
        game.global.initials = '';
        game.global.tentacleFrame = 'start';

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#00112d';

        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(0.5, 0.5);
        
        this.layer2 = createMaps(game, 'map2', 'lvl2bg');
      
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
        
        this.batteries = game.add.group();
        new Batteries(game, 96, game.world.height - 800, 0, this.layer, this.batteries);
        new Batteries(game, 128, game.world.height - 224, 0, this.layer, this.batteries);
        new Batteries(game, 1152, game.world.height - 768, 0, this.layer, this.batteries);
        new Batteries(game, 1216, game.world.height - 128, 0, this.layer, this.batteries);
        new Batteries(game, 1952, game.world.height - 928, 0, this.layer, this.batteries);
        new Batteries(game, 2816, game.world.height - 672, 0, this.layer, this.batteries);
        new Batteries(game, 2656, game.world.height - 96, 0, this.layer, this.batteries);
        new Batteries(game, 3232, game.world.height - 128, 0, this.layer, this.batteries);

        this.exit = game.add.sprite(4608, game.world.height - 608, 'portal');
        game.physics.arcade.enable(this.exit); 
        this.exit.enableBody = true;

        //Music
        window.music = game.add.audio('level1_music');
        window.music.play('', 0, 1, true, true);
        window.music1 = this.add.audio('heart_slow');
        window.music2 = this.add.audio('heart_fast');
        this.hbFastStopped = true;
        this.hbSlowStopped = true;
        
         ////////////LIGHTING BEGINS///////////
        this.lightRadius = 400;
        this.shadowTexture = game.add.bitmapData(4000, 4000);
        
        this.light = game.add.image(0, 0, this.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

         ////////CREATE CUSTOM TIMER///////////////////
        game.global.time = 30;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, game);

        ///////////////CUSTOM TIMER ABOVE///////////////////
        const {lifeTxt, scoreTxt, timerTxt} = createLevelText(game, '30px Architects Daughter');
        this.lifeTxt = lifeTxt;
        this.scoreTxt = scoreTxt;
        this.timerTxt = timerTxt;

    }, 
    tick: function(game) {
        this.global.time--;

        this.lightRadius = lightRadiusSize(this.global.time);

        musicPlayed(this.global.time, window.music, window.music1, window.music2);
        
        if(this.global.time === 0) {
            goToGameOver(window.music, window.music1, window.music2, this.state);
        }
    },
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer2);
        game.physics.arcade.collide(this.batteries, this.layer2);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, game);

        /////LIGHTING BEGINS//////
        this.updateShadowTexture();

        //////////////LIGHTING ENDS//////////////

        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with piglet
        game.physics.arcade.collide(this.lifesGroup, this.layer2);
        this.lifesGroup.forEach(function(piglet){
            if(piglet.previousPosition.x >= piglet.position.x){
                piglet.animations.play('left');
            }
            else{
                piglet.animations.play('right');
            }
        });
        
        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer2);
        this.enemyGroup.forEach(function(enemy){
            if (enemy.animations.currentFrame.index === 0 && enemy.game.global.shadowFrame === 'start'){
                enemy.animations.play('rise');
                enemy.body.setSize(25, 10, 30, 55);
            } else if (enemy.animations.currentFrame.index === 3) {
                enemy.body.setSize(80, 25, 0, 45);
            } else if (enemy.animations.currentFrame.index === 8) {
                enemy.body.setSize(80, 45, 0, 25);
            } else if (enemy.animations.currentFrame.index === 12) {
                enemy.body.setSize(80, 70, 0, 0);
                enemy.game.global.tentacleFrame = 'fall';
            } else if (enemy.animations.currentFrame.index === 11 && enemy.game.global.tentacleFrame === 'fall') {
                enemy.body.setSize(80, 45, 0, 25);
            } else if (enemy.animations.currentFrame.index === 7 && enemy.game.global.tentacleFrame === 'fall') {
              enemy.body.setSize(80, 25, 0, 45);
            } else if (enemy.animations.currentFrame.index === 4 && enemy.game.global.tentacleFrame === 'fall') {
              enemy.body.setSize(25, 10, 30, 55);
              enemy.game.global.tentacleFrame = 'start';
            } else {
              return;
            }
        });

        game.physics.arcade.collide(this.tentacleGroup, this.layer2);
        this.tentacleGroup.forEach(function(enemy){
            if (enemy.animations.currentFrame.index === 0 && enemy.game.global.tentacleFrame === 'start'){
                enemy.animations.play('rise');
                enemy.body.setSize(25, 25, 0, 65);
            } else if (enemy.animations.currentFrame.index === 9) {
                enemy.body.setSize(25, 65, 0, 25);
            } else if (enemy.animations.currentFrame.index === 13) {
                enemy.body.setSize(25, 90, 0, 0);
                enemy.game.global.tentacleFrame = 'fall';
            } else if (enemy.animations.currentFrame.index === 12 && enemy.game.global.tentacleFrame === 'fall') {
                enemy.body.setSize(25, 65, 0, 25);
            } else if (enemy.animations.currentFrame.index === 8){
                enemy.body.setSize(25, 25, 0, 65);
                enemy.game.global.tentacleFrame = 'start';
            } else {
                return;
            }
        });

        game.physics.arcade.collide(this.flyingGroup, this.layer2);
        this.flyingGroup.forEach(function(enemy){
            if(enemy.previousPosition.x >= enemy.position.x){
                enemy.animations.play('left');
            }else{
                enemy.animations.play('right');
            }
        });

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
            goToGameOver(window.music, window.music1, window.music2, game.state);
        }

        game.physics.arcade.collide(this.player, this.lifesGroup, gainLife, null, game);
        
        this.scoreTxt.setText(`Score: ${game.global.score}`);
        this.lifeTxt.setText(`Lifes: ${game.global.lifes}`);
        this.timerTxt.setText(`Timer: ${game.global.time}s`);

    },
    updateShadowTexture: function (game, player) {
        this.shadowTexture.context.fillStyle = '#00040c';
        this.shadowTexture.context.fillRect(0, 0, 4000, 8000);
    
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

    nextLevel: function(){
        player.game.global.score += player.game.global.totalTime;
        this.state.start('Victory');
    },
    resetPlayer: function(player, enemyGroup){
        this.global.lifes--;
        player.reset(632, 50);
    },
    render:function(game) {
        // Sprite debug info
        // game.debug.spriteInfo(this.shadow, 80, 70);
        // let y = 0;
        this.enemyGroup.forEach(function(enemy){
            //game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.tentacleGroup.forEach(function(enemy){
            //game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.flyingGroup.forEach(function(enemy){
            //game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        // game.debug.body(this.player);
        // game.debug.bodyInfo(this.player, 32, 256);
    }
};
