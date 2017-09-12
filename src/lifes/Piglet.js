'use strict';

const Piglet = function(game, x, y, destination, group){
    this.piglet = game.add.sprite(x, y, 'piglet');
    game.physics.arcade.enable(this.piglet);
    this.piglet.collideWorldBounds = true;
    this.piglet.enableBody = true;

    this.piglet.animations.add('left', [0,1], 5, true);
    this.piglet.animations.add('right', [2,3], 5, true);  
    
    this.piglet.body.collideWorldBounds = true;  
    this.piglet.body.gravity.y = 400;

    //sprite move back and forth
    group.add(this.piglet);
};

Piglet.prototype = Object.create(Phaser.Sprite);
Piglet.prototype.constructor = Piglet;

    