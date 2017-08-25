Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {
    create:function(game) {
        //Background
        game.add.sprite(0,0,'bg2');

        //Title
        createText(game, 'Wasteland', 800, 250, '40px Arial', '#FFF', 'center', 0.5, 0.5);

        console.log(game.world.centerX, game.world.centerY);
        
        //Buttons
        createButton(game, 'Play Game', 800, 350, 200, 50,
                    () => {
                        this.state.start('Level1');
                    });
        
        createButton(game, 'About', 800, 450, 200, 50,
                    () => {
                        this.state.start('InfoModal');
                    });
        createButton(game, 'High Scores', 800, 550, 200, 50,
                    () => {
                        this.state.start('HighScores');
                    });    
    },
    update: function() {

    },
};
