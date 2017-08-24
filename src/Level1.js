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
        let timerTxt;
        let layer;
    }, 
    create: function(game) {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        let sky = game.add.sprite(0, 0, 'bg2');

        this.layer = createMaps(game, 'map');
      
        //see collision blocks
        //this.layer.debug = true;
        this.player = createPlayer(game);

        this.player.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
        this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 10, true);

        //Toggle between the below cursors if you want up to be jump
        //or spacebar to be jump....no other changes anywhere else is necessary

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
    }, 
    update:function(game) {
        let hitPlatforms = this.game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.batteries, this.layer);
        game.physics.arcade.overlap(this.player, this.batteries, collectBattery, null, this);

        playerActions(this.cursors, this.player, hitPlatforms);

        this.timerTxt.setText(`Timer: ${(this.timer.duration/1000).toPrecision(2)}s`);
    }

};
