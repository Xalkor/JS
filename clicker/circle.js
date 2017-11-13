function circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = 0;
}

circle.prototype.show = function() {
  noStroke();
  fill(this.color);
  ellipse(this.x,this.y,this.r*2);
}
circle.prototype.isMouseOver = function() {
  return dist(mouseX, mouseY, this.x, this.y) <= this.r;
}
