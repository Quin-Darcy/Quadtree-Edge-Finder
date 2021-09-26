class QTree {
    constructor(x, y, w, h, depth, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.depth = depth;
        this.id = id;

        this.q1 = 0;
        this.q2 = 0;
        this.q3 = 0;
        this.q4 = 0;

        this.subdivided = false;
        this.sample_ratio = SAMPLE_RATIO;
        this.contains = false;
        this.del = false;
    }
    find_edge() {
        if (!this.subdivided) {
            let G = new Grid(this.w, this.h, this.sample_ratio);
            let samples = [];
            let temp = 0;
            let sum = 0;
            for (let i = 0; i < G.num_x_points; i++) {
                samples[i] = [];
                for (let j = 0; j < G.num_y_points; j++) {
                    temp = get(this.x+i*G.w+G.pad_x, this.y+j*G.h+G.pad_y);
                    samples[i][j] = temp[0]+temp[1]+temp[2];
                    sum += samples[i][j];
                }
            }
            if (sum != G.num_x_points * G.num_y_points * samples[0][0]) {
                this.contains = true;
                this.del = false;
                this.subdivide();
            } else {
                this.contains = false;
                this.del = true;
            }
        } else {
            this.q1.find_edge();
            this.q2.find_edge();
            this.q3.find_edge();
            this.q4.find_edge();
        }
    }
    subdivide() {
        if (this.depth < MAX_DEPTH) {
            if (!this.subdivided) {
                this.q1 = new QTree(this.x+this.w/2, this.y, this.w/2, this.h/2, this.depth+1, 1);
                this.q2 = new QTree(this.x, this.y, this.w/2, this.h/2, this.depth+1, 2);
                this.q3 = new QTree(this.x, this.y+this.h/2, this.w/2, this.h/2, this.depth+1, 3);
                this.q4 = new QTree(this.x+this.w/2, this.y+this.h/2, this.w/2, this.h/2, this.depth+1, 4);
                
                this.subdivided = true;
            } else {
                this.q1.subdivide();
                this.q2.subdivide();
                this.q3.subdivide();
                this.q4.subdivide();
            }
        }
    }
    get_coors() {
        if (this.subdivided) {
            this.q1.get_coors();
            this.q2.get_coors();
            this.q3.get_coors();
            this.q4.get_coors();
        } else {
            if (this.contains) {
                BOX.push([this.x, this.y]);
            }
        }
    }
    clear() {
        if (this.subdivided) {
            if (this.q1.del && this.q2.del && this.q3.del && this.q4.del) {
                this.subdivided = false;
                this.contains = false;
                this.del = true;
            } else {
                this.q1.clear();
                this.q2.clear();
                this.q3.clear();
                this.q4.clear();
            }
        } else {
            if (!this.contains) {
                this.del = true;
            }
        }
    }
    show() {
        rectMode(CORNER);
        stroke(255);
        strokeWeight(0.5);
        noFill();
        
        if (this.contains && this.depth === MAX_DEPTH) {
            rect(this.x, this.y, this.w, this.h);
        }

        if (this.subdivided) {
            this.q1.show();
            this.q2.show();
            this.q3.show();
            this.q4.show();
        }
    }
}