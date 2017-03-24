window.onload = function () {
    alert('用方向键控制');
    var map=new Map('.map>ul');
    map.initial();
    var snake = new Snake(map);
    snake.turn('up');
    snake.speed = 100;
    snake.move();
    window.onkeyup = function (event) {
        event = event || window.event;
        switch (event.keyCode) {
            case 38:
                snake.turn('up');
                break;
            case 40:
                snake.turn('down');
                break;
            case 37:
                snake.turn('left');
                break;
            case 39:
                snake.turn('right');
                break;
        }
    }
}