let h = 0;
let word = "Lucas Pinto-Leight eats ass";
let can;

function init() {
  let canvas = document.getElementById('canvas');
  can = canvas;
  width = 830;
  height = 80;
  canvas.width = width;
  canvas.height = height;

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }

  ctx.font = "32px Consolas"

  clearTimeout(timer);
  timer = setInterval(draw, 90, ctx);
}

function draw(ctx) {
  background(51);
  for (let i = 0; i < word.length; i++) {
    h += .75;
    ctx.fillStyle = "hsl(" + mod(Math.floor(h), 360) + ",100%,50%)";
    ctx.fillText(word[i], i * 30 + 15, 50);
  }
}

function mouseMoved(event) {
  console.log(event);
  can.style.top = event.clientY - height / 2 + "px";
  can.style.left = event.clientX - width / 2 + "px";

}