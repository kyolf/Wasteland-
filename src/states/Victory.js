Game.Victory = function(game){
    
};

Game.Victory.prototype = {
    create: function(game) {
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        
        this.bg = game.add.sprite(0,0,'victory');
        this.bg.scale.setTo(0.8,1);
        createText(game, 'Congrats, You Escaped', 800, 325, '100px murderFont', '#FFF', 'center', 0.5, 0.5);
        createButton(game, 'Go Back to Menu', 175, 75,
        275, 60, () => {
            this.state.start('MainMenu');
        });
    }
};
