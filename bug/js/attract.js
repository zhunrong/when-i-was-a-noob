class Attractor {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        this.rot = 0;
        this.vr = 0;

        this.attractor = options.attractor;
    }

    update() {
        var attractor = this.attractor;
        var dx = attractor.x - this.x;
        var dy = attractor.y - this.radius * 0.3 - this.y;
        var dr = attractor.rot - this.rot;

        this.vx = dx * 0.05;
        this.vy = dy * 0.05;

        this.x += this.vx;
        this.y += this.vy;

        this.rot = Math.atan2(dy, dx);
        // this.vr = dr * 0.05;
        // this.rot += this.vr;
    }
}