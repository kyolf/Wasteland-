'use strict';

Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {preload:preloader, create:createPreloader};

function preloader(){
    // this.preloaderBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

    // this.preloaderBar.anchor.setTo(0.5,0.5);
    // this.time.advancedTiming = true;

    // this.load.setPreloaderSprite(this.preloadBar);

    //Load All Assets
    this.load.image('sky', 'bg2.jpg');
    this.load.image('platform', 'platform.png');
    this.load.image('star', 'battery.png');
    this.load.spritesheet('dude3', 'dude4.png', 141.2, 200, 13); //width div frames, height 
    this.load.tilemap('map', 'level2.csv', null, Phaser.Tilemap.CSV);
    this.load.image('tiles', 'phase-2.png', 32, 32);
    this.load.spritesheet('rain', 'rain.png', 17, 17);
    
}

function createPreloader(){
    this.state.start('MainMenu');
}
