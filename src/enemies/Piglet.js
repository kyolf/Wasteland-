'use strict';

const Piglet = function(game, x, y, destination, platforms){
    this.platform = platforms;
    this.enemyXPos = x;
    this.enemyYPos = y;
    this.enemyDest = destination;
    this.piglet = null;
};

Piglet.prototype = Object.create(Phaser.Sprite);
Piglet.prototype.constructor = Piglet;
Piglet.prototype.create = function(game) {
    this.piglet = game.add.sprite(this.enemyXPos, this.enemyYPos, 'piglet');
    game.physics.arcade.enable(this.piglet); 
    this.piglet.collideWorldBounds = true;
    this.piglet.enableBody = true;
    this.piglet.animations.add('left', [0,1], 5, true);
    this.piglet.animations.add('right', [2,3], 5, true);  
    this.piglet.body.collideWorldBounds = true;  
    this.piglet.body.gravity.y = 400;
    this.piglet.body.velocity.x = 80;
    this.pigletTween = game.add.tween(this.piglet).to({x: this.piglet.x + 100},2000,'Linear',true,0,-1,true);
    return this.piglet;
};

Piglet.prototype.update = function(game, piglet) {
    // console.log(this.platform, enemyActions(this.piglet, this.platform));
    game.physics.arcade.collide(piglet, this.platform);
    if(piglet.previousPosition.x >= piglet.position.x){
        piglet.animations.play('left');
    }else{
        piglet.animations.play('right');
    }
};

    