define([], {
    /**
     * 图片加载器
     * @param {images:object} 以键值对存放图片的名称与路径
     * @param {callback:function} 所有图片加载完毕后执行的回调函数
     */
    imgLoad: function (images, callback) {
        var loaded = {};
        var loadCount = 0;
        for (var key in images) {
            var img = new Image();
            img.src = images[key];
            loadCount++;
            loaded[key] = img;
            img.onload = function () {
                loadCount--;
                if (loadCount === 0) {
                    callback(loaded);
                }
            }
        }
    },
    /**
     * 创建画布并返回2d上下文
     * @param {domSelector:string} 用于放置画布元素的容器的选择器
     * @param {width:number} 设置画布的宽度
     * @param {height:number} 设置画布的高度
     */
    getContext: function (domSelector, width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        document.querySelector(domSelector).appendChild(canvas);
        return canvas.getContext('2d');
    },
    /**
     * 角度转弧度函数
     * @param {angle:number} 角度值
     * @return 弧度值
     */
    angleToArc: function (angle) {
        return Math.PI / 180 * angle;
    },
    roleFactory: function (roleType, option) {
        var commom = {};
        return function (option) {
            return new window[roleType](option);
        }
    },
    /**
     * 将一些对象自己的属性copy至一个目标对象
     * @param {args[0]:object} 目标对象
     * @param {args[1]:object} 携带属性的对象1
     * @param {args[2]:object} 携带属性的对象2
     *          ...
     * @param {args[n]:object} 携带属性的对象n
     */
    extend: function () {
        var target = arguments[0];
        var length = arguments.length;
        for (var i = 1; i < length; i++) {
            for (var key in arguments[i]) {
                //排除原型上的属性
                if (arguments[i].hasOwnProperty(key)) {
                    target[key] = arguments[i][key];
                }
            }
        }
    },
    /**
     * 生成指定范围内的随机数
     * @param {min:number} 指定随机数的最小值
     * @param {max:number} 指定随机数的最大值
     * @return {value:number} 随机数
     */
    getRandom: function (min, max) {
        var value = Math.random() * (max - min) + min;
        return value;
    }
})