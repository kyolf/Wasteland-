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
        this.game.global.score = 0;
        this.game.global.initials = '';
        this.game.global.tentacleFrame = 'start';
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#00112d';

        let background = game.add.sprite(0, 0, 'bg2');
        background.scale.setTo(1, 1);
        
        this.layer2 = createMaps(game, 'map1', 'lvl1bg');
      
        //see collision blocks
        //this.layer2.debug = true;
        this.player = createPlayer(game);
        this.player.lifes = 3;

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
        new Piglet(game, 500, game.world.height - 250, 100, this.layer, this.lifesGroup);
        new Piglet(game, 100, game.world.height - 100, 100, this.layer, this.lifesGroup);
        new Piglet(game, 1000, game.world.height - 100, 100, this.layer, this.lifesGroup);

        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 640, game.world.height - 250, 100, this.layer, this.enemyGroup);
        new Shadow(game, 1950, game.world.height - 200, 100, this.layer, this.enemyGroup);
        new Shadow(game, 1024, game.world.height - 100, 100, this.layer, this.enemyGroup);

        this.enemyGroup.setAll('body.immovable', true);

        this.tentacleGroup = game.add.group();
        new Tentacle(game, 1300, game.world.height - 275, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 350, game.world.height - 180, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 2460, game.world.height - 405, 100, this.layer, this.tentacleGroup);

        this.tentacleGroup.setAll('body.immovable', true);

        this.flyingGroup = game.add.group();
        new Bat(game, 250, game.world.height - 500, 1000, this.layer, this.flyingGroup);
        new Bat(game, 1400, game.world.height - 200, 600, this.layer, this.flyingGroup);
        new Bat(game, 2000, game.world.height - 550, 1000, this.layer, this.flyingGroup);

        this.flyingGroup.setAll('body.immovable', true);
        
        this.batteries = createBatteries(game);

        this.exit = game.add.sprite(3000, game.world.height - 350, 'tree');

        //Music
        this.music = game.add.audio('level1_music');
        this.music.play('', 0, 1, true, true);
        this.music1 = this.add.audio('heart_slow');
        this.music2 = this.add.audio('heart_fast');
        this.hbFastStopped = true;
        this.hbSlowStopped = true;
        
         ////////////LIGHTING BEGINS///////////
        this.lightRadius = 400;
        this.shadowTexture = game.add.bitmapData(4000, 4000);
        
        this.light = game.add.image(0, 0, this.shadowTexture);
        this.light.blendMode = Phaser.blendModes.MULTIPLY;

        ///////////////LIGHTING ENDS/////////////

         ////////CREATE CUSTOM TIMER///////////////////
        this.totalTime = 30;
        this.timerTxt = createText(game, `Timer: ${this.totalTime}s`, 1350, 75, '30px Architects Daughter', '#FFF', 'center');
        this.timerTxt.anchor.setTo(0.5, 0.5);
        this.timerTxt.fixedToCamera = true;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);

        ///////////////CUSTOM TIMER ABOVE///////////////////

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Architects Daughter', '#FFF');
        this.scoreText.fixedToCamera = true;

        this.lifeTxt = createText(game, `Life:`, 25, 100, '30px Architects Daughter', '#FFF', 'center');
        this.lifeTxt.fixedToCamera = true;


    }, 
    tick: function(game) {
        this.totalTime--;

        this.lightRadius = lightRadiusSize(this.totalTime);

        musicPlayed(this.totalTime, this.music, this.music1, this.music2);
        
        if(this.totalTime === 0) {
            goToGameOver(this.music, this.music1, this.music2, this.state);
        }
    },
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer2);
        game.physics.arcade.collide(this.batteries, this.layer2);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        /////LIGHTING BEGINS//////
        this.updateShadowTexture();

        //////////////LIGHTING ENDS//////////////

        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with piglet
        game.physics.arcade.collide(this.lifesGroup, this.layer);
        this.lifesGroup.forEach(function(piglet){
            if(piglet.previousPosition.x >= piglet.position.x){
                piglet.animations.play('left');
            }
            else{
                piglet.animations.play('right');
            }
        });
        
        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer);
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
        game.physics.arcade.collide(this.player, this.enemyGroup, this.resetPlayer);
        game.physics.arcade.collide(this.player, this.tentacleGroup, this.resetPlayer);
        game.physics.arcade.collide(this.player, this.flyingGroup, this.resetPlayer);

        //////////////////////////If we want game over//////////////////////////////
        game.physics.arcade.collide(this.player, this.exit, this.nextLevel);
        // game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('GameOver');
        // });

        //Uncomment for collision to spark victory
        //  game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('Victory');
        // });

        if(this.player.lifes === 0){
            goToGameOver(this.music, this.music1, this.music2, game.state);
        }

        game.physics.arcade.collide(this.player, this.lifesGroup, gainLife);
        
        this.lifeTxt.setText(`Lifes: ${this.player.lifes}`);
        this.timerTxt.setText(`Timer: ${this.totalTime}s`);

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
      this.state.start('Level1');
    },
    resetPlayer: function(player, enemyGroup){
        player.lifes--;
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
