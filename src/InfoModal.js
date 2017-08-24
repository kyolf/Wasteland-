Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
      
        createText(game, 'Instructions', 500, 50, '40px Arial', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 125, 75, 200, 50, 
                    () => {
                        this.state.start('MainMenu');
                    }
        );
    
        let howToPlay = 'Reach the Goal while collecting stars';
        createText(game, howToPlay, 50, 150, '20px Arial', '#FFF', 'center');
        
        howToPlay = 'Space Bar to Jump';
        createText(game, howToPlay, 50, 200, '20px Arial', '#FFF', 'center');
        
        howToPlay = 'Left Arrow Key to Move Left and Right Arrow Key to Move Right';
        createText(game, howToPlay, 50, 250, '20px Arial', '#FFF', 'center');
    }
};

