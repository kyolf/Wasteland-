window.onload = function() {
    let game = new Phaser.Game(1600, 800, Phaser.AUTO, '');
    game.global = {
      score: 0,
      initials: ''
    };
    Phaser.Device.whenReady(function() {
        game.add.plugin(PhaserInput.Plugin);
    });
    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('InfoModal', Game.InfoModal);
    game.state.add('HighScores', Game.HighScores);
    game.state.add('Level1', Game.Level1);
    game.state.add('GameOver', Game.GameOver);
    game.state.start('Boot');
};
