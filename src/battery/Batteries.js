'use strict';

const Batteries = function(game, x, y, group){
    this.batteries = game.add.sprite(x, y, 'battery');
    game.physics.arcade.enable(this.batteries);
    this.batteries.collideWorldBounds = true;
    this.batteries.enableBody = true;


    
    this.batteries.body.collideWorldBounds = true;  
    this.batteries.body.gravity.y = 400;

  
    group.add(this.batteries);
};

Batteries.prototype = Object.create(Phaser.Sprite);
Batteries.prototype.constructor = Batteries;

    