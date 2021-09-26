class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = R;
        this.v_x = random(-10, 10);
        this.v_y = random(-10, 10);
    }
    update() {
        this.v_y += g;
        this.x += this.v_x;
        this.y += this.v_y;
        if (this.x + this.r > W) {
            this.x = width - this.r;
            this.v_x = this.v_x*cor*mu;
        } else if (this.x - this.r < 0) {
            this.x = this.r;
            this.v_x = this.v_x*cor*mu;
        }
        if (this.y + this.r >= H) {
            this.y = H - this.r;
            this.v_y = this.v_y*cor*mu;
        } else if (this.y - this.r < 0) {
            this.y = this.r;
            this.v_y = this.v_y*cor*mu;
        }
    }
    show() {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.x, this.y, 2*this.r);
    }
}