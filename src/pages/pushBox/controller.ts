interface Options {
    onPressUp(): void;
    onPressDown(): void;
    onPressLeft(): void;
    onPressRight(): void;
    onResize(): void;
}
export default class Controller {
    onPressUp: Function;
    onPressDown: Function;
    onPressLeft: Function;
    onPressRight: Function;
    onResize: Function;
    constructor({ onPressUp, onPressDown, onPressLeft, onPressRight, onResize }: Options) {
        this.onPressUp = onPressUp;
        this.onPressDown = onPressDown;
        this.onPressLeft = onPressLeft;
        this.onPressRight = onPressRight;
        this.onResize = onResize;
        this.init();
    }
    init(): void {
        window.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case 38:
                    this.onPressUp();
                    break;
                case 39:
                    this.onPressRight();
                    break;
                case 40:
                    this.onPressDown();
                    break;
                case 37:
                    this.onPressLeft();
                    break;
            }
        })
        window.addEventListener('resize', e => {
            this.onResize();
        })
    }
}