Game.GameOver = function(game) {
};

Game.GameOver.prototype = {
    create: function(game) {
        game.global.shadowTexture.destroy();
        game.global.menuMusic = true;

        fetchTopScores()
        .then(highScores => {
            if(highScores.length >= 10) {
                if(highScores[highScores.length - 1].score < this.game.global.score) {
                    let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                    postTopScores(this.game.global.score, this.game.global.initials)
                    .then(() => game.state.start('HighScores'));
                }
            } 
            else {
                let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                postTopScores(this.game.global.score, this.game.global.initials)
                .then(() => game.state.start('HighScores'));
            }
        });

        let background = game.add.sprite(0, 0, 'gameover');
        background.scale.setTo(0.5, 0.5);

        // let grim = game.add.sprite(400, 275, 'grim');
        // grim.anchor.setTo(0.4, 0.4);
        // grim.scale.setTo(0.5, 0.5);

        this.playerDead = game.add.sprite(265, 275, 'faint');
        this.playerDead.animations.add('fainting', [5, 0, 2, 1, 3, 4, 5], 10, true);
        this.playerDead.animations.play('fainting');
        this.playerDead.animations.currentAnim.setFrame(1, true);
        this.playerDead.animations.currentAnim.speed = 4;
        this.playerDead.events.onAnimationLoop.add(function(){return this.playerDead.animations.stop();}, this);
        
        
        createText(game, 'Game Over', 175, 125, '150px murderFont', '#FFF');
        // createText(game, 'YOUR SOUL IS MINE!', 425, 350, '80px murderFont', '#FFF','center', 0.5, 0.5);
        createImageButton(game, 'Go Back to Menu', 250, 50, 100, 50);
        
        this.arrow = game.add.sprite(80, 50, 'piglet');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.canMove = true;
        this.arrow.animations.add('right', [2,3], 5, true);
    },
    update: function(game) {
        this.arrow.animations.play('right');
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('MainMenu');
        }
    }
};
