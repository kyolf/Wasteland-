Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
      
        createText(game, 'Instructions', 600, 50, '70px Freckle Face', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 175, 75, 250, 50, 
                    () => {
                        this.state.start('MainMenu');
                    }
        );
    
        let howToPlay = 'Reach the Goal while collecting stars';
        createText(game, howToPlay, 475, 300, '40px Freckle Face', '#FFF', 'center');
        
        howToPlay = 'Space Bar to Jump';
        createText(game, howToPlay, 625, 400, '40px Freckle Face', '#FFF', 'center');
        
        howToPlay = 'Left Arrow Key to Move Left and Right Arrow Key to Move Right';
        createText(game, howToPlay, 300, 500, '40px Freckle Face', '#FFF', 'center');
    }
};

