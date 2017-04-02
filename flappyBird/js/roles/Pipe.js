define(['util'], function (util) {
    var pipeCount = 0;
    var Pipe = function (option) {
        pipeCount++;
        this.ctx = option.ctx;
        this.pipeUp = option.pipeUp;
        this.pipeDown = option.pipeDown;
        this.w = this.pipeUp.width;
        this.x = option.x || 300;
        // this.y = randomHeight(this.pipeDown.height);
        this.y = util.getRandom(-this.pipeDown.height+100,-100);
        this.space = 100;
        this.distance = option.distance;
        this.speed = option.speed || 2;
    }
    Pipe.prototype = {
        draw: function () {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.pipeDown.width, this.pipeDown.height);
            this.ctx.rect(this.x, this.y + this.space + this.pipeDown.height, this.pipeUp.width, this.pipeUp.height);
            //绘制朝下的管道
            this.ctx.drawImage(this.pipeDown, this.x, this.y, this.pipeDown.width, this.pipeDown.height);
            //绘制朝上的管道
            this.ctx.drawImage(this.pipeUp, this.x, this.y + this.pipeDown.height + this.space, this.pipeUp.width, this.pipeUp.height);
            this.update();
        },
        update: function () {
            this.x += -this.speed;
            if (this.x < -this.pipeDown.width) {
                this.x += pipeCount * (this.pipeDown.width + this.distance);
                this.y = randomHeight(this.pipeDown.height);
            }
        },
        isOver: function (x, y, callback) {
            if (this.ctx.isPointInPath(x, y)) {
                console.log('over');
                callback();
            }
        }
    }
    function randomHeight(imgH) {
        var height = -Math.random() * imgH;
        height = height < -380 ? -380 : height;
        height = height > -100 ? -100 : height;
        return height;
    }
    return Pipe;
})