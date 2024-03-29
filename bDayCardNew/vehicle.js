function Vehicle(x, y, c) {
  this.target = createVector(x, y);
  this.pos = createVector(x + random(-100,100), y + random(-100,100));
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 3;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.c = c;
}

Vehicle.prototype.behaviors = function(targets) {
  var arrive = this.arrive(this.target);
//  var mouse = createVector(mouseX, mouseY);

  arrive.mult(1);

  this.applyForce(arrive);

for(var i =0; i < targets.length; i++){
    var flee = this.flee(targets[i].position);
    flee.mult(1.01);
    this.applyForce(flee);
  }
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  stroke(this.c);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
