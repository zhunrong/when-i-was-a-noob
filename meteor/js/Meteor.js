class Meteor {
    constructor(options) {
        this.vertexCount = 8;
        this.ctx = options.ctx;
        this.position = options.position || {
            x: this.ctx.canvas.width / 2,
            y: this.ctx.canvas.height / 2
        }
        this.velocity = options.velocity || {
            x: utils.rand(-6, -4),
            y: utils.rand(0, 1)
        }
        this.gravity = 0.05;
        this.friction = 0.1;
        this.radius = options.radius || 20;
        this.rot = options.rot || 0;
        this.color = options.color || ["#300", "#610", "#fd2", "#f62"];
        // 顶点数量
        this.vertexCount = options.vertexCount || 8;
        // 拖影顶点
        this.shadowArr = [];
        this.vertexes = this.createVertexes();

        this.visible = true;
        this.exploded = false;
    }

    update() {
        this.velocity.y += this.gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rot += utils.rand(0.01, 0.1);

        if (this.visible) {
            this.shadowArr.push({
                vertexes: this.createVertexes(),
                color: this.color[~~(Math.random() + 0.6) + 2],
                opacity: 0.9,
                position: {
                    x: this.position.x,
                    y: this.position.y
                }
            });
        }

        if (this.position.y > this.ctx.canvas.height) {
            this.visible = false;
        }
    }

    render() {
        var ctx = this.ctx;

        // 渲染陨石的拖影
        this.shadowArr.forEach((shadow, i) => {
            if (shadow.opacity <= 0) {
                this.shadowArr.splice(i, 1);
                return;
            }
            ctx.save();
            ctx.translate(shadow.position.x, shadow.position.y);
            ctx.beginPath();
            shadow.vertexes.forEach((vertex, i) => {
                if (i === 0) {
                    ctx.moveTo(vertex.x, vertex.y);
                } else {
                    ctx.lineTo(vertex.x, vertex.y);
                }
            })
            ctx.closePath();
            ctx.fillStyle = shadow.color;
            ctx.globalAlpha = shadow.opacity;
            shadow.opacity -= 0.02;
            ctx.fill();
            ctx.restore();
        })


        // 渲染陨石
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        this.vertexes.forEach((vertex, i) => {
            if (i === 0) {
                ctx.moveTo(vertex.x, vertex.y);
            } else {
                ctx.lineTo(vertex.x, vertex.y);
            }
        })
        ctx.closePath();
        ctx.strokeStyle = this.color[0];
        ctx.fillStyle = this.color[1];
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    createVertexes() {
        var count = this.vertexCount;
        var averagePhi = 360 / this.vertexCount;
        var phi = 0;
        var vertexes = [];
        while (count--) {
            var radius = utils.rand(this.radius * 0.8, this.radius * 1.2);
            phi += utils.rand(averagePhi - 10, averagePhi + 10) / 180 * Math.PI;
            var vertex = {
                x: radius * Math.cos(phi),
                y: radius * Math.sin(phi)
            }
            vertexes.push(vertex);
        }
        return vertexes;
    }
}