import { Sprite } from '../../modules/interface';
import { getMap, MapData } from './maps/map';
interface Options {
    x?: number;
    y?: number;
    mapNumber?: number
}
export default class Mesh implements Sprite {
    x: number;
    y: number;
    mapNumer: number;
    map: MapData;
    constructor({ x = 0, y = 0, mapNumber = 10 }: Options) {
        console.log('mesh constructor');
        this.x = x;
        this.y = y;
        this.mapNumer = mapNumber;
        this.map = getMap(this.mapNumer);
    }
    render(ctx: CanvasRenderingContext2D): void {
        const blockWidth: number = ctx.canvas.width / this.map.row;
        const blockHeight: number = ctx.canvas.height / this.map.column;
        for (const j in this.map.data) {
            const rows = this.map.data[j];
            for (const i in rows) {
                switch (rows[i]) {
                    case 1:
                        ctx.fillStyle = 'orange';
                        break;
                    case 2:
                        ctx.fillStyle = 'blue';
                        break;
                    case 3:
                        ctx.fillStyle = 'green';
                        break;
                    case 4:
                        ctx.fillStyle = 'red';
                        break;
                    default:
                        ctx.fillStyle = 'white';
                }
                ctx.fillRect(+i * blockWidth, +j * blockHeight, blockWidth, blockHeight);

            }
        }
    }
    mapUpdate(row: number, column: number, value: number): void {
        this.map.data[row][column] = value;
    }
    moveUp(): void {
        let { i, j, data } = this.map;
        if (i === undefined || j === undefined) return;
        const originData = getMap(this.mapNumer).data;
        if (data[i - 1][j] == 0 || data[i - 1][j] == 4) {
            i--;
            data[i][j] = 3;
            data[i + 1][j] = originData[i + 1][j] == 2 || originData[i + 1][j] == 3 ? 0 : originData[i + 1][j];
        } else if (data[i - 1][j] == 2 && (data[i - 2][j] == 0 || data[i - 2][j] == 4)) {
            i--;
            data[i - 1][j] = 2;
            data[i][j] = 3;
            data[i + 1][j] = originData[i + 1][j] == 2 || originData[i + 1][j] == 3 ? 0 : originData[i + 1][j];
        }
        Object.assign(this.map, {
            i, j
        })
    }
    moveDown(): void {
        let { i, j, data } = this.map;
        if (i === undefined || j === undefined) return;
        const originData = getMap(this.mapNumer).data;
        if (data[i + 1][j] == 0 || data[i + 1][j] == 4) {
            i++;
            data[i][j] = 3;
            data[i - 1][j] = originData[i - 1][j] == 2 || originData[i - 1][j] == 3 ? 0 : originData[i - 1][j];
        } else if (data[i + 1][j] == 2 && (data[i + 2][j] == 0 || data[i + 2][j] == 4)) {
            i++;
            data[i + 1][j] = 2;
            data[i][j] = 3;
            data[i - 1][j] = originData[i - 1][j] == 2 || originData[i - 1][j] == 3 ? 0 : originData[i - 1][j];
        }
        Object.assign(this.map, {
            i, j
        })
    }
    moveLeft(): void {
        let { i, j, data } = this.map;
        if (i === undefined || j === undefined) return;
        const originData = getMap(this.mapNumer).data;
        if (data[i][j - 1] == 0 || data[i][j - 1] == 4) {
            j--;
            data[i][j] = 3;
            data[i][j + 1] = originData[i][j + 1] == 2 || originData[i][j + 1] == 3 ? 0 : originData[i][j + 1];
        } else if (data[i][j - 1] == 2 && (data[i][j - 2] == 0 || data[i][j - 2] == 4)) {
            j--;
            data[i][j - 1] = 2;
            data[i][j] = 3;
            data[i][j + 1] = originData[i][j + 1] == 2 || originData[i][j + 1] == 3 ? 0 : originData[i][j + 1];
        }
        Object.assign(this.map, {
            i, j
        })
    }
    moveRight(): void {
        let { i, j, data } = this.map;
        if (i === undefined || j === undefined) return;
        const originData = getMap(this.mapNumer).data;
        if (data[i][j + 1] == 0 || data[i][j + 1] == 4) {
            j++;
            data[i][j] = 3;
            data[i][j - 1] = originData[i][j - 1] == 2 || originData[i][j - 1] == 3 ? 0 : originData[i][j - 1];
        } else if (data[i][j + 1] == 2 && (data[i][j + 2] == 0 || data[i][j + 2] == 4)) {
            j++;
            data[i][j + 1] = 2;
            data[i][j] = 3;
            data[i][j - 1] = originData[i][j - 1] == 2 || originData[i][j - 1] == 3 ? 0 : originData[i][j - 1];
        }
        Object.assign(this.map, {
            i, j
        })
    }
    checkComplete(): boolean {
        const { data } = this.map;
        let count: number = 0;
        for (const j in data) {
            const rows = data[j];
            for (const i in rows) {
                if (rows[i] === 4) {
                    count++;
                }
            }
        }
        return count === 0;
    }
}