'use strict';

const Bat = function(game, x, y, destination, group){
    this.bat = game.add.sprite(x, y, 'bat');
    game.physics.arcade.enable(this.bat);
    this.bat.collideWorldBounds = true;
    this.bat.enableBody = true;

    this.bat.animations.add('left', [13,14,15], 5, true); 
    this.bat.animations.add('right', [5,6,7], 5, true);
     
    this.bat.body.collideWorldBounds = true;  

    //sprite move back and forth
    this.batTween = game.add.tween(this.bat).to({x: this.bat.x + destination},9000,'Linear',true,0,-1,true);
    this.batTween = game.add.tween(this.bat);
    group.add(this.bat);
};

Bat.prototype = Object.create(Phaser.Sprite);
Bat.prototype.constructor = Bat;

    