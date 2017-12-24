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

  for(let i = 0; i < particles.length; i++){
    let x = particles[i].pos.x;
    let y = particles[i].pos.y;
    let pix = img.get(x, y);
    particles[i].col = pix;

    particles[i].update();
    particles[i].show();
  }
}
