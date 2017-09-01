Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
        createText(game, 'Game Over', 615, 325, '100px Architects Daughter', '#FFF');
        createButton(game, 'Go Back to Menu', 175, 75,
        275, 60, () => {
            this.state.start('MainMenu');
        });
    }
};
