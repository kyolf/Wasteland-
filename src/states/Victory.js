Game.Victory = function(game){
    
};

Game.Victory.prototype = {
    create: function(game) {
        game.global.shadowTexture.destroy();
        game.global.menuMusic = true;
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        
        fetchTopScores()
        .then(highScores => {
            if(highScores.length >= 10) {
                if(highScores[highScores.length - 1].score < this.game.global.score) {
                    let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                    postTopScores(this.game.global.score, this.game.global.initials)
                    .then(() => game.state.start('HighScores'));
                }
            } 
            else {
                let name = prompt("Congrats! Your score is in the top 10! Please enter your initials.", "Anonymous");if(name) {this.game.global.initials = name;}
                postTopScores(this.game.global.score, this.game.global.initials)
                .then(() => game.state.start('HighScores'));
            }
        });

        this.bg = game.add.sprite(0,0,'victory');
        this.bg.scale.setTo(0.8,1);
        createText(game, 'Congrats, You Escaped', 400, 275, '100px murderFont', '#FFF', 'center', 0.5, 0.5);
    }
};
