class Sky {
    constructor(options) {
        this.ctx = options.ctx;
        var canvas = this.ctx.canvas;
        this.gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.5);
        this.gradient.addColorStop(0, 'rgba(0,0,0,1)');
        this.gradient.addColorStop(1, 'rgba(0,0,0,0)');
    }
    render() {
        var ctx = this.ctx;
        var canvas = ctx.canvas;
        ctx.save();

        ctx.globalAlpha = utils.rand(0.9, 1);
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height * 0.5);
        ctx.fillStyle = this.gradient;
        ctx.fill();

        ctx.restore();
    }
}