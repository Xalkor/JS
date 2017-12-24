class Particle{
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.prevPos = this.pos;
    this.vel = createVector(1,.06);
    this.acc = createVector(.003,.06);
    this.r = 10;
    this.col = [255,255,255,127];
    this.maxspeed = 4;
  }

  update(){
    this.acc = p5.Vector.random2D();
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.vel.limit(this.maxspeed);
    this.vel.add(this.acc);
    //this.acc.mult(0);

    if(this.pos.x > width){this.pos.x = 0;this.prevPos = this.pos.copy();}
    if(this.pos.y > height){this.pos.y = 0;this.prevPos = this.pos.copy();}
    if(this.pos.x < 0){this.pos.x = width;this.prevPos = this.pos.copy();}
    if(this.pos.y < 0){this.pos.y = height;this.prevPos = this.pos.copy();}
  }

  show(){
    stroke(this.col[0],this.col[1],this.col[2],this.col[3]);
    strokeWeight(this.r);
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
  }

}
