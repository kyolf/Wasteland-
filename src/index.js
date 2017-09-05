window.onload = function() {
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.global = {
      score: 0,
      time: 30,
      lifes: 3,
      lightRadius: 300,
      initials: '',
      tentacleFrame: 'start',
      shadowFrame: 'start'
    };

    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('InfoModal', Game.InfoModal);
    game.state.add('HighScores', Game.HighScores);
    game.state.add('Level1', Game.Level1);
    game.state.add('GameOver', Game.GameOver);
    game.state.add('Victory', Game.Victory);
    game.state.start('Boot');
};
