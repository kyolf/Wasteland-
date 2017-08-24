'use strict';

const Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {init:initBoot, preload:preloadBoot, create:createBoot};

function initBoot(){
    //number of players
    this.input.maxPointers = 1;
    //prevent users to pause the game by clicking away
    this.stage.disableVisibilityChange = true;
}

function preloadBoot(){
    // this.load.image('preloaderBar', 'assets/preloader.png');
}

function createBoot(){
    this.state.start('Preloader');
}