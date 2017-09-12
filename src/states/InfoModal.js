Game.InfoModal = function(game) {
};

Game.InfoModal.prototype = {
    create: function(game) {
        //Background
        game.add.sprite(0,0,'bg2');
      
        createText(game, 'Instructions', 250, 75, '80px murderFont', '#FFF', 'center');
    
        //Image Button + Piglet Arrows
        createImageButton(game, 'Go Back to Menu', 250, 50, 100, 50);

        this.arrow = game.add.sprite(80, 50, 'piglet');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.canMove = true;
        this.arrow.animations.add('right', [2,3], 5, true);
    
        //Instruction Text
        let howToPlay = 'Find the exit portal before the time runs out';
        createText(game, howToPlay, 125, 185, '40px murderFont', '#FFF', 'center');
        
        howToPlay = 'Spacebar to jump';
        createText(game, howToPlay, 300, 245, '40px murderFont', '#FFF', 'center');
        
        howToPlay = 'Left arrow key to move left';
        createText(game, howToPlay, 230, 295, '40px murderFont', '#FFF', 'center');

        howToPlay = 'Right arrow key to move right';
        createText(game, howToPlay, 230, 355, '40px murderFont', '#FFF', 'center');

        howToPlay = 'Collect Piglets to gain lives';
        createText(game, howToPlay, 230, 415, '40px murderFont', '#FFF', 'center');

        howToPlay = 'Collect batteries to gain light and time';
        createText(game, howToPlay, 150, 475, '40px murderFont', '#FFF', 'center');
    },
    //Go Back To Main Menu
    update: function(game) {
        this.arrow.animations.play('right');
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('MainMenu');
        }
    }
};

