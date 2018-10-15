let width, height;
let timer;

let maxL = 75;
let minL = 13;

let limit = 75;
let dl = -1;

function init() {
  resized();
  //draw(ctx, 500, 475, 75, 75);
}

function draw(ctx, x, y, r) {
  ctx.fillStyle = color(255);
  ctx.fillRect(0, 0, width, height);
  circ(ctx, x, y, r);
  limit -= dl;
  if (limit < minL || limit > maxL) {
    dl *= -1;
  }
}

function circ(ctx, x, y, r) {
  ctx.strokeStyle = color((x / width) * 255, 0, (y / height) * 255);
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  if (r > limit) {
    let newR = r * .75;
    circ(ctx, x + newR + r, y, newR);
    circ(ctx, x, y + newR + r, newR);
    circ(ctx, x - newR - r, y, newR);
    circ(ctx, x, y - newR - r, newR);
  }
}

function resized(event) {
  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  width = canvas.width;
  height = canvas.height;

  maxL = (height < width ? height : width) / 12.48;
  minL = (height < width ? height : width) / 72;

  clearTimeout(timer);
  timer = setInterval(draw, 25, ctx, width / 2, height / 2, maxL);
}

function color(r, g, b) {
  if (arguments.length == 3) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (arguments.length == 1) {
    return 'rgb(' + r + ',' + r + ',' + r + ')';
  } else {
    return 'rgb(255,255,255)';
  }
}