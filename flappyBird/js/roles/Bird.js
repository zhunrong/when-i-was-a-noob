define([], function () {
    /**
 * 小鸟构造函数
 * @param {option:object} 参数配置 
 * @param {option.x:number} x轴绘制起点 
 * @param {option.y:number} y轴绘制起点 
 * @param {option.countInRow:number} 每行图片帧数 
 * @param {option.countInCol:number} 每列图片帧数 
 * @param {option.img:image} 图片资源 
 * @param {option.ctx:2dCanvasContext} canvas 2d上下文 
 */
    function Bird(option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.countInRow = option.countInRow || 3;
        this.countInCol = option.countInCol || 1;
        this.img = option.img;
        this.ctx = option.ctx;
        this.w = this.img.width / this.countInRow;
        this.h = this.img.height / this.countInCol;
        this.index = 0;
        this.speed = option.speed || -5;
        this.angle = 0;
    }
    Bird.prototype = {
        draw: function () {
            this.ctx.save();
            this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            this.update();
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(this.img, this.index * this.w, 0, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
            this.ctx.restore();
        },
        update: function () {
            this.y += this.speed;
            this.speed += 0.2;
            this.index = ++this.index % this.countInRow;
            this.angle = Math.PI * this.speed / 40;
            this.angle = this.angle > Math.PI / 4 ? Math.PI / 4 : this.angle;
        },
        flyUp: function () {
            this.speed = -5;
        }
    }
    return Bird;
})