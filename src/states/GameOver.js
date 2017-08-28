Game.GameOver = function(game){

};

Game.GameOver.prototype = {
    create: function(game) {
      console.log('player score', this.game.global.score);
    fetchTopScores()
    .then(highScores => {
      if (highScores.length >= 10) {
        if (highScores[highScores.length - 1].score < this.game.global.score) {
          console.log('player score', this.game.global.score);
          postTopScores(this.game.global.score, this.game.global.initials).then(scores => {console.log(scores)});
        } else{
          //only show the highscores
        }
      } else {
        //create input field
      }
    })
        game.add.sprite(0,0,'bg2');
        createText(game, 'High Scores', 800/3, 50, '40px Arial', '#FFF');
        createButton(game, 'Go Back to Menu', 125, 75,
        200, 50, () => {
            this.state.start('MainMenu');
        });
    }
};
