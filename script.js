// Display
let W = window.innerWidth;
let H = window.innerHeight;

// QTree
let MAX_DEPTH = 6;
let SAMPLE_RATIO = 0.2;
let PAD = 2;
let Q;
let BOX = [];

// Particle
let g = 0;
let mu = -0.9;
let hardness = 1;
let cor = 0.99;
let R = 60;
let P;

function setup() {
    createCanvas(W, H);
    background(0);

    Q = new QTree(0, 0, W, H, 0, 0);
    P = new Particle(W / 2, H / 2);

}

function mouseClicked() {
    noLoop();
}

function make_box() {
    Q.get_coors();
    let x_vals = [];
    let y_vals = [];
    for (let i = 0; i < BOX.length; i++) {
        x_vals[i] = BOX[i][0];
        y_vals[i] = BOX[i][1];
    }
    let x_min = min(x_vals);
    let x_max = max(x_vals);
    let y_min = min(y_vals);
    let y_max = max(y_vals);

    let w = x_max-x_min;
    let h = y_max-y_min;

    rectMode(CORNER);
    stroke(0,0,255);
    strokeWeight(2);
    noFill();
    rect(x_min, y_min, w, h);
    BOX = [];
}

function draw() {
    background(0);
    P.show();
    P.update();
    Q.find_edge();
    Q.show();
    Q.clear();
    make_box();
}