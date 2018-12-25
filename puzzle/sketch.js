let n = 6;

let colors = [];

let sel;
let th, r, pth, pr;
let total = 0;
let test;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function setup() {
  n = Number(decodeURI(getUrlVars()['n']));
  createCanvas(min(windowWidth, windowHeight)-25, min(windowWidth, windowHeight)-25);
  colorMode(HSB);
  for (let i = 0; i < n; i++) {
    colors[i] = [];
    for (let j = 0; j < n; j++) {
      colors[i][j] = color(j / n * 360, 100, 15 + ((i + 1) / (n + 1)) * 75);
      //colors[i][j] = color(i/n*255,0,255-((i/n*255)),55+(j/n)*200);
    }
  }
}

function scramble(x) {
  console.log('test');
  for (let i = 0; i < x; i++) {
    if (random(1) < 0.5) {
      cycle(floor(random(n)), random(1) < 0.5);
    } else {
      slide(floor(random(n)), random(1) < 0.5);
    }
  }
}

function cycle(r, clockwise) {
  if (clockwise) {
    let tmp = colors[r][colors[r].length - 1];
    for (let i = colors[r].length - 1; i > 0; i--) {
      colors[r][i] = colors[r][i - 1];
    }
    colors[r][0] = tmp;
  } else {
    let tmp = colors[r][0];
    for (let i = 0; i <= colors[r].length - 1; i++) {
      colors[r][i] = colors[r][i + 1];
    }
    colors[r][colors[r].length - 1] = tmp;
  }
}

function slide(r, forward) {
  if (!forward) {
    r = (r + (n / 2)) % n;
  }
  let tmp1 = colors[colors.length - 1][r];
  for (let i = colors.length - 1; i > 0; i--) {
    colors[i][r] = colors[i - 1][r];
  }
  let t = (r + (n / 2)) % n;
  let tmp2 = colors[0][t];
  for (let i = 0; i <= colors.length - 2; i++) {
    colors[i][t] = colors[i + 1][t];
  }

  colors[0][r] = tmp2;
  colors[colors.length - 1][t] = tmp1;
}

function mouseDragged() {
  pth = th;
  pr = r;
  th = round((sel.heading() + PI) / TWO_PI * n) % n;
  r = floor((sel.mag() / (width / 2)) * n);
  if (r < pr) {
    slide(th, false);
  } else if (r > pr) {
    slide(th, true);
  }
}

function mouseMoved() {
  pth = th;
  pr = r;
  th = round((sel.heading() + PI) / TWO_PI * n) % n;
  r = floor((sel.mag() / (width / 2)) * n);
}

function mouseWheel(event) {
  if (r <= n) {
    total += event.delta;
    if (total > 40) {
      total = 0;
      cycle(r, false);
    } else if (total < -40) {
      total = 0;
      cycle(r, true);
    }
  }
}

function draw() {
  sel = p5.Vector.sub(createVector(width / 2, height / 2), createVector(mouseX, mouseY));
  //console.log(sel.heading()+PI);

  background(220);
  translate(width / 2, height / 2);
  noFill();
  for (let i = n; i >= 1; i--) {
    for (let j = 0; j < n; j++) {
      let x1 = i * width / (2 * n) * cos(j / n * TWO_PI);
      let y1 = i * height / (2 * n) * sin(j / n * TWO_PI);
      fill(colors[i - 1][j]);
      push();
      translate(x1, y1);
      rotate(j / n * TWO_PI);
      translate(-i * width / (2 * n), 0);
      if (round((sel.heading() + PI) / TWO_PI * n) % n == j && floor((sel.mag() / (width / 2)) * n) == i - 1) {
        strokeWeight(4);
      } else {
        strokeWeight(1);
      }
      arc(0, 0, i * width / (2 * n) * 2, i * height / (2 * n) * 2, -(TWO_PI / n) / 2, (TWO_PI / n) / 2, PIE);
      pop();
    }
  }
}

