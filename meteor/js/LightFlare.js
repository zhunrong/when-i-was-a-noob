class LightFlare {
    constructor(options) {
        this.ctx = options.ctx;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.range = options.range || 200;
        this.opacity = 1;
    }
    update() {
        this.opacity -= 0.01;
        this.opacity = this.opacity < 0 ? 0 : this.opacity;
    }
    render() {
        var ctx = this.ctx;
        const strength = Math.random() * this.range + this.range;
        const light = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, strength);
        light.addColorStop(0, "rgba(250, 200, 50, 0.9)");
        light.addColorStop(0.1, "rgba(250, 200, 50, 0.8)");
        light.addColorStop(0.4, "rgba(250, 200, 50, 0.5)");
        light.addColorStop(0.65, "rgba(250, 200, 50, 0.3)");
        light.addColorStop(0.8, "rgba(250, 200, 50, 0.05)");
        light.addColorStop(1, "rgba(250, 200, 50, 0)");
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.fillStyle = light;
        ctx.arc(this.x, this.y, strength, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}