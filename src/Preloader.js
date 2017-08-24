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
    this.load.image('diamond', '../diamond.png');
    this.load.image('firstaid', '../firstaid.png');
    this.load.image('platform','../platform.png');
    this.load.image('sky','../sky.png');
    this.load.image('star','../star.png');
    this.load.spritesheet('dude', '../dude.png', 32, 48);
    this.load.spritesheet('baddie','../baddie.png', 32, 48);
}

function createPreloader(){
    this.state.start('MainMenu');
}
