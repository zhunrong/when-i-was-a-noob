class Head {
    constructor(options) {
        this.canvas = options.canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;

        this.ax = 0;
        this.ay = 0;
        this.vx = 0;
        this.vy = 0;

        this.rot = 0;
        this.radius = 0;
        this.leftTop = {
            x: -this.radius,
            y: -this.radius
        }
        this.rightTop = {
            x: this.radius,
            y: -this.radius
        }
        this.leftBottom = {
            x: -this.radius,
            y: this.radius
        }
        this.rightBottom = {
            x: this.radius,
            y: this.radius
        }
    }
    update(md) {

        var canvas = this.canvas;
        if (md) {
            var dx = mx - this.x;
            var dy = my - this.y;
            this.vx = dx * 0.1;
            this.vy = dy * 0.1;
        } else {
            if (this.x < 0 || this.x > canvas.width) {
                this.ax = 0;
                this.vx = 0;
            }

            // 上下边界
            if (this.y < 0 || this.y > canvas.height) {
                this.ay = 0;
                this.vy = 0;
            }

            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x > canvas.width) {
                this.x = canvas.width;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.y > canvas.height) {
                this.y = canvas.height;
            }

            this.ax = utils.rand(-0.2, 0.2);
            this.ay = utils.rand(-0.2, 0.2);
            this.ax *= Math.abs(this.ax) > maxa ? 0.75 : 1;
            this.ay *= Math.abs(this.ay) > maxa ? 0.75 : 1;
            this.vx *= Math.abs(this.vx) > maxv ? 0.75 : 1;
            this.vy *= Math.abs(this.vy) > maxv ? 0.75 : 1;
        }

        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        this.rot += 0.02;
    }
}