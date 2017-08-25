'use strict';

const Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
    init: function() {
        //number of players
        this.input.maxPointers = 1;
        //prevent users to pause the game by clicking away
        this.stage.disableVisibilityChange = true;
    },
    preload: function() {
        // this.load.image('preloaderBar', 'assets/preloader.png');
    },
    create: function(){
        this.state.start('Preloader');
    }
};
