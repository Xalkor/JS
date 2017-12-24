let img;
let particles = [];

function preload() {
img = loadImage('kitten-1582384_960_720.jpg');
}

function setup() {
    createCanvas(623,720);
  for(let i = 0; i < 10; i++){
    let p = new Particle();
    particles.push(p);
  }
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}

function draw() {
  let x = particles[0].pos.x;
  let y = particles[0].pos.y;
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}
