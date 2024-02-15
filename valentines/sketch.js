let canvas;

class Firework {
    constructor(width, height, c, xx, yy) {
        this.pos = {x: width/2 + xx, y: height/2 - height*0.25 + yy};
        this.ppos = null;
        let a = Math.random() * Math.PI * 8;
        let r = Math.random() * 16;
        this.vel = {x: r*Math.cos(a), y: r*Math.sin(a)-10};
        this.c = c;
        this.size = Math.random()*4+4;
    }

    update() {
        this.ppos = {x: this.pos.x, y: this.pos.y}
        this.vel.y += 1;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    show() {
        if(this.ppos == null) {
            fill(this.c[0],this.c[1],this.c[2], 128);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
        } else {
            stroke(this.c[0],this.c[1],this.c[2], 128);
            strokeWeight(this.size);
            line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
        }
    }
}
let w, h;
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    w = width;
    h = height;
}

function draw() {
    clear();
    background(0,0);
    for(let f of fs) {
        f.update();
        f.show();
        if(f.pos.y + f.size/2 > height) {
            f.pos.y = height-f.size/2;
            f.vel.y *= -Math.random()*0.6;
        }
        if(f.pos.x + f.size/2 > width) {
            f.pos.x = width-f.size/2;
            f.vel.x *= -Math.random()*0.8;
        }
        if(f.pos.x - f.size/2 < 0) {
            f.pos.x = f.size/2;
            f.vel.x *= -Math.random()*0.8;
        }
    }
    fs = fs.filter(function(item) {
        return Math.abs(item.vel.y) > 0.1;
    })
    // fill(255);
    // ellipse(width/2, height/2 - height*0.1, 25, 25);
}

let fs = [];
function burst() {
    let c = [
        Math.floor(Math.random()*128+128),
        Math.floor(Math.random()*64+64),
        Math.floor(Math.random()*128+128),
    ];
    let xx = Math.random()*w - w/2;
    let yy = Math.random()*(h/2) - h/4;
    for(let i = 0; i < Math.floor(Math.random()*400+100); i++)
        fs.push(new Firework(w, h, c, xx, yy));
}