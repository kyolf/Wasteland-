Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {create:createMenu,
                          update:updateMenu,
                          createButton:createButton,
                          createText:createText};

function createMenu(game){
    game.add.sprite(0,0,'sky');

    this.createText(game, 'WASTELAND', 800/3, 100, '40px Arial', '#FFF', 'center');

    // title.anchor.setTo(0.25, 0.5);
    this.createButton(game, 'Play Game', game.world.centerX, game.world.centerY - 50,
                      200, 50, function(){
                          console.log('level1');
                          this.state.start('Level1');
                      });
    
    this.createButton(game, 'About', game.world.centerX, game.world.centerY + 50,
                      200, 50, function(){
                          console.log('about');
                          this.state.start('InfoModal');
                      });
    this.createButton(game, 'High Scores', game.world.centerX, game.world.centerY + 150,
                      200, 50, function(){
                          console.log('High Scores');
                          this.state.start('HighScores');
                      });    
}

function updateMenu(){

}

function createButton(game,textOfButton,x,y,w,h,callback){
  let button1 = game.add.button(x,y,'platform',callback,this,2,1,0);
  
  button1.anchor.setTo(0.5,0.5);
  button1.width = w;
  button1.height = h;

  let txt = createText(game, textOfButton, x, y, '14px Arial', '#FFF', 'center');
  txt.anchor.setTo(0.5,0.5);
}

function createText(game, str, x, y, font, fill, align){
  let txt = game.add.text(x, y, str, {
    font: font,
    fill: fill,
    align: align
  });
  return txt;
}