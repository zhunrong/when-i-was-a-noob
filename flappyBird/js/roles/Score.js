define([], function () {
    var score = 0;
    var isInRect = false;
    var Score = function (option) {
        this.ctx = option.ctx;
        this.text = "分数：" + score;
        this.font = option.font || '40px 微软雅黑';
        this.fillStyle = option.fillStyle || 'hotpink';
        this.textAlign = option.textAlign || 'right';
        this.textBaseline = option.textBaseline || 'top';
        this.x = option.x || this.ctx.canvas.width;
        this.y = option.y || 0;
        this.pipe = option.pipe;
    }
    Score.prototype = {
        draw: function () {
            this.ctx.save();
            this.ctx.fillStyle = this.fillStyle;
            this.ctx.font = this.font;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillText(this.text, this.x, this.y);
            this.ctx.restore();
            this.update();
        },
        update: function () {
            this.text = "分数：" + score;
        },
        getScore: function (x, y) {
            this.ctx.beginPath();
            this.pipe.forEach(function (pipe, i) {
                this.ctx.rect(pipe.x + pipe.w, 0, 10, this.ctx.canvas.height);
            }.bind(this));
            //进入得分区域加一分，在同一个得分区域不能重复加分
            if (!isInRect) {
                if (this.ctx.isPointInPath(x, y)) {
                    isInRect = true;
                    // score+=10;
                    this.text = "分数：" + ++score;
                };
            }
            this.ctx.beginPath();
            this.pipe.forEach(function (pipe, i) {
                this.ctx.rect(pipe.x + pipe.w + 10, 0, 10, this.ctx.canvas.height);
            }.bind(this));
            if (isInRect) {
                //判断是否离开已得分区域
                if (this.ctx.isPointInPath(x, y)) {
                    isInRect = false;
                };
            }
        }
    }
    return Score;
})