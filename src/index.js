window.onload = function() {

	// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

	// function preload () {
	// 	game.load.image('logo', '../phaser.png');
	// }

	// function create () {
	// 	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
	// 	logo.anchor.setTo(0.5, 0.5);
	// }
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('Boot', Game.Boot);
    game.state.add('Preloader', Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('InfoModal', Game.InfoModal);
    game.state.add('HighScores', Game.HighScores);
    game.state.add('Level1', Game.Level1);
    game.state.add('GameOver', Game.GameOver);
    game.state.start('Boot');
};
