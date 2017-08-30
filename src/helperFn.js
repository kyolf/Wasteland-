//Create Functions
function createButton(game,textOfButton,x,y,w,h,callback){
    let button1 = game.add.button(x,y,'platform',callback,this,2,1,0);
    
    button1.anchor.setTo(0.5,0.5);
    button1.width = w;
    button1.height = h;

    createText(game, textOfButton, x, y, '14px Arial', '#FFF', 'center', 0.5, 0.5);
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

function createPlayer(game, gravityNum = 300, bounceY = 0.2){
    let player = game.add.sprite(32, game.world.height - 350, 'dude3');
    game.physics.arcade.enable(player);

    player.body.bounce.y = bounceY;

    game.camera.follow(player);

    //tried increasing this to 500 and couldn't really jump
    player.body.gravity.y = gravityNum; 

    //this is true or body will rebound back into the world
    //if false, then body will leave the world upon collision
    player.body.collideWorldBounds = true;

    return player;
}

function createBatteries(game, pixelsApart = 100, numBatteries = 5){
    let batteries = game.add.group();
    batteries.enableBody = true;

    for(let i = 0; i < numBatteries; i++) {
        let battery = batteries.create(i * pixelsApart, 0, 'battery');
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

//Update Functions
function playerActions(cursors, player, hitPlatforms){
    player.body.velocity.x = 0;
    //can make movement more complex
    if(cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if(cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else if(cursors.down.isDown) {
        player.body.velocity.y = 350;
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
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
}