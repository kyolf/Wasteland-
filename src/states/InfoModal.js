Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {
    create: function(game) {
        game.add.sprite(0,0,'bg2');
      
        createText(game, 'Instructions', 600, 50, '70px Architects Daughter', '#FFF', 'center');
    
        createButton(game, 'Go Back to Menu', 175, 75, 275, 60, 
                    () => {
                        this.state.start('MainMenu');
                    }
        );
    
        let howToPlay = 'Reach the Goal while collecting batteries';
        createText(game, howToPlay, 450, 275, '40px Architects Daughter', '#FFF', 'center');
        
        howToPlay = 'Up Arrow Key to Jump';
        createText(game, howToPlay, 600, 375, '40px Architects Daughter', '#FFF', 'center');
        
        howToPlay = 'Left Arrow Key to Move Left and Right Arrow Key to Move Right';
        createText(game, howToPlay, 300, 475, '40px Architects Daughter', '#FFF', 'center');
    }
};

