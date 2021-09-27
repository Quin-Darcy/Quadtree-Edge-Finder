class Grid {
    constructor(w, h, r) {
        this.canvas_w = w;
        this.canvas_h = h;
        this.ratio = r;
        this.set_vals();
    }
    set_vals() {
        this.w = Math.floor(this.canvas_w * this.ratio);
        this.h = Math.floor(this.canvas_h * this.ratio);
        this.pad_x = Math.pow(this.ratio, 2) * this.canvas_w;
        this.pad_y = Math.pow(this.ratio, 2) * this.canvas_h;
        this.num_x_points = Math.floor(this.canvas_w / this.w);
        this.num_y_points = Math.floor(this.canvas_h / this.h);
        this.pad_x = Math.floor(this.canvas_w-(this.num_x_points-1)*this.w) / 2;
        this.pad_y = Math.floor(this.canvas_h-(this.num_y_points-1)*this.h) / 2;
    }
}