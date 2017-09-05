Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
      
        createText(game, 'Instructions', 250, 100, '80px murderFont', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 175, 50, 200, 50, 
                    () => {
                        this.state.start('MainMenu');
                    }
        );
    
        let howToPlay = 'Find the exit while collecting batteries';
        createText(game, howToPlay, 175, 250, '40px murderFont', '#FFF', 'center');
        
        howToPlay = 'Up arrow key to jump';
        createText(game, howToPlay, 275, 315, '40px murderFont', '#FFF', 'center');
        
        howToPlay = 'Left arrow key to move left';
        createText(game, howToPlay, 230, 380, '40px murderFont', '#FFF', 'center');

        howToPlay = 'Right arrow key to move right';
        createText(game, howToPlay, 230, 445, '40px murderFont', '#FFF', 'center');
    }
};

