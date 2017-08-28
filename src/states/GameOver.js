Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        fetchTopScores()
        .then(highScores => {
            if (highScores.length >= 10) {
                if (highScores[highScores.length - 1].score < this.game.global.score) {
                    let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                    postTopScores(this.game.global.score, this.game.global.initials)
                    .then(scores => {
                        scores.map(topScore => {
                            createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                            createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                            yPosText += 50;
                        });
                    });
                } else {
                    fetchTopScores()
                    .then(topScores=>{
                        topScores.map(topScore => {
                        createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                        createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                        yPosText += 50;
                        });
                    })
                    .catch(err => {
                        return err;
                    });
                }
            } else {
                let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                postTopScores(this.game.global.score, this.game.global.initials)
                .then(scores => {
                    scores.map(topScore => {
                        createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                        createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                        yPosText += 50;
                    });
                });
          }
        })
        game.add.sprite(0,0,'bg2');
        createText(game, 'High Scores', 800/3, 50, '40px Arial', '#FFF');
        createButton(game, 'Go Back to Menu', 125, 75,
            200, 50, () => {
                this.state.start('MainMenu');
            });

        let highScore = 'Name';
        createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');
        
        highScore = 'Score';
        createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');
            
        let yPosText = 200;

        this.game.global.score = 0;
        this.game.global.initials = '';
    }
};
