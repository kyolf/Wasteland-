'use strict';

const Shadow = function(game, x, y, destination, group){
    this.shadow = game.add.sprite(x, y, 'shadow');
    game.physics.arcade.enable(this.shadow);
    this.shadow.collideWorldBounds = true;
    this.shadow.enableBody = true;

    this.shadow.animations.add('rise', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 3, true);
    
    this.shadow.body.collideWorldBounds = true;  
    this.shadow.body.gravity.y = 0;

    this.shadowTween = game.add.tween(this.shadow);
    group.add(this.shadow);
};

Shadow.prototype = Object.create(Phaser.Sprite);
Shadow.prototype.constructor = Shadow;

    