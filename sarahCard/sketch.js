// 65-90
//97-122

let r,
  c,
  scl = 40;

let msg = 'Happy Birthday Sarah!'

let chars = [];

let off;

let PURPLE;

function setup() {
  createCanvas(windowWidth, windowHeight);

  PURPLE = color(50,0,100);
  
  r = floor(width/scl);
  c = floor(height/scl);
  
  let n = r * c;

  for (let i = 0; i < n; i++) {
      chars.push({
        letter: randomChar(),
        col: color(150)
      });
  }
  //console.log('len: ' + n);
  off = floor(random(n-msg.length));
  for (let i = 0; i < msg.length; i++) {
    chars[i + off] = {
      letter: msg[i],
      col: PURPLE
    };
  }
  
  frameRate(15);
}

function randomChar() {
  if (random(1) < 0.5) {
    return String.fromCharCode(floor(random(65, 91)));
  } else {
    return String.fromCharCode(floor(random(97, 123)));
  }
}

function draw() {
  background(220);
  
  if(random(1) < .2){
      off = floor(random((r*c)-msg.length));
    
  }

  chars=[];
  
  for (let i = 0; i < r*c; i++) {
      chars.push({
        letter: randomChar(),
        col: color(150)
      });
  }

  for (let i = 0; i < msg.length; i++) {
    chars[i + off] = {
      letter: msg[i],
      col: PURPLE
    };
  }
  
  
  textAlign(CENTER, CENTER);

  let n = 0;
  for (let j = 0; j < c; j++) {
    for (let i = 0; i < r; i++) {
      fill(chars[n].col);
      if(chars[n].col == PURPLE){
          strokeWeight(10);
          textSize(32);
      }else{
        strokeWeight(1);
          textSize(24);
      }
      text(chars[n++].letter, i * scl + scl / 2, j * scl + scl / 2);
      //console.log(n);
    }
  }
}
