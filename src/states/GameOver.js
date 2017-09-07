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
        background.scale.setTo(0.8, 0.8);

        let grim = game.add.sprite(400, 275, 'grim');
        grim.anchor.setTo(0.4, 0.4);
        grim.scale.setTo(0.5, 0.5);
        
        createText(game, 'Game Over', 175, 125, '150px murderFont', '#FFF');
        createText(game, 'YOUR SOUL IS MINE!', 425, 350, '80px murderFont', '#FFF','center', 0.5, 0.5);
        createButton(game, 'Go Back to Menu', 100, 50, 175, 50,
        () => {
            this.state.start('MainMenu');
        });

        // let highScore = 'Name';
        // createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');
        
        // highScore = 'Score';
        // createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');
            
        // let yPosText = 200;
    }
};
