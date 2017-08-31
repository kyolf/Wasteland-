Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {
    init:function(game){
        this.buttonArr = [];
        this.buttonIndex = 0;
        this.arrow = null;
    },
    create:function(game) {
        //Background
        game.add.sprite(0,0,'bg2');

        //Title
        createText(game, 'Wasteland', 600, 175, '100px Freckle Face', '#FFF', 'center');

        console.log(game.world.centerX, game.world.centerY);
        
        this.buttonArr.push(createImageButton(game, 'Play Game', 800, 350, 200, 50));
        let button = createImageButton(game, 'InfoModal', 800, 450, 200, 50);
        button.tweenAnimation.pause();
        this.buttonArr.push(button);

        button = createImageButton(game, 'High Scores', 800, 550, 200, 50);
        button.tweenAnimation.pause();
        this.buttonArr.push(button);

        this.arrow = game.add.sprite(650, 350, 'piglet');
        this.arrow.anchor.setTo(0.5, 0.5);
        this.arrow.canMove = true;

        createRain(game, 300, 500, -5, 5, 0.1, 0.5, 0, 0, 30);
        //Buttons
        // createButton(game, 'Play Game', 800, 350, 200, 50,
        //             () => {
        //                 this.state.start('Level1');
        //             });
        
        // createButton(game, 'About', 800, 450, 200, 50,
        //             () => {
        //                 this.state.start('InfoModal');
        //             });
        // createButton(game, 'High Scores', 800, 550, 200, 50,
        //             () => {
        //                 this.state.start('HighScores');
        //             });    
    },
    update: function(game) {
        this.buttonArr[this.buttonIndex].scale.x = 0.5;
        this.buttonArr[this.buttonIndex].scale.y = 0.5;
        if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.buttonIndex < 2 && this.arrow.canMove) {
            this.buttonArr[this.buttonIndex].tweenAnimation.pause();
            this.buttonIndex++;
            this.arrow.position.y += 100;

            this.buttonArr[this.buttonIndex].tweenAnimation = game.add.tween(this.buttonArr[this.buttonIndex].scale)
                                                                .to({x: 0.7, y: 0.7},500,'Linear',true,0,-1,true);
            
            this.tempStopArrow(game);
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.buttonIndex > 0 && this.arrow.canMove) {
            this.buttonArr[this.buttonIndex].tweenAnimation.pause();
            this.buttonIndex--;
            this.arrow.position.y -= 100;

            this.buttonArr[this.buttonIndex].tweenAnimation = game.add.tween(this.buttonArr[this.buttonIndex].scale)
                                                                .to({x: 0.7, y: 0.7},500,'Linear',true,0,-1,true);
            this.tempStopArrow(game);
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            if(this.buttonIndex === 0){
                game.state.start('Level1');
            }else if(this.buttonIndex === 1){
                game.state.start('InfoModal');
            }else{
                game.state.start('HighScores');
            }
        }
    },
    tempStopArrow: function(game) {
        this.arrow.canMove = false;
        createTimer(game, ()=>{
            this.arrow.canMove = true;
        }, 200);
    }
};
