Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
        let background = game.add.sprite(0,0,'gameover');
        background.scale.setTo(0.8, 1);
        let grim = game.add.sprite(800, 350, 'grim');
        grim.anchor.setTo(0.5,0.5);
        grim.scale.setTo(0.7,0.7);
        createText(game, 'Game Over', 615, 325, '100px Freckle Face', '#FFF');
        createText(game, 'YOUR SOUL IS MINE!', 1200, 100, '60px Freckle Face', '#FFF','center', 0.5, 0.5);
        createButton(game, 'Go Back to Menu', 175, 75,
        275, 60, () => {
            this.state.start('MainMenu');
        });
    }
};
