var rows;
var cols;
var scl = 25;
var z = 0;
var size = 25;
var yoff = 0;
var coloff = 0;
var hue;
var isHidden = false;

function setup() {
  rSlider = createSlider(15, 100, 25);
  rSlider.position(20, 20);
  //createCanvas(800,800);
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  colorMode(HSB);
}

function draw() {
  size = rSlider.value();
  //stroke(255);
  noStroke();
  for(var x = 0; x < cols; x++){
    for(var y = 0; y < rows; y++){
    //  fill(random(0,255));
    hue = ((noise(x/size,(y+yoff)/size,z/size)*360)+coloff);
hue -= (floor(hue/360)*360)
    fill(hue,255,255);
  //fill(coloff,255,255);
    //console.log(noise(0,255));
      rect(x * scl, y * scl, scl, scl);
    }
  }
  z+=.3;
  yoff-=.3;
  coloff ++;
}

  function windowRe25d() {
  re25Canvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
}

function keyPressed(){
  if (keyCode == 70){
  fullscreen(true);
  createCanvas(displayWidth, displayHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
}
if (keyCode == 72){
  if(!isHidden){
    isHidden = true;
    rSlider.hide();
  }else{
    isHidden = false;
    rSlider.show();
  }
}
}
