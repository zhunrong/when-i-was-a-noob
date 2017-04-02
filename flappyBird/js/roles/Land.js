define([], function () {
    var landCount = 0;
    /**
     * @param {option:object} 配置参数
     * @param {option.img:image} 图片资源
     * @param {option.x:number} 图片绘制x轴坐标
     * @param {option.y:number} 图片绘制y轴坐标
     * @param {option.ctx:2dCanvas} canvas 2d上下文
     */
    var Land = function (option) {
        landCount++;
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.img.width;
        this.h = option.img.height;
        this.img = option.img;
        this.ctx = option.ctx;
    };
    Land.prototype = {
        draw: function () {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.w, this.h);
            this.ctx.drawImage(this.img, this.x, this.y);
            this.update();
        },
        update: function () {
            this.x -= 2;
            if (this.x <= -this.w) {
                this.x += this.w * landCount;
            }
        },
        isOver: function (x, y, callback) {
            if (this.ctx.isPointInPath(x, y)) {
                console.log('over');
                callback();
            }
        }
    };
    return Land;
})