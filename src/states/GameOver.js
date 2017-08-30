Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
        createText(game, 'Game Over', 625, 325, '100px Freckle Face', '#FFF');
        createButton(game, 'Go Back to Menu', 175, 75,
        250, 50, () => {
            this.state.start('MainMenu');
        });
    }
};
