class Shake {
    constructor(options) {
        this.el = options.el;
        this.rot = 0;
        this.ar = 0;
        this.x = 0;
        this.y = 0;
    }
    update() {

        this.ar = -this.rot * 0.08;
        this.rot += this.ar;
        if (Math.abs(this.rot) < 0.01) return;
        var shakeStrength = Math.abs(this.rot * 300);
        this.x = utils.rand(-shakeStrength, shakeStrength);
        this.y = utils.rand(-shakeStrength, shakeStrength);

    }
    render() {
        // return;
        var el = this.el;
        var deg = this.rot / Math.PI * 180;
        el.style.transform = `rotate(${deg}deg) translate3d(${this.x}px,${this.y}px,0)`;
    }
}