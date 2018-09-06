/**
 * 一个矢量对象，集成了矢量相关方法
 */
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.magnitude = this.getMagnitude();
    }

    /*取模*/
    getMagnitude() {
        if (this.x === 0 && this.y === 0) {
            return 0.000000001;
        }
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /*矢量加*/
    add(target) {
        return new Vector(this.x + target.x, this.y + target.y);
    }

    /*矢量减*/
    substract(target) {
        return new Vector(this.x - target.x, this.y - target.y);
    }

    /*点积*/
    dotProduct(target) {
        return this.x * target.x + this.y * target.y;
    }

    /*与标量的积*/
    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    /*求边缘向量*/
    edge(target) {
        return this.substract(target);
    }

    /*正交向量*/
    perpendicular() {
        return new Vector(this.y, -this.x);
    }

    /*单位向量*/
    normalize() {
        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    /*法向量*/
    normal() {
        return this.perpendicular().normalize();
    }

    /*求与目标向量的夹角余弦值*/
    cosAngle(target) {
        return this.dotProduct(target) / (this.magnitude * target.magnitude);
    }

    /*求与目标向量的夹角*/
    angle(target) {
        return Math.acos(this.cosAngle(target));
    }

}