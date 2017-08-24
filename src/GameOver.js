Game.GameOver = function(game){

};

Game.GameOver.prototype = {create:createGameOver};

function createGameOver(game){
    game.add.sprite(0,0,'sky');
    createText(game, 'High Scores', 800/3, 50, '40px Arial', '#FFF', 'center');
    createButton(game, 'Go Back to Menu', 125, 75,
    200, 50, () => {
        this.state.start('MainMenu');
    });
}