
Game.Level1 = function(game){
};

Game.Level1.prototype = {init:initLevel1, create:createLevel1, update:updateLevel1};

function initLevel1() {
			let platforms;
			let player;
			let cursors;
      let stars;
      let score;
			let scoreText;
      let timer;
      let timerTxt;
}

function createLevel1(game) {
      this.score = 0;
			game.physics.startSystem(Phaser.Physics.ARCADE);
      let sky = game.add.sprite(0, 0, 'sky');

      //platforms includes ground and ledges
      this.platforms = game.add.group();
      //enable physics in this group
      this.platforms.enableBody = true;

      let ground = this.platforms.create(0, game.world.height - 64, 'platform');
      ground.scale.setTo(3, 3);
      ground.body.immovable = true;

      let ledge = this.platforms.create(600, 400, 'platform');
      ledge.body.immovable = true;

      ledge = this.platforms.create(-100, 100, 'platform');
      ledge.body.immovable = true;

      ledge = this.platforms.create(200, 250, 'platform');
      ledge.body.immovable = true;

      this.player = game.add.sprite(32, game.world.height - 150, 'dude');
      game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;

      //tried increasing this to 500 and couldn't really jump
      this.player.body.gravity.y = 300; 

      //this is true or body will rebound back into the world
      //if false, then body will leave the world upon collision
      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);

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

			this.stars = game.add.group();
			this.stars.enableBody = true;

			for(let i = 0; i < 15; i++) {
				let star = this.stars.create(i * 50, 0, 'star');
				star.body.gravity.y = 500;
				star.body.bounce.y= 0.5 + Math.random() * 0.2;
			}
      
      this.timer = game.time.create();
      this.timer.add(30000,
      ()=>{
          this.state.start('GameOver');
      }, this);
      this.timer.start();
      this.timerTxt = createText(game, `Timer: ${this.timer.duration}s`, 600, 50, '30px Arial', '#000', 'center');
      this.scoreText = this.game.add.text(16, 16, 'Score: 0',
      {fontSize: '32px', fill: '#ffffff'});
}

function updateLevel1(game) {
      
      let hitPlatforms = this.game.physics.arcade.collide(this.player, this.platforms);
			game.physics.arcade.collide(this.stars, this.platforms);
			game.physics.arcade.overlap(this.player, this.stars, collectStar, null, this);

      this.player.body.velocity.x = 0;
      //can make movement more complex
      if(this.cursors.left.isDown) {
        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
      } else if(this.cursors.right.isDown) {
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
      } else if(this.cursors.down.isDown) {
				this.player.body.velocity.y = 350;
				this.player.animations.play('down');
			} else {
        this.player.animations.stop();
        this.player.frame = 4; //fourth frame in spritesheet is standing still
      }

      //can take out the last two conditions in if statement to allow for jumping in midair
      //possible powerup situation
      if(this.cursors.up.isDown && this.player.body.touching.down && hitPlatforms) {
        this.player.body.velocity.y = -350; //the height of the jump
      }

			console.log('should be 0', this.score);
			function collectStar(player, star) {
				star.kill();
				this.score += 10;
				console.log('should be 10', this.score);
				this.scoreText.text = 'Score: ' + this.score;
			}
      this.timerTxt.setText(`Timer: ${this.timer.duration}s`);
}