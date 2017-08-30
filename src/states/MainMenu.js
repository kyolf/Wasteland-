Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {
    create:function(game) {
        //Background
        game.add.sprite(0,0,'bg2');

        //Title
        createText(game, 'Wasteland', 600, 175, '100px Freckle Face', '#FFF', 'center');

        console.log(game.world.centerX, game.world.centerY);
        
        //Buttons
        createButton(game, 'Play Game', 800, 350, 250, 60,
                    () => {
                        this.state.start('Level1');
                    });
        
        createButton(game, 'About', 800, 450, 250, 60,
                    () => {
                        this.state.start('InfoModal');
                    });
        createButton(game, 'High Scores', 800, 550, 250, 60,
                    () => {
                        this.state.start('HighScores');
                    });    
    },
    update: function() {

    },
};
