'use strict';

const Tentacle = function(game, x, y, destination, group){
    this.tentacle = game.add.sprite(x, y, 'tentacle');
    game.physics.arcade.enable(this.tentacle);
    this.tentacle.collideWorldBounds = true;
    this.tentacle.enableBody = true;

    this.tentacle.animations.add('rise', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 5, true);

    this.tentacle.body.collideWorldBounds = true;  

    this.tentacleTween = game.add.tween(this.tentacle);
    group.add(this.tentacle);
};

Tentacle.prototype = Object.create(Phaser.Sprite);
Tentacle.prototype.constructor = Tentacle;

    