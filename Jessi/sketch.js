let hearts = [];

function setup() {
	//h = new Heart(0.5, 0.5, 25);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
	
	for(let i = 0; i < 1; i++)
		hearts.push(new Heart(random(1), random(1), random(0.5, 3)));
	
	let mouse = createVector(mouseX/width, mouseY/height);
	hearts.forEach((h)=>{
		h.update(mouse);
		h.show();
	});
	hearts = hearts.filter((h)=>!h.done);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function periodic_sub(v1, v2, w, h){
    dv = p5.Vector.sub(v1, v2)
    dv.x = dv.x - round(dv.x / w) * w
    dv.y = dv.y - round(dv.y / h) * h
    return dv
}

function heart(x, y, r, c){
	function x_pos(t) {
		return 16*pow(sin(t), 3);
	}

	function y_pos(t) {
		return 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t);
	}
	fill(c);
	noStroke();
	//ellipse(x, y, r*2, r*2);
	beginShape();
	for(let a = 0; a < TWO_PI; a+=PI/100){
		vertex(x + r*x_pos(a), y - r*y_pos(a));
	}
	endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Heart{
	constructor(x, y, r){
		this.pos = createVector(x, y);
		this.vel = createVector();
		this.acc = createVector();
		this.r = r;
		this.done = false;
		this.c = color(random(200, 255), random(50, 100), random(150, 200), 75);
	}
	
	show(){
		for(let i = -1; i < 2; i++)
			for(let j = -1; j< 2; j++)
				heart((i + mod(this.pos.x, 1)) * width, (j + mod(this.pos.y, 1)) * height, this.r, this.c);
	}
	
	update(target){
		let desired = periodic_sub(target, this.pos, 1, 1);
		this.acc.set(p5.Vector.sub(desired, this.vel).div(50));
		this.vel.add(this.acc.sub(p5.Vector.mult(this.vel, 0.2)));
		this.pos.add(this.vel);
		this.acc.set(0, 0);
		
		if(desired.mag() < 0.03){
			this.done = true;
		}
	}
}