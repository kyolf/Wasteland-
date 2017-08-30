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

        //rain effects
        var emitter = game.add.emitter(game.world.centerX, 0, 400);
      
        emitter.width = game.world.width;
         // uncomment to set an angle for the rain.
      
        emitter.makeParticles('rain');
      
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
      
        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);
      
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
      
        emitter.start(false, 1600, 5, 0);
    },
    update: function() {

    },
};
