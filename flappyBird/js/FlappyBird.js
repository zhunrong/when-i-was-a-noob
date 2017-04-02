define(['Land','Bird','Pipe','Sky','Score'], function (Land,Bird,Pipe,Sky,Score) {
/**
 * 游戏主对象
 * @param {option:object} 配置运行环境 
 * @param {option.imgLoad:function} 图片加载函数 
 * @param {option.selector:string} 游戏画布的容器选择器 
 * @param {option.getContext:function} 画布创建函数 
 */
    function FlappyBird(option) {
        this.imgLoad = option.imgLoad;
        this.getContext = option.getContext;
        this.roles = {
            sky: [],
            pipe: [],
            land: [],
            score: [],
            bird: []
        };
        this.ctx = null;
        this.selector = option.selector;
        this.stop = false;
    }
    FlappyBird.prototype = {
        run: function () {
            this.stop = false;
            //点击事件使小鸟向上飞
            document.onclick = function () {
                this.roles.bird[0].flyUp();
            }.bind(this);
            var animate = function () {
                if (!this.stop) {
                    //更新每一帧前清除画布
                    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                    for (var key in this.roles) {
                        this.roles[key].forEach(function (role, i) {
                            //小鸟中心点坐标，用于碰撞检测
                            var birdCenterX = this.roles.bird[0].x + this.roles.bird[0].w / 2;
                            var birdCenterY = this.roles.bird[0].y + this.roles.bird[0].h / 2;
                            role.draw();
                            if (role.isOver) {
                                //判断小鸟死亡
                                role.isOver(birdCenterX, birdCenterY, function () {
                                    // clearInterval(timer);
                                    this.over();
                                }.bind(this));
                            }
                            if (role.getScore) {
                                //计算得分
                                role.getScore(birdCenterX, birdCenterY);
                            }
                        }.bind(this));
                    };
                    requestAnimationFrame(animate);
                }
            }.bind(this);
            animate();
        },
        pause: function () {
            this.stop = !this.stop;
        },
        over: function () {
            this.stop = true;
        },
        init: function () {
            this.imgLoad({
                sky: 'images/sky.png',
                bird: 'images/birds.png',
                land: 'images/land.png',
                pipeUp: 'images/pipeUp.png',
                pipeDown: 'images/pipeDown.png'
            }, function (images) {
                this.ctx = this.getContext(this.selector, images.sky.width, images.sky.height);
                var landCount = this.getRoleCount(this.ctx.canvas.width, images.land.width),
                    skyCount = this.getRoleCount(this.ctx.canvas.width, images.sky.width),
                    pipeCount = this.getRoleCount(this.ctx.canvas.width, images.pipeUp.width + 150);
                //创建所有大地实例
                for (var i = 0; i < landCount; i++) {
                    this.roles.land.push(new Land({
                        x: images.land.width * i,
                        ctx: this.ctx,
                        img: images.land,
                        y: this.ctx.canvas.height - images.land.height
                    }));
                }
                //创建所有天空实例
                for (var i = 0; i < skyCount; i++) {
                    this.roles.sky.push(new Sky({
                        x: this.ctx.canvas.width * i,
                        ctx: this.ctx,
                        img: images.sky
                    }));
                };
                //创建小鸟实例
                this.roles.bird.push(new Bird({
                    x: 100,
                    y: 200,
                    ctx: this.ctx,
                    img: images.bird
                }));
                //生成管道
                for (var i = 0; i < pipeCount; i++) {
                    this.roles.pipe.push(new Pipe({
                        pipeUp: images.pipeUp,
                        pipeDown: images.pipeDown,
                        distance: 150,
                        ctx: this.ctx,
                        x: (images.pipeDown.width + 150) * i + 400
                    }));
                };
                //计分器实例
                this.roles.score.push(new Score({
                    ctx: this.ctx,
                    pipe: this.roles.pipe
                }));
                this.run();
            }.bind(this))
        },
        //根据画布的宽度和对象宽度计算对象的个数
        getRoleCount: function (canvasWidth, roleWidth) {
            return Math.ceil(canvasWidth / roleWidth) + 1;
        }
    }
    return FlappyBird;
})