Game.InfoModal = function(game){

};

Game.InfoModal.prototype = {create:createInfo, 
                            createButton:createButton,
                            createText:createText};

function createInfo(game){  
    game.add.sprite(0,0,'sky');

    this.createText(game, 'Instructions', 800/3, 50, '40px Arial', '#FFF', 'center');

    this.createButton(game, 'Go Back to Menu', 125, 75,
    200, 50, function(){
        this.state.start('MainMenu');
    });

    let howToPlay = 'Reach the Goal while collecting stars';
    this.createText(game, howToPlay, 50, 150, '20px Arial', '#FFF', 'center');
    
    howToPlay = 'Space Bar to Jump';
    this.createText(game, howToPlay, 50, 200, '20px Arial', '#FFF', 'center');
    
    howToPlay = 'Left Arrow Key to Move Left and Right Arrow Key to Move Right';
    this.createText(game, howToPlay, 50, 250, '20px Arial', '#FFF', 'center');
    
}