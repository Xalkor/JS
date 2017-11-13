function circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = createVector(0,255,255);
}

circle.prototype.show = function() {
  noStroke();
  colorMode(HSB);
  fill(this.color.x,this.color.y,this.color.z);
  ellipse(this.x,this.y,this.r*2);
}
circle.prototype.isMouseOver = function() {
  return dist(mouseX, mouseY, this.x, this.y) <= this.r;
}
