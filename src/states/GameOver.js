Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
        createText(game, 'Game Over', 800/3, 50, '40px Arial', '#FFF');
        createButton(game, 'Go Back to Menu', 125, 75,
        200, 50, () => {
            this.state.start('MainMenu');
        });
    }
};
