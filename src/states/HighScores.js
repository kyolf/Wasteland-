Game.HighScores = function(game) {
}

Game.HighScores.prototype = {
    create: function(game) {
        //Background Image
        let bg = game.add.sprite(0, 0, 'bg2');
        bg.scale.setTo(0.5, 0.5);
    
        createText(game, 'High Scores', 275, 60, '80px murderFont', '#FFF', 'center');
        
        //Image Button + Piglet Arrows
        createImageButton(game, 'Go Back to Menu', 250, 50, 100, 50);
        
        this.arrow = game.add.sprite(80, 50, 'piglet');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.canMove = true;
        this.arrow.animations.add('right', [2,3], 5, true);
    
        //Display High Scores
        let highScore = 'Name';
        createText(game, highScore, 150, 150, '40px murderFont', '#FFF', 'center');
    
        highScore = 'Score';
        createText(game, highScore, 600, 150, '40px murderFont', '#FFF', 'center');
        
        let yPosText = 200;
        fetchTopScores()
        .then(topScores => {
            topScores.map(topScore => {
                createText(game, topScore.initials, 150, yPosText, '25px murderFont', '#FFF');
                createText(game, topScore.score, 625, yPosText, '25px murderFont', '#FFF');
                yPosText += 35;
            });
        })
        .catch(err => {
            return err;
        });
    },
    //Go Back To Main Menu
    update: function(game) {
        this.arrow.animations.play('right');
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('MainMenu');
        }
    }
};
