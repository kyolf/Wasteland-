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
}