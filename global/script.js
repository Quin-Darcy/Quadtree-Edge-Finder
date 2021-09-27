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
    stroke(0,220,10);
    strokeWeight(6);
    noFill();
    rect(x_min, y_min, w, h);

    let box1_c1 = [x_max, y_min];
    let box1_c2 = [x_min, y_min];
    let box1_c3 = [x_min, y_max];
    let box1_c4 = [x_max, y_max];

    let box2_c1 = [P.x+P.r, P.y-P.r];
    let box2_c2 = [P.x-P.r, P.y-P.r];
    let box2_c3 = [P.x-P.r, P.y+P.r];
    let box2_c4 = [P.x+P.r, P.y+P.r];

    let d = dist(box1_c2[0], box1_c2[1], box2_c2[0], box2_c2[1]);

    AREA = round(100 * (1 - d / (2 * Math.sqrt(2) * P.r)));
    BOX = [];
}

function get_info() {
    if (frameCount % 30 === 0) {
        FR = round(frameRate());
        let sum = 0;
        for (let i = 0; i < acc_arr.length; i++) {
            sum += acc_arr[i];
        }
        ACC = round(sum / acc_arr.length);
    }
    fill(255);
    noStroke();
    textSize(20);
    
    arr = ['TOTAL_NODES: ', TOTAL_NODES];
    temp = join(arr, '');
    text(temp, 15, 30);

    arr = ['COVERAGE: ', ACC, '%'];
    temp = join(arr, '');
    text(temp, 15, 60);

    arr = ['FPS: ', FR];
    temp = join(arr, '');
    text(temp, 15, 90);

    arr = ['MAX_DEPTH: ', MAX_DEPTH];
    temp = join(arr, '');
    text(temp, 15, 120);

    arr = ['RADIUS: ', R];
    temp = join(arr, '');
    text(temp, 15, 150);

    if (acc_arr.length < 100) {
        acc_arr.push(AREA);
    } else {
        acc_arr = [];
    }
}

function draw() {
    background(0);

    P.show();
    P.update();
    Q.find_edge();
    Q.show();
    get_info();
    Q.clear();
    make_box();
}