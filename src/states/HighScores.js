Game.HighScores = function(game){

}

Game.HighScores.prototype = {create:createHighScores,
                             createButton:createButton,
                             createText:createText};

function createHighScores(game){
    game.add.sprite(0,0,'sky');

    this.createText(game, 'High Scores', 800/3, 50, '40px Arial', '#FFF', 'center');

    this.createButton(game, 'Go Back to Menu', 125, 75,
    200, 50, function(){
        this.state.start('MainMenu');
    });

    let highScore = 'Name';
    this.createText(game, highScore, 200, 150, '20px Arial', '#FFF', 'center');

    highScore = 'Score';
    this.createText(game, highScore, 500, 150, '20px Arial', '#FFF', 'center');
}