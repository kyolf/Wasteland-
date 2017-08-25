Game.HighScores = function(game){

}

Game.HighScores.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
    
        createText(game, 'High Scores', 800/3, 50, '40px Arial', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 125, 75, 200, 50, 
        () => {
            this.state.start('MainMenu');
        });
    
        let highScore = 'Name';
        createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');      
    }
};
