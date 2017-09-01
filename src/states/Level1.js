'use strict';

Game.Level1 = function(game){
};

Game.Level1.prototype = {
    init: function() {
        let platforms;
        let player;
        let cursors;
        let batteries;
        let scoreText;
        let timer;
        let totalTime;
        let timerTxt;
        let layer;
        let enemyGroup;
        let exit;
        let flyingGroup;
        let tentacleGroup;
    }, 
    create: function(game) {
        this.game.global.score = 0;
        this.game.global.tentacleFrame = 'start';

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
        
        //Creating Shadows
        this.enemyGroup = game.add.group();
        new Shadow(game, 640, game.world.height - 250, 100, this.layer, this.enemyGroup);
        new Shadow(game, 1950, game.world.height - 200, 100, this.layer, this.enemyGroup);
        new Shadow(game, 1024, game.world.height - 100, 100, this.layer, this.enemyGroup);
        // new Tentacle(game, 1300, game.world.height - 290, 100, this.layer, this.enemyGroup);
        // new Tentacle(game, 350, game.world.height - 190, 100, this.layer, this.enemyGroup);
        // new Tentacle(game, 2460, game.world.height - 490, 100, this.layer, this.enemyGroup);

        this.enemyGroup.setAll('body.immovable', true);

        this.tentacleGroup = game.add.group();
        //new Tentacle(game, 1300, game.world.height - 290, 100, this.layer, this.tentacleGroup);
        new Tentacle(game, 350, game.world.height - 190, 100, this.layer, this.tentacleGroup);
        //new Tentacle(game, 2460, game.world.height - 490, 100, this.layer, this.tentacleGroup);

        this.tentacleGroup.setAll('body.immovable', true);

        this.flyingGroup = game.add.group();
        new Bat(game, 250, game.world.height - 500, 1000, this.layer, this.flyingGroup);
        new Bat(game, 1400, game.world.height - 200, 600, this.layer, this.flyingGroup);
        new Bat(game, 2000, game.world.height - 550, 1000, this.layer, this.flyingGroup);

        this.flyingGroup.setAll('body.immovable', true);

        this.batteries = createBatteries(game);

        this.exit = game.add.sprite(3000, game.world.height - 350, 'tree');

        this.timer = createTimer(game,
                                ()=>{
                                    this.camera.reset();
                                    this.state.start('GameOver');
                                });
        // this.timer = createTimer(game,
        //                         ()=>{
        //                             this.camera.reset();
        //                             this.state.start('GameOver');
        //                         });


        // this.timerTxt = createText(game, `Timer: ${(this.timer.duration/1000).toPrecision(2)}s`, 1300, 50, '30px Freckle Face', '#FFF', 'center');
        // this.timerTxt.fixedToCamera = true;

        ////////TRYING TO CREATE CUSTOM TIMER///////////////////
        this.totalTime = 30;
        this.timerTxt = createText(game, `Timer: ${this.totalTime}s`, 1350, 50, '30px Freckle Face', '#FFF', 'center');
        this.timerTxt.anchor.set(0.5, 0.5);
        this.timerTxt.fixedToCamera = true;
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
        

        ///////////////CUSTOM TIMER ATTEMPT ABOVE///////////////////

        this.scoreText = createText(game, 'Score: 0', 150, 50, '30px Freckle Face', '#FFF');
        this.scoreText.fixedToCamera = true;
    }, 
    tick: function(game) {
        this.totalTime--;
        console.log('subtract time', this.totalTime);
        if(this.totalTime === 0) {
            this.camera.reset();
            this.state.start('GameOver');
        }
    },
    update: function(game) {
        let hitPlatforms = game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.batteries, this.layer);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);


        playerActions(this.cursors, this.player, hitPlatforms);

        //tile collision with enemies
        game.physics.arcade.collide(this.enemyGroup, this.layer);
        this.enemyGroup.forEach(function(enemy){
            enemy.animations.play('rise');
        });

        game.physics.arcade.collide(this.tentacleGroup, this.layer);
        // this.tentacleGroup.forEach(function(enemy){
        //     enemy.animations.play('final');
        // });
        this.tentacleGroup.forEach(function(enemy){
            if (enemy.animations.currentFrame.index === 0 && enemy.game.global.tentacleFrame === 'start'){
                enemy.animations.play('rise');
                enemy.body.setSize(25, 25, 0, -50);
                enemy.game.global.tentacleFrame = 'rise';
                // updateHitBox(enemy, 25, 25, 50,'rise');
            } else if (enemy.animations.currentFrame.index === 5 && enemy.game.global.tentacleFrame === 'rise') {
                enemy.body.setSize(25, 75, 0, 0);
                enemy.game.global.tentacleFrame = 'final';
                //updateHitBox(enemy, 25, 25, 0, 'final');
            } else if (enemy.animations.currentFrame.index === 9 && enemy.game.global.tentacleFrame === 'final') {
                enemy.body.setSize(25, 90,0, 0);
                enemy.game.global.tentacleFrame = 'fall';
                //updateHitBox(enemy, 25, 25, 50, 'fall');
            } else if (enemy.animations.currentFrame.index === 9 && enemy.game.global.tentacleFrame === 'fall') {
              enemy.body.setSize(25, 75, 0, 0);
                enemy.game.global.tentacleFrame = 'end';
                //updateHitBox(enemy, 25, 25, 90, 'end');
            } else if (enemy.animations.currentFrame.index === 6 && enemy.game.global.tentacleFrame === 'end'){
              enemy.body.setSize(25, 25, 0, 0);
                enemy.game.global.tentacleFrame = 'start';
                //updateHitBox(enemy, 25, 25, 90, 'start');
            } else {
              return;
            }
        })

        game.physics.arcade.collide(this.flyingGroup, this.layer);
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
        // game.physics.arcade.collide(this.player, this.enemyGroup, ()=>{
        //     this.state.start('GameOver');
        // });

        // this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);
        this.timerTxt.setText(`Timer: ${this.totalTime}s`);
        

    },
    resetPlayer: function(player, enemyGroup){
        player.reset(32, 650);
    },
    render:function(game) {
        
        // Sprite debug info
        // game.debug.spriteInfo(this.shadow, 80, 70);
        // let y = 0;
        this.enemyGroup.forEach(function(enemy){
            game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.tentacleGroup.forEach(function(enemy){
            game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        this.flyingGroup.forEach(function(enemy){
            game.debug.body(enemy);
            // game.debug.bodyInfo(enemy, 32, y=y+128);
        });
        // game.debug.body(this.player);
        // game.debug.bodyInfo(this.player, 32, 256);
    }
};
