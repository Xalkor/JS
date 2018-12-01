let s;
let cut = [];
let flake;
let a;
let cl;
let but, but1;
let rs, gs, bs;
let i = 0;

function setup() {
    a = 4.71238898038469;
    cl = color(18, 180, 255);

    let c = createCanvas(600, 600);

    but = createButton("Generate Snowflake");
    but.mousePressed(() => {
        if (flake) {
            but.html("Generate Snowflake")
            flake = undefined;
            but1.hide();
        } else {
            flake = s.createEdge();
            but.html("Continue Editing")
            but1.show();
        }
    });

    but1 = createButton("save image");
    but1.mousePressed(() => {
        saveCanvas(c, month() + "/" + day() + "/" + year() + "snowflake" + i++, 'png');
    });
    but1.hide();
    rs = createSlider(0, 255, 18, 1);
    rs.hide()
    rs.show();
    gs = createSlider(0, 255, 180, 1);
    gs.hide()
    gs.show();
    bs = createSlider(0, 255, 255, 1);
    s = new Piece();
}

function draw() {
    cl = color(rs.value(), gs.value(), bs.value());
    translate(width / 2, height / 2);
    background(cl);
    fill(255);
    s.render(0, 0);

    if (cut.length > 0) {
        stroke(0);
        line(cut[cut.length - 1].x, cut[cut.length - 1].y, mouseX - width / 2, mouseY - height / 2);
    }

    noFill();
    beginShape();
    for (let i = 0; i < cut.length; i++) {
        let p = cut[i];

        vertex(p.x, p.y);

        strokeWeight(10);
        if (i == 0) {
            stroke(0, 255, 0);
            if (close()) {
                strokeWeight(15);
            }
        }
        point(p.x, p.y);
        stroke(0);
        strokeWeight(1);
    }
    endShape();

    if (flake) {
        background(cl);
        for (let i = 0; i < 6; i++) {
            rotate(TWO_PI / 6);
            push();
            translate(0, height / 5.99);
            rotate(a);
            image(flake, 0, 0, width / 3, width / 3);
            pop();

        }
        scale(1, -1);
        for (let i = 0; i < 6; i++) {
            rotate(TWO_PI / 6);
            push();
            translate(0, height / 5.99);
            rotate(a);
            image(flake, 0, 0, width / 3, width / 3);
            pop();

        }
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        console.log(mouseX, mouseY);
        if (cut.length > 0 && close()) {
            cut.push(cut[0].copy());
            s.cuts.push(cut);
            cut = [];
        } else {
            cut.push(createVector(mouseX - width / 2, mouseY - height / 2));
        }
    }
}

function keyTyped() {
    if (keyCode == 26) {
        s.cuts.splice(s.cuts.length - 1, 1);
    }
}

function close() {
    return (abs(mouseX - width / 2 - cut[0].x) < 5 && abs(mouseY - height / 2 - cut[0].y) < 5);
}

class Piece {

    constructor() {
        this.cuts = [];
        this.points = [];
        let xy = [];
        for (let i = 0; i < 2; i++) {
            let p = p5.Vector.fromAngle(i / 3 * TWO_PI + 3 * PI / 2).mult(width / 2);
            this.points.push(p);
            xy[i] = i == 0 ? p.x : p.y;
        }
        this.points.push(createVector(xy[0], xy[1]));
    }

    render(x, y) {
        noStroke();
        push();
        translate(x, y);
        beginShape();
        for (let pt of this.points) {
            vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
        pop();

        for (let c of this.cuts) {
            fill(cl);
            beginShape();
            for (let i = 0; i < c.length; i++) {
                vertex(c[i].x, c[i].y);
            }
            endShape();
        }
    }

    createEdge() {
        let gc = createGraphics(width, height);
        gc.translate(width / 2, height / 2);
        //gc.scale(1,-1);
        gc.fill(0, 0, 0, 0);
        gc.noStroke();
        gc.push();
        gc.beginShape();
        gc.fill(255);
        for (let pt of this.points) {
            gc.vertex(pt.x, pt.y);
        }
        gc.endShape(CLOSE);
        gc.pop();

        for (let c of this.cuts) {
            gc.fill(0, 255, 0);
            gc.beginShape();
            for (let i = 0; i < c.length; i++) {
                gc.vertex(c[i].x, c[i].y);
            }
            gc.endShape();
        }

        gc.loadPixels();
        var d = gc.pixelDensity();
        var img = 4 * (width * d) * (height * d);
        for (var i = 0; i < img; i += 4) {
            if (gc.pixels[i] < 200 && gc.pixels[i + 1] > 50 && gc.pixels[i + 2] < 200) {
                gc.pixels[i + 3] = 0;
            }
        }
        gc.updatePixels();
        return gc;
    }
}
