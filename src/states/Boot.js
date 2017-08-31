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
        this.load.image('loadingBG', 'assets/loading_bar.png');
        this.load.image('loading', 'assets/loading_bar_green.png');
    },
    create: function(){
        this.state.start('Preloader');
    }
};
