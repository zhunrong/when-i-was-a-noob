var utils = {
    /**
     * 返回范围内的随机数
     */
    rand: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    /**
     * 计算一个坐标绕原点旋转rot弧度后的新坐标 (acosα-bsinα,asinα+bcosα)
     */
    rotateCompute: function (rot) {
        return {
            x: this.x * Math.cos(rot) - this.y * Math.sin(rot),
            y: this.x * Math.sin(rot) + this.y * Math.cos(rot)
        }
    }
}