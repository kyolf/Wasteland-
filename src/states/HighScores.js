Game.HighScores = function(game){

}

Game.HighScores.prototype = {
    // init: function() {
    //     let highScores;
    // },
    create: function(game) {
        game.add.sprite(0,0,'bg2');
    
        createText(game, 'High Scores', game.world.centerX, 50, '40px Arial', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', game.world.centerX, 150, 250, 50, 
        () => {
            this.state.start('MainMenu');
        });
    
        let highScore = 'Name';
        createText(game, highScore, game.world.centerX/3.3, 225, '20px Arial', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, game.world.centerX/0.6, 225, '20px Arial', '#FFF', 'center');
        
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
