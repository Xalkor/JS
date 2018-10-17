let isStroke = true;
let isFill = true;

//converts 3 ints into a color string
//or 1 int into a greyscale color string
function color(r, g, b) {
  if (r && g && b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (r) {
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
