let canvas;

let tClef,bClef;

let cols,rows,xscl,yscl;

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  tClef = loadImage("trebClef.gif");
  bClef = loadImage("bassClef.png");

  cols = 20;
  rows = 45;

  xscl = floor(width/cols);
  yscl = floor(height/rows);

}

function draw(){

  image(tClef,width/2,height/2);

  let c = cell();
  background(255);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      strokeWeight(1);
      noFill();
      if(j > 18 && j <= 27 && j%2!=0){
        fill(0,10);
        stroke(0);
        line(0,j*yscl + (yscl/2),width,j*yscl + (yscl/2));
      }else if(j%2!=0){
        line(c[0]*xscl,j*yscl + (yscl/2),c[0]*xscl+xscl,j*yscl + (yscl/2));
      }
      if(i == c[0] && j == c[1]){
        ellipse(i * xscl + (xscl/2), j * yscl + (yscl/2),xscl + (xscl/2), yscl + (yscl/2));
      }
    }
  }

}

function trebClef(){

}

function bassClef(){

}

function cell(){
  return([floor(mouseX/xscl), floor(mouseY/yscl)]);
}

window.onresize = function() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.size(w,h);
  width = w;
  height = h;

  xscl = floor(width/cols);
  yscl = floor(height/rows);
};
