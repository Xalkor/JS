let h = 0;
let word;
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

  word = decodeURI(getUrlVars()['daddy']);
  if (word == "undefined") {
    word = "Lucas Pinto-Leight";
  }
  word = word.substring(0, 25);
  word += " eats ass";

  width = word.length * 30 + 15;
  canvas.width = width;

  ctx.font = "32px Consolas"

  clearTimeout(timer);
  timer = setInterval(draw, 90, ctx);
}

function draw(ctx) {
  ctx.fillStyle = "rgb(51,51,51)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < word.length; i++) {
    h += .75;
    ctx.fillStyle = "hsl(" + mod(Math.floor(h), 360) + ",100%,50%)";
    ctx.fillText(word[i], i * 30 + 15, 50);
  }
}

function mouseMoved(event) {
  can.style.top = event.clientY - height / 2 + "px";
  can.style.left = event.clientX - width / 2 + "px";
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}
