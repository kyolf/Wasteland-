Game.HighScores = function(game){

}

Game.HighScores.prototype = {
    // init: function() {
    //     let highScores;
    // },
    create: function(game) {
        let bg = game.add.sprite(0, 0, 'bg2');
        bg.scale.setTo(0.5, 0.5);
    
        createText(game, 'High Scores', 275, 60, '80px murderFont', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 100, 50, 175, 50, 
        () => {
            this.state.start('MainMenu');
        });
    
        let highScore = 'Name';
        createText(game, highScore, 150, 150, '40px murderFont', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, 600, 150, '40px murderFont', '#FFF', 'center');
        
        let yPosText = 200;
        fetchTopScores()
        .then(topScores=>{
            topScores.map(topScore =>{
                createText(game, topScore.initials, 150, yPosText, '25px murderFont', '#FFF');
                createText(game, topScore.score, 625, yPosText, '25px murderFont', '#FFF');
                yPosText += 50;
            });
        })
        .catch(err => {
            return err;
        });
    }
};
