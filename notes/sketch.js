let canvas;

let tClef;

let cols,rows,xscl,yscl;

let box,note;

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);

  tClef = true;

  cols = 35;
  rows = 45;

  xscl = floor(width/cols);
  yscl = floor(height/rows);

  box = createCheckbox('Bass Clef?', false);
  box.changed(updateClef);
  box.position(5,10);

  note = createElement();
  note.position(5,30);
  note.html("A");

}

function draw(){

  let c = cell();
  background(255);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      strokeWeight(1);
      noFill();
      if(j > 18 && j <= 27 && j%2!=0){
        fill(0,10);
        stroke(0);
        line(0,j*yscl + (yscl/2),width,j*yscl + (yscl/2));    //draw a line of the staff
      }else if(j > 18 && j <= c[1] && j%2!=0){
        line(c[0]*xscl-xscl/2,j*yscl + (yscl/2),c[0]*xscl+xscl+xscl/2,j*yscl + (yscl/2));   //draw a small line off the staff
      }else if(j >= c[1] && j <= 27 && j%2!=0){
        line(c[0]*xscl-xscl/2,j*yscl + (yscl/2),c[0]*xscl+xscl+xscl/2,j*yscl + (yscl/2));   //draw a small line off the staff
      }
      if(i == c[0] && j == c[1]){
        ellipse(i * xscl + (xscl/2), j * yscl + (yscl/2),xscl + (xscl/2), yscl + (yscl/2));   //draw note
      }
    }
  }

}

function mousePressed(){
  let c = cell();

  let num = (rows - c[1]) % 7;

  if(box.checked()){
    num = (rows - c[1] + 2) % 7;
  }

  let n;

  switch(num){
    case 0:
    n = 'A';
    break;
    case 1:
    n = 'B';
    break;
    case 2:
    n = 'C';
    break;
    case 3:
    n = 'D';
    break;
    case 4:
    n = 'E';
    break;
    case 5:
    n = 'F';
    break;
    case 6:
    n = 'G';
    break;
  }

  note.html(n);
}

function updateClef(){
  tClef = !tClef;
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
