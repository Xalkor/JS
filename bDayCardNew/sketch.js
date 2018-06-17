var font;
var vehicles = [];
var flock;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 400);
  background(255);
  flock = new Flock();

  for (var i = 0; i < 25; i++) {
    var b = new Boid(width,height);
    flock.addBoid(b);
  }
  //colorMode(HSB);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints('happy father\'s', 100, 100, 75, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i+=1) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y,color(map(pt.x,100,600,0,255), map(pt.y,100,175,0,255),255));
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }

var points = font.textToPoints('&', 300, 175, 75, {
  sampleFactor: 0.25
});

for (var i = 0; i < points.length; i+=1) {
  var pt = points[i];
  var vehicle = new Vehicle(pt.x, pt.y,color(map(pt.x,300,350,0,255), map(pt.y,175,250,0,255),255));
  vehicles.push(vehicle);
  // stroke(255);
  // strokeWeight(8);
  // point(pt.x, pt.y);
}

var points = font.textToPoints('birth day!', 180, 250, 75, {
  sampleFactor: 0.25
});

for (var i = 0; i < points.length; i+=1) {
  var pt = points[i];
  var vehicle = new Vehicle(pt.x, pt.y,color(map(pt.x,180,400,0,255),map(pt.y,250,315,0,255),255));
  vehicles.push(vehicle);
  // stroke(255);
  // strokeWeight(8);
  // point(pt.x, pt.y);
}

}

function draw() {
  background(255);
  if(frameCount>50){
    flock.run();
  }
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors(flock.boids);
    v.update();
    v.show();
  }

}
