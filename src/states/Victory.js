Game.Victory = function(game){
    
};

Game.Victory.prototype = {
    create: function(game) {
        this.bg = game.add.sprite(0,0,'victory');
        this.bg.scale.setTo(0.8,1);
        createText(game, 'Victory', 615, 325, '100px Freckle Face', '#FFF');
        createButton(game, 'Go Back to Menu', 175, 75,
        275, 60, () => {
            this.state.start('MainMenu');
        });
    }
};
