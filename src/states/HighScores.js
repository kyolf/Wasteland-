Game.HighScores = function(game){

}

Game.HighScores.prototype = {
    // init: function() {
    //     let highScores;
    // },
    create: function(game) {
        game.add.sprite(0,0,'bg2');
    
        createText(game, 'High Scores', 675, 50, '70px Freckle Face', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 175, 75, 250, 50, 
        () => {
            this.state.start('MainMenu');
        });
    
        let highScore = 'Name';
        createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');
        
        let yPosText = 200;
        fetchTopScores()
        .then(topScores=>{
            topScores.map(topScore =>{
                createText(game, topScore.initials, 200, yPosText, '20px Arial', '#FFF');
                createText(game, topScore.score, 500, yPosText, '20px Arial', '#FFF');
                yPosText += 50;
            });
        })
        .catch(err => {
            return err;
        });
    }
};
