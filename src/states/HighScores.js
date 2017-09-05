Game.HighScores = function(game){

}

Game.HighScores.prototype = {
    // init: function() {
    //     let highScores;
    // },
    create: function(game) {
        game.add.sprite(0,0,'bg2');
    
        createText(game, 'High Scores', 675, 50, '70px murderFont', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 175, 75, 275, 60, 
        () => {
            this.state.start('MainMenu');
        });
    
        let highScore = 'Name';
        createText(game, highScore, 500, 175, '40px murderFont', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, 1050, 175, '40px murderFont', '#FFF', 'center');
        
        let yPosText = 250;
        fetchTopScores()
        .then(topScores=>{
            topScores.map(topScore =>{
                createText(game, topScore.initials, 500, yPosText, '25px murderFont', '#FFF');
                createText(game, topScore.score, 1075, yPosText, '25px murderFont', '#FFF');
                yPosText += 50;
            });
        })
        .catch(err => {
            return err;
        });
    }
};
