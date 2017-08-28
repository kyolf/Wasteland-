Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {
  create: function(game) {
    game.add.sprite(0,0,'bg2');
      
    createText(game, 'Instructions', game.world.centerX, 50, '40px Arial', '#FFF', 'center');
    
    createButton(game, 'Go Back to Menu', game.world.centerX, 175, 200, 50, 
                    () => {
                      this.state.start('MainMenu');
                    }
        );
    
    let howToPlay = 'Reach the Goal while collecting stars';
    createText(game, howToPlay, game.world.centerX, 250, '20px Arial', '#FFF', 'center');
        
    howToPlay = 'Space Bar to Jump';
    createText(game, howToPlay, game.world.centerX, 300, '20px Arial', '#FFF', 'center');
        
    howToPlay = 'Left Arrow Key to Move Left and Right Arrow Key to Move Right';
    createText(game, howToPlay, game.world.centerX, 350, '20px Arial', '#FFF', 'center');
  }
};

