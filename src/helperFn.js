//Create Functions
function createButton(game,textOfButton,x,y,w,h,callback){
    let button1 = game.add.button(x,y,'grass',callback,this,2,1,0);
    
    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;

    createText(game, textOfButton, x, y, '32px Freckle Face', '#FFF', 'center', 0.5, 0.5);
}

function createImageButton(game, textOfImage,x,y,w,h){
    let button = game.add.image(x,y,'grass');
    
    button.anchor.setTo(0.5,0.5);
    button.width = w;
    button.height = h;
    button.scale.x = 0.5;
    button.scale.y = 0.5;
    button.tweenAnimation = game.add.tween(button.scale).to({x: 0.7, y: 0.7},500,'Linear',true,0,-1,true); 
    
    createText(game, textOfImage, x, y, '32px Freckle Face', '#FFF', 'center', 0.5, 0.5);
    return button;
}

function createText(game, str, x, y, font, fill, align = 'center', anchorX = 0, anchorY = 0){
    let txt = game.add.text(x, y, str, {
        font: font,
        fill: fill,
        align: align
    });
    txt.anchor.setTo(anchorX, anchorY);
    return txt;
}

function createMaps(game, tileMapStr){
    let map = game.add.tilemap(tileMapStr, 32, 32);
    map.addTilesetImage('tiles');
    let layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(0, 1000);
    return layer;
}

function createPlayer(game, gravityNum = 250, bounceY = 0.2){
    let player = game.add.sprite(32, game.world.height - 350, 'dude3');
    game.physics.arcade.enable(player);
    player.body.setSize(20, 90, 25, 10);

    player.body.bounce.y = bounceY;

    game.camera.follow(player);

    //tried increasing this to 500 and couldn't really jump
    player.body.gravity.y = gravityNum; 
    player.body.velocity.y = 300;

    //this is true or body will rebound back into the world
    //if false, then body will leave the world upon collision
    player.body.collideWorldBounds = true;

    return player;
}

function createBatteries(game, pixelsApart = 500, numBatteries = 5){
    let batteries = game.add.group();
    batteries.enableBody = true;

    for(let i = 1; i < numBatteries; i++) {
        let battery = batteries.create(i * pixelsApart, 500, 'battery');
        battery.body.gravity.y = 500;
        battery.body.bounce.y= 0.5 + Math.random() * 0.2;
    }
    return batteries;
}

function createTimer(game, callback, duration = 30000){
    let timer = game.time.create();
    timer.add(duration, callback, this);
    timer.start();
    return timer;
}

function createRain(game, minYSpeed = 300, maxYSpeed = 500, minXSpeed = -5, maxXSpeed = 5,
    minParticleScale = 0.1, maxParticleScale = 0.5, minRotation = 0, maxRotation = 0, angle = 30){
    var emitter = game.add.emitter(game.world.centerX, 0, 400);
    
    emitter.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.

    emitter.makeParticles('rain');

    emitter.minParticleScale = minParticleScale;
    emitter.maxParticleScale = maxParticleScale;

    emitter.setYSpeed(minYSpeed, maxYSpeed);
    emitter.setXSpeed(minXSpeed, maxXSpeed);

    emitter.minRotation = minRotation;
    emitter.maxRotation = maxRotation;

    emitter.start(false, 1600, 5, 0);
}

//Update Functions
function playerActions(cursors, player, hitPlatforms){
    player.body.velocity.x = 0;
    //can make movement more complex
    if(cursors.left.isDown) {
        player.body.velocity.x = -350;
        player.animations.play('left');
    } else if(cursors.right.isDown) {
        player.body.velocity.x = 350;
        player.animations.play('right');
    } else if(cursors.down.isDown) {
        player.body.velocity.y = 550;
        player.animations.play('down');
    } else {
        player.animations.stop();
        player.frame = 6; //sixth frame in spritesheet is standing still
    }

    //can take out the last two conditions in if statement to allow for jumping in midair
    //possible powerup situation
    if(cursors.up.isDown && player.body.blocked.down && hitPlatforms) {
        player.body.velocity.y = -350; //the height of the jump
    }
}

function collectBattery(player, battery) {
    battery.kill();
    this.game.global.score += 10;
    this.totalTime += 5;
    this.scoreText.text = 'Score: ' + this.game.global.score;
}

function updateHitBox(enemy, w, h, frame) {
    console.log(enemy.animations.currentFrame.index);
    console.log(enemy.body);
    enemy.body.setSize(w, h, 0, 0);
    enemy.game.global.tentacleFrame = frame;
};
