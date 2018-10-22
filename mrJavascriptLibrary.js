let isStroke = true;
let isFill = true;
let width = 200, height = 200;
let timer;
let ctx;

//converts 3 ints into a color string
//or 1 int into a greyscale color string
function color(r, g, b) {
  if (arguments.length === 3) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (arguments.length === 1) {
    return 'rgb(' + r + ',' + r + ',' + r + ')';
  } else {
    return 'rgb(255,255,255)';
  }
}

//draws a rectangle with a given color that covers the screen
function background(r, g, b) {
  ctx.fillStyle = color(r, g, b);
  ctx.fillRect(0, 0, width, height);
}

//sets the fill color
function fill(r, g, b) {
  ctx.fillStyle = color(r, g, b);
  isFill = true;
}

//sets the stroke color
function stroke(r, g, b) {
  ctx.strokeStyle = color(r, g, b);
  isStroke = true;
}

//turns off fill
function noFill() {
  isFill = false;
}

//turns off stroke
function noStroke() {
  isStroke = false;
}

//draws a rectangle at a given x and y, with a given width and height
function rect(x, y, width, height) {
  if (isStroke) {
    ctx.strokeRect(x, y, width, height);
  }
  if (isFill) {
    ctx.fillRect(x, y, width, height);
  }
}

function mod(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

class Vector{
  constructor(x,y){
    if(x && y){
     this.x = x;
     this.y = y;
    }else{
      this.x = 0;
      this.y = 0;
    }
  }
}
