'use strict';

Game.Preloader = function(game){
    this.preloadBar = null;
    this.loadingText = '';
};

Game.Preloader.prototype = {
    preload: function(){
        //////CENTERS PHASER GAME WINDOW/////////
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        
        //Background loading bar
        this.preloadBG = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingBG');
        this.preloadBG.anchor.setTo(0.5,0.5);
        
        //loading bar
        this.preloaderBar = this.add.sprite(this.world.centerX -250, this.world.centerY, 'loading');
        this.preloaderBar.anchor.setTo(0,0.5);
        
        this.time.advancedTiming = true;
        
        //Does the Loading
        this.load.setPreloadSprite(this.preloaderBar);
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onLoadComplete.add(this.startMainMenu, this);
        
        //Load All Assets
        this.load.image('bg2', 'assets/bg2.jpg');
        this.load.image('lvl1bg', 'assets/lvl1bg.jpg');
        this.load.image('lvl2bg', 'assets/lvl2bg.jpg');
        this.load.image('lvl3bg', 'assets/lvl3bg.jpg');
        this.load.image('victory', 'assets/victory.jpg');
        this.load.image('gameover', 'assets/gameover.jpg');
        this.load.image('grim', 'assets/grim_reaper.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('grass', 'assets/Grass_Platform.png');
        this.load.image('life', 'assets/diamond.png');
        this.load.image('battery', 'assets/battery.png');
        this.load.spritesheet('dude3', 'assets/dude4_small.png', 71, 100); //width div frames, height 
        this.load.tilemap('map1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/phase-2.png', 32, 32);
        this.load.image('phase-2', 'assets/phase-2.png', 32, 32);
        this.load.spritesheet('rain', 'assets/rain.png', 17, 17);
        this.load.spritesheet('piglet', 'assets/baddie.png', 32, 32);
        this.load.spritesheet('shadow', 'assets/shadow.png', 80, 70);
        this.load.spritesheet('tentacle', 'assets/tentacle.png', 25, 90);
        this.load.spritesheet('bat', 'assets/bat.png', 32, 32);
        this.load.image('tree', 'assets/tree.png', 70, 32);
        
        //Music
        this.load.audio('menu_music', 'music/96-Blocks.ogg');
        this.load.audio('level1_music', 'music/Moonlit-Streets.ogg');
        this.load.audio('losing_light', 'music/Theyre-Closing-In.ogg');
        this.load.audio('heart_fast', 'music/heartFast.ogg');
        this.load.audio('heart_slow', 'music/heartSlow.ogg');
    },
    loadStart: function(){
        this.loadingText = createText(this, 'Loading', this.world.centerX, this.world.centerY - 100, 
        '80px murderFont', '#FFF', 'center', 0.5, 0.5);
    },
    startMainMenu: function(){
        this.state.start('MainMenu');
    }
};

