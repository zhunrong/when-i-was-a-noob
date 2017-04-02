define([], function () {
    var skyCount = 0;
    /**
     * @param {option:object} 配置参数
     * @param {option.img:image} 图片资源
     * @param {option.x:number} 图片绘制x轴坐标
     * @param {option.y:number} 图片绘制y轴坐标
     * @param {option.ctx:2dCanvas} canvas 2d上下文
     */
    var Sky = function (option) {
        skyCount++;
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.img.width;
        this.img = option.img;
        this.ctx = option.ctx;
    };
    Sky.prototype = {
        draw: function () {
            //清除其他路径
            this.ctx.beginPath();
            this.ctx.drawImage(this.img, this.x, this.y);

            this.ctx.rect(0, -5, this.ctx.canvas.width, 5);
            this.update();
        },
        update: function () {
            this.x -= 2;
            if (this.x <= -this.w) {
                this.x += this.w * skyCount;
            }
        },
        isOver: function (x, y, callback) {
            if (this.ctx.isPointInPath(x, y)) {
                callback();
            }
        }
    }
    return Sky;
})