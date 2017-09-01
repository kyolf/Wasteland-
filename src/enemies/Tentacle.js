'use strict';

const Tentacle = function(game, x, y, destination, platforms, group){
    this.platform = platforms;
    this.tentacle = game.add.sprite(x, y, 'tentacle');
    game.physics.arcade.enable(this.tentacle);
    this.tentacle.collideWorldBounds = true;
    this.tentacle.enableBody = true;


     //two seconds
    this.tentacle.animations.add('start', [0,1,2,3,4,5], 3, true);
    //one second
    this.tentacle.animations.add('rise', [6,7,8,9], 4, true); 
    //four seconds
    this.tentacle.animations.add('final', [10,11,12,13,14,15,16,17,18,19,19,18,17,16,15,14,13,12,11,10,9], 5, true);
    //one second
    this.tentacle.animations.add('fall', [9,8,7,6], 4, true);
    // //one seconds
    this.tentacle.animations.add('end', [5,4,3,2,1,0], 5, true);

    this.tentacle.body.collideWorldBounds = true;  
    // this.tentacle.body.gravity.y = 400;

    //sprite move back and forth
    //this.tentacleTween = game.add.tween(this.tentacle).to({x: this.tentacle.x + destination},2000,'Linear',true,0,-1,true);
    this.tentacleTween = game.add.tween(this.tentacle);
    group.add(this.tentacle);
};

Tentacle.prototype = Object.create(Phaser.Sprite);
Tentacle.prototype.constructor = Tentacle;

    