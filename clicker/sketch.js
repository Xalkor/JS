let c;
let s = 0;
let circlesDis;
let circles = 0;
let clickVal = 1;

let cps = 0;
let cpsDis;

let clickerStore;
let clickerNum = 0;
let clickerDis;
let clickerPrice = 10;

let pokerStore;
let pokerNum = 0;
let pokerDis;
let pokerPrice = 20;

let stabberStore;
let stabberNum = 0;
let stabberDis;
let stabberPrice = 100;

let mouseEnhancerStore;
let mouseEnhancerNum = 0;
let mouseEnhancerDis;
let mouseEnhancerPrice = 50;

let clickValDis = [];
let cvdIndex = 0;

let input;
let button;
let passInput;

let button1;
let greeting;
let greeting1;
let greeting2;
let greeting3;
let greeting4;

const SEED = 2800358750;

function setup() {

clickValDis[0] = new floatText("test",mouseX,mouseY);
clickValDis[1] = new floatText("test",mouseX,mouseY);
clickValDis[2] = new floatText("test",mouseX,mouseY);
clickValDis[3] = new floatText("test",mouseX,mouseY);
clickValDis[4] = new floatText("test",mouseX,mouseY);
clickValDis[5] = new floatText("test",mouseX,mouseY);

    createCanvas(800,400);

  circlesDis = createP("circles: "+ circles);
  cpsDis = createP("circles per second: " + cps);

  clickerStore = createButton("buy clicker (" + clickerPrice + " circles)");
  clickerStore.mousePressed(buyClicker);
  // clickerStore.position(0,240);
  clickerDis = createP("clickers: "+ clickerNum);

  pokerStore = createButton("buy poker (" + pokerPrice + " circles)");
  pokerStore.mousePressed(buyPoker);
  pokerDis = createP("pokers: "+ pokerNum);

  stabberStore = createButton("buy stabber (" + stabberPrice + " circles)");
  stabberStore.mousePressed(buyStabber);
  stabberDis = createP("pokers: "+ stabberNum);

  mouseEnhancerStore = createButton("buy mouse enhancer (" + mouseEnhancerPrice + " circles)");
  mouseEnhancerStore.mousePressed(buyMouseEnhancer);
  mouseEnhancerDis = createP("mouse enhancers: "+ mouseEnhancerNum);



  input = createInput();
  input.position(20, 865);

  passInput = createInput();
  passInput.position(20, 925);

  button = createButton('enter');
  button.position(input.x + input.width, 865);
  button.mousePressed(validateCheetCode);

  button1 = createButton('generate code');
  button1.position(input.x + input.width, 925);
  button1.mousePressed(generateCheetCode);

  greeting = createElement('h2', 'code');
  greeting.position(20, 805);

  greeting1 = createElement('h2', 'password');
  greeting1.position(20, 875);

  greeting2 = createElement('h4', 'enter a password and hit &ltgenerate code&gt,');
  greeting2.position(20, 935);

  greeting3 = createElement('h4', 'then when you want to restore your settings paste in the ');
  greeting3.position(20, 965);

  greeting4 = createElement('h4', 'code you were given, enter your password and hit &ltenter&gt');
  greeting4.position(20, 995);

  c = new circle(width/4,height/2,width/5);
}

function draw() {
  background(255);
  c.show();
  if(c.isMouseOver()){
    c.r = width/5 + 2;
  }else{
    c.r = width/5;
  }
  circlesDis.html("circles: "+ circles);
  cpsDis.html("circles per second: " + cps);
  clickerDis.html("clickers: "+ clickerNum);
  pokerDis.html("pokers: "+ pokerNum);
  stabberDis.html("stabbers: "+ stabberNum);
  mouseEnhancerDis.html("mouse enhancers: "+ mouseEnhancerNum);

  clickerStore.html("buy clicker (cps +1 for " + clickerPrice + " circles)");
  pokerStore.html("buy poker (cps +20 for " + pokerPrice + " circles)");
  stabberStore.html("buy stabber (cps +100 for " + stabberPrice + " circles)");
  mouseEnhancerStore.html("buy mouse enhancer (click value +1 for " + mouseEnhancerPrice + " circles)");

  if(s != second()){
    circles+=clickerNum;
    circles+=pokerNum*20;
    circles+=stabberNum*100;
    cps = clickerNum + (pokerNum*20) + (stabberNum*100);
    s = second();
  }
  clickValDis[0].update();
  clickValDis[1].update();
  clickValDis[2].update();
  clickValDis[3].update();
  clickValDis[4].update();
  clickValDis[5].update();
}

function mouseReleased() {
  if(c.isMouseOver()){
    circles+=clickVal;
    c.r-=3;
    c.color.x = (c.color.x + 5)%360;
    clickValDis[cvdIndex] = new floatText(clickVal,mouseX,mouseY,cvdIndex);
    cvdIndex = (cvdIndex+1) % 6;
  }
}

function buyClicker(){
  if(circles >= clickerPrice){
    clickerNum++;
    circles-=clickerPrice;
    clickerPrice += round(clickerPrice/30);
  }
}

function buyPoker(){
  if(circles >= pokerPrice){
    pokerNum++;
    circles-=pokerPrice;
    pokerPrice += round(pokerPrice/30);
  }
}

function buyStabber(){
  if(circles >= stabberPrice){
    stabberNum++;
    circles-=stabberPrice;
    stabberPrice += round(stabberPrice/30);
  }
}

function buyMouseEnhancer(){
  if(circles >= mouseEnhancerPrice){
    mouseEnhancerNum++;
    circles-=mouseEnhancerPrice;
    mouseEnhancerPrice += round(mouseEnhancerPrice/30);
    clickVal = mouseEnhancerNum + 1;
  }
}

function validateCheetCode(){
  if(input.value()){
  let code = "";

  let pass = 0;
  for(let i = 0; i < passInput.value().length; i++){
    pass += unchar(passInput.value().charAt(i));
  }

  randomSeed(SEED*pass);
  for(let i = 0; i < input.value().length; i++){
  code += char(unchar(input.value().charAt(i)) - int(random()*256));
  }

  let vals = split(code , '%');

  if(vals[4]){
    circles = int(vals[0]);
    clickerNum = int(vals[1]);
    pokerNum = int(vals[2]);
    stabberNum = int(vals[3]);
    mouseEnhancerNum = int(vals[4]);
    clickVal = int(vals[4]) + 1;

    for(let i = 0; i < clickerNum; i++){
      clickerPrice += round(clickerPrice/30);
    }
    for(let i = 0; i < pokerNum; i++){
      pokerPrice += round(pokerrPrice/30);
    }
    for(let i = 0; i < stabberNum; i++){
      stabberPrice += round(stabberPrice/30);
    }
    for(let i = 0; i < mouseEnhancerNum; i++){
      mouseEnhancerPrice += round(mouseEnhancerPrice/30);
    }


  }
}
}

function generateCheetCode(){

  let pass = 0;
  for(let i = 0; i < passInput.value().length; i++){
    pass += unchar(passInput.value().charAt(i));
    // console.log(pass);
  }

  let code = circles + '%' + clickerNum + '%' + pokerNum + '%' + stabberNum + '%' + mouseEnhancerNum + '%';
  let newCode = "";
  randomSeed(SEED*pass);
  // console.log(SEED*pass);
  for(let i = 0; i < code.length; i++){
    newCode += char(unchar(code.charAt(i)) + int(random()*256));
  }
  // console.log(newCode);

  let newNewCode = "";
  randomSeed(SEED*pass);
  for(let i = 0; i < newCode.length; i++){
    newNewCode += char(unchar(newCode.charAt(i)) - int(random()*256));
  }
  // console.log(newNewCode);

  input.value(newCode);
}
