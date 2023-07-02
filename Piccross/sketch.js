let resetButton = document.getElementById('resetButton');
resetButton.onclick = () => {
  board = Array.from({ length: n }, () => Array(n).fill(0));
};

let fillColor;
let unfillColor;
let strokeColor;

let boardKey;
let boardData, board, n, scl;
let maxExt;

let selR, selC, selOn, xMode = false;

function setup() {

  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // if any scroll is attempted, set this to the previous value
  window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
  };
  
  boardKey = getURLParams().name;
  print(boardKey);
  
  fillColor = color(6,6,25);
  unfillColor = color(240,255,240);
  unfillColor_2 = color(141, 154, 141);
  strokeColor = color(128);
  
  let w = 0.8*min(windowWidth, windowHeight);
  createCanvas(w, w);
  
  boardData = boards[boardKey];
  n = boardData.rows.length;
  maxExt = boardData.maxExt;
  scl = width / (n+maxExt);
  
  textSize(scl/2);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  strokeWeight(scl/10);
  
  board = Array.from({ length: n }, () => Array(n).fill(0));
}

function keyPressed() {
  xMode = !xMode;
}

function mouseGuard() {
  let bad = false;
  
  if(mouseX > width) bad = true;
  if(mouseY > height) bad = true;
  if(mouseX < maxExt*scl) bad = true;
  if(mouseY < maxExt*scl) bad = true;
  
  if(bad) {
    
    if(mouseX < maxExt*scl && mouseY < maxExt*scl) {
       xMode = !xMode;
    }
    
    return false;
  }
  
  return true;
}

function normMouse(pos) {
  return floor(n * (pos-maxExt*scl) / (width-maxExt*scl));
}

function mousePressed() {
  print('mousePressed');
  if(!mouseGuard()) return;
  
  let c = normMouse(mouseX);
  let r = normMouse(mouseY);
  
  if(board[r][c] == 0) selOn = (xMode ? 1 : 2);
  else if(board[r][c] == (xMode ? 1 : 2)) selOn = 0;
  
  if(board[r][c] == 0 || board[r][c] == (xMode ? 1 : 2)) board[r][c] = selOn;
  selOn = board[r][c];
  selR = r; selC = c;
}

function mouseDragged() {
  print('mouseDragged');
  if(!mouseGuard()) return;
  
  let c = normMouse(mouseX);
  let r = normMouse(mouseY);
  
  if(c != selC || r != selR) {
    if(board[r][c] == 0 || board[r][c] == (xMode ? 1 : 2)) board[r][c] = selOn;
  }
  
  selR = r; selC = c;
}

function doneCol(i) {
  return JSON.stringify(genColRuns(board, i, [0, 1])) ==
         JSON.stringify(boardData.cols[i]);
}

function doneRow(i) {
  return JSON.stringify(genRowRuns(board, i, [0, 1])) ==
         JSON.stringify(boardData.rows[i]);
}

function draw() {
  background(220);
  
  if(xMode) {
    stroke(strokeColor);
    fill(unfillColor);
    rect(0, 0, maxExt*scl, maxExt*scl);
    stroke(fillColor);
    drawX(0, 0, maxExt*scl);
    strokeWeight(scl/10);
  } else {
    stroke(strokeColor);
    fill(fillColor);
    rect(0, 0, maxExt*scl, maxExt*scl);
  }
  
  let done = 0;
  for(let i = 0; i < n; i++) {
    stroke(strokeColor);

    if(doneCol(i)) {
      fill(unfillColor_2);
      done++;
    } else fill(unfillColor);
    rect((i+maxExt) * scl, 0, scl, maxExt*scl);
    
    if(doneRow(i)) {
      fill(unfillColor_2);
      done++;
    } else fill(unfillColor);
    rect(0, (i+maxExt) * scl, maxExt*scl, scl);
    
    let len = boardData.cols[i].length;
    for(let j = 0; j < len; j++) {
      let num = boardData.cols[i][len-j-1];
      fill(fillColor);
      noStroke();
      text(num, (i+maxExt+0.5) * scl, (maxExt-j-0.5) * scl);
    }
    
    len = boardData.rows[i].length;
    for(let j = 0; j < len; j++) {
      let num = boardData.rows[i][len-j-1];
      fill(fillColor);
      noStroke();
      text(num, (maxExt-j-0.5) * scl, (i+maxExt+0.5) * scl);
    }
  }
  
  // done = 2*n;
  if(done >= n*2) {
    
    for(let r = 0; r < n; r++) {
      for(let c = 0; c < n; c++) {
        fill( boardData.doneColors[boardData.data[r][c]] );
        noStroke();
        // stroke(strokeColor);
        // fill(unfillColor);
        // if(boardData.data[r][c] != 0) fill(fillColor);
        rect( (maxExt+c)*scl, (maxExt+r)*scl, scl, scl );
      }
    }
    
    return;
  }
  
  for(let r = 0; r < n; r++) {
    for(let c = 0; c < n; c++) {
      stroke(strokeColor);
      if(board[r][c] == 2) {
        stroke(strokeColor);
        fill(fillColor);
        rect( (maxExt+c)*scl, (maxExt+r)*scl, scl, scl );
      } else if(board[r][c] == 1) {
        stroke(strokeColor);
        fill(unfillColor);
        rect( (maxExt+c)*scl, (maxExt+r)*scl, scl, scl );
        stroke(fillColor);
        drawX((maxExt+c)*scl, (maxExt+r)*scl, scl);
      } else {  
        fill(unfillColor);
        stroke(strokeColor);
        rect( (maxExt+c)*scl, (maxExt+r)*scl, scl, scl );
      }
      strokeWeight(scl/10);
    }
  }
}

function drawX(x, y, scl) {
  let myscl = 0.5*scl;
  x += scl/2;
  y += scl/2;
  strokeWeight(scl/5);
  line(x - myscl/2, y - myscl/2, x + myscl/2, y + myscl/2);
  line(x - myscl/2, y + myscl/2, x + myscl/2, y - myscl/2);
}
