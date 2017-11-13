function floatText(display,x,y,i){
  this.x = x;
  this.y = y
  this.display = display;
  this.alpha = 255;
  this.i = i;
  this.size = 32;
}

floatText.prototype.update = function(){
  textSize(this.size);
  fill(255,this.alpha);
  text(this.display, this.x, this.y);
  this.y -= 3;
  this.alpha -= 7;
  this.size -=.4
}
