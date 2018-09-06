webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canvas = document.getElementById('game');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

module.exports = {
    canvas: canvas,
    ctx: ctx
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 一个矢量对象，集成了矢量相关方法
 */
var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;
        this.magnitude = this.getMagnitude();
    }

    /*取模*/


    _createClass(Vector, [{
        key: "getMagnitude",
        value: function getMagnitude() {
            if (this.x === 0 && this.y === 0) {
                return 0.000000001;
            }
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /*矢量加*/

    }, {
        key: "add",
        value: function add(target) {
            return new Vector(this.x + target.x, this.y + target.y);
        }

        /*矢量减*/

    }, {
        key: "substract",
        value: function substract(target) {
            return new Vector(this.x - target.x, this.y - target.y);
        }

        /*点积*/

    }, {
        key: "dotProduct",
        value: function dotProduct(target) {
            return this.x * target.x + this.y * target.y;
        }

        /*与标量的积*/

    }, {
        key: "scale",
        value: function scale(scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        }

        /*求边缘向量*/

    }, {
        key: "edge",
        value: function edge(target) {
            return this.substract(target);
        }

        /*正交向量*/

    }, {
        key: "perpendicular",
        value: function perpendicular() {
            return new Vector(this.y, -this.x);
        }

        /*单位向量*/

    }, {
        key: "normalize",
        value: function normalize() {
            return new Vector(this.x / this.magnitude, this.y / this.magnitude);
        }

        /*法向量*/

    }, {
        key: "normal",
        value: function normal() {
            return this.perpendicular().normalize();
        }

        /*求与目标向量的夹角余弦值*/

    }, {
        key: "cosAngle",
        value: function cosAngle(target) {
            return this.dotProduct(target) / (this.magnitude * target.magnitude);
        }

        /*求与目标向量的夹角*/

    }, {
        key: "angle",
        value: function angle(target) {
            return Math.acos(this.cosAngle(target));
        }
    }]);

    return Vector;
}();

exports.default = Vector;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sprite = __webpack_require__(3);

var _sprite2 = _interopRequireDefault(_sprite);

var _onCanvas = __webpack_require__(0);

var _gravity = __webpack_require__(4);

var _gravity2 = _interopRequireDefault(_gravity);

var _crash = __webpack_require__(5);

var _crash2 = _interopRequireDefault(_crash);

var _tools = __webpack_require__(6);

var _tools2 = _interopRequireDefault(_tools);

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*向量*/
_tools2.default.load({
    601: 'https://img.yeba.im/dpm/images/canvas/emoji/601.png',
    602: 'https://img.yeba.im/dpm/images/canvas/emoji/602.png',
    603: 'https://img.yeba.im/dpm/images/canvas/emoji/603.png',
    604: 'https://img.yeba.im/dpm/images/canvas/emoji/604.png',
    605: 'https://img.yeba.im/dpm/images/canvas/emoji/605.png',
    606: 'https://img.yeba.im/dpm/images/canvas/emoji/606.png',
    607: 'https://img.yeba.im/dpm/images/canvas/emoji/607.png',
    608: 'https://img.yeba.im/dpm/images/canvas/emoji/608.png',
    609: 'https://img.yeba.im/dpm/images/canvas/emoji/609.png',
    610: 'https://img.yeba.im/dpm/images/canvas/emoji/610.png',
    611: 'https://img.yeba.im/dpm/images/canvas/emoji/611.png',
    612: 'https://img.yeba.im/dpm/images/canvas/emoji/612.png'
}).then(function (img) {

    var pool = [];
    var timerID = void 0;

    function begin() {
        if (timerID) return;
        var index = 1;
        pool = [];
        _gravity2.default.bottomOpen = false;
        timerID = setInterval(function () {
            if (index > 20) {
                clearInterval(timerID);
                timerID = null;
                _gravity2.default.bottomOpen = true;
                return;
            }
            var sprite = new _sprite2.default({
                base: {
                    name: index++,
                    top: -140,
                    left: _tools2.default.random(0, _onCanvas.canvas.width - 140),
                    height: 140,
                    width: 140,
                    radius: 70,
                    velocity: new _vector2.default(_tools2.default.random(1, 5), _tools2.default.random(1, 3))
                },
                pool: pool,
                painter: {
                    img: img[_tools2.default.random(601, 613)],
                    paint: function paint(sprite, ctx) {
                        ctx.drawImage(this.img, 10, 10, 140, 140, sprite.left, sprite.top, 140, 140);
                    }
                },
                behaviors: [_gravity2.default, _crash2.default]
            });
            pool.push(sprite);
        }, 500);
    }

    begin();

    function loop() {

        _onCanvas.ctx.clearRect(0, 0, _onCanvas.canvas.width, _onCanvas.canvas.height);

        var stop = false;

        if (pool.length > 0) {
            stop = true;
        }

        pool.forEach(function (sprite) {
            sprite.update(_onCanvas.ctx);
            sprite.paint(_onCanvas.ctx);
            if (sprite.visible) {
                stop = false;
            }
        });

        if (stop) {
            begin();
        }

        requestAnimationFrame(loop);
    }

    loop();
});
/*行为end*/

/*工具*/


/*行为*/

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _onCanvas = __webpack_require__(0);

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
    function Sprite(options) {
        _classCallCheck(this, Sprite);

        this.painter = options.painter;
        this.behaviors = options.behaviors || [];
        this.forces = options.forces || [];

        //基本属性
        this.name = options.base.name;
        this.top = options.base.top || 0;
        this.left = options.base.left || 0;
        this.width = options.base.width || 0;
        this.height = options.base.height || 0;
        this.radius = options.base.radius || 0;
        this.velocity = options.base.velocity || new _vector2.default(0, 0);
        this.pool = options.pool || [];

        this.visible = true;
        // this.animating = false;
    }

    _createClass(Sprite, [{
        key: 'paint',
        value: function paint(ctx) {
            if (this.painter && this.visible) {
                this.painter.paint(this, ctx);
            }
        }

        /*受力相关*/

    }, {
        key: 'force',
        value: function force(ctx, time) {
            var _this = this;

            this.forces.forEach(function (force) {
                _this.velocity = _this.velocity.add(force);
            });
        }
    }, {
        key: 'update',
        value: function update(ctx, time) {
            var _this2 = this;

            this.behaviors.forEach(function (behavior) {
                behavior.execute(_this2, ctx, time);
            });

            if (this.top > _onCanvas.canvas.height) {
                this.visible = false;
            }
        }
    }, {
        key: 'center',
        value: function center() {
            return new _vector2.default(this.left + this.width / 2, this.top + this.height / 2);
        }
    }]);

    return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _onCanvas = __webpack_require__(0);

var _vector = __webpack_require__(1);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function speedCompute(speed, accelerate) {
    var damping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    return speed.normalize().scale(damping).add(accelerate).add(speed);
}

exports.default = {
    gravity: new _vector2.default(0, 0.25),
    damping: -0.03,
    bottomOpen: false,
    execute: function execute(sprite, ctx, time) {

        sprite.left += sprite.velocity.x;
        sprite.top += sprite.velocity.y;
        if (sprite.top + sprite.height >= _onCanvas.canvas.height && !this.bottomOpen) {
            //底部
            sprite.top = _onCanvas.canvas.height - sprite.height;
            var v = new _vector2.default(sprite.velocity.x, -sprite.velocity.y * 0.8);
            if (v.magnitude < 0.5) {
                v = new _vector2.default(0, 0);
            }
            sprite.velocity = v;
        } else if (sprite.left + sprite.width >= _onCanvas.canvas.width) {
            //右边
            sprite.left = _onCanvas.canvas.width - sprite.width;

            sprite.velocity = new _vector2.default(-sprite.velocity.x * 0.8, sprite.velocity.y);
        } else if (sprite.left <= 0) {
            //左边
            sprite.left = 0;
            sprite.velocity = new _vector2.default(-sprite.velocity.x * 0.8, sprite.velocity.y);
        } else {

            sprite.velocity = speedCompute(sprite.velocity, this.gravity, this.damping);
        }
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _onCanvas = __webpack_require__(0);

exports.default = {
    execute: function execute(sprite) {

        sprite.pool.forEach(function (target) {
            if (sprite.name != target.name) {
                var spriteO = sprite.center();
                var targetO = target.center();

                var distance = spriteO.substract(targetO);
                if (distance.getMagnitude() <= sprite.radius * 2) {
                    sprite.velocity = sprite.velocity.add(distance.normalize().scale((target.radius * 2 - distance.getMagnitude()) / 10));
                    sprite.top += sprite.velocity.y;
                    sprite.left += sprite.velocity.x;
                }
            }
        });
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _onCanvas = __webpack_require__(0);

exports.default = {
    windowToCanvas: function windowToCanvas(clientX, clientY) {
        var pos = _onCanvas.canvas.getBoundingClientRect();
        return {
            x: clientX - pos.left,
            y: clientY - pos.top
        };
    },
    random: function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    load: function load(images) {
        var loadedCount = 0;
        var imageElments = [];
        return new Promise(function (resolve, reject) {
            var _loop = function _loop(key) {
                loadedCount++;
                imageElments[key] = new Image();
                imageElments[key].src = images[key];
                imageElments[key].onload = function () {
                    loadedCount--;
                    if (loadedCount === 0) {
                        resolve(imageElments);
                    }
                };
                imageElments[key].onerror = function () {
                    reject(imageElments[key]);
                };
            };

            for (var key in images) {
                _loop(key);
            }
        });
    }
};

/***/ })
],[2]);