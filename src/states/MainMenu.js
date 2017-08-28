Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {
    create:function(game) {
        //Background
        game.add.sprite(0,0,'bg2');

        //Title
        createText(game, 'Wasteland', game.world.centerX, 250, '40px Arial', '#FFF', 'center', 0.5, 0.5);

        // console.log(game.world.centerX, game.world.centerY);
        
        //Buttons
        createButton(game, 'Play Game', game.world.centerX, 350, 200, 50,
                    () => {
                        this.state.start('Level1');
                    });
        
        createButton(game, 'About', game.world.centerX, 450, 200, 50,
                    () => {
                        this.state.start('InfoModal');
                    });
        createButton(game, 'High Scores', game.world.centerX, 550, 200, 50,
                    () => {
                        this.state.start('HighScores');
                    });    
    },
    update: function() {

    },
};
