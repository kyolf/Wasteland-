'use strict';

Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function(){
        // this.preloaderBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        // this.preloaderBar.anchor.setTo(0.5,0.5);
        // this.time.advancedTiming = true;

        // this.load.setPreloaderSprite(this.preloadBar);
        //Load All Assets
        this.load.image('bg2', 'assets/bg2.jpg');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('battery', 'assets/battery.png');
        this.load.spritesheet('dude3', 'assets/dude4_small.png', 71, 100); //width div frames, height 
        this.load.tilemap('map', 'assets/level2.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tiles', 'assets/phase-2.png', 32, 32);
        this.load.spritesheet('rain', 'assets/rain.png', 17, 17);
        this.load.spritesheet('piglet', 'assets/baddie.png', 32, 32);
    },
    create: function(){
        this.state.start('MainMenu');
    }
};

