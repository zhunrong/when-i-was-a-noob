function Snake(map) {
    this.body = [{ row: 50, col: 50 }, { row: 50, col: 49 }, { row: 50, col: 48 }, { row: 50, col: 47 }];
    this.length = this.body.length;
    //头
    this.head = this.body[0];
    //尾巴
    this.tail = this.body[this.length - 1];
    this.direction = 'left';
    this.speed = 300;
    this.newHead = null;
    this.step = function () {
        switch (this.direction) {
            case 'left':
                this.newHead = {
                    row: this.head.row,
                    col: this.head.col - 1
                };
                break;
            case 'up':
                this.newHead = {
                    row: this.head.row - 1,
                    col: this.head.col
                };
                break;
            case 'right':
                this.newHead = {
                    row: this.head.row,
                    col: this.head.col + 1
                };
                break;
            case 'down':
                this.newHead = {
                    row: this.head.row + 1,
                    col: this.head.col
                };
                break;
        }
        this.body.unshift(this.newHead);
        this.die();
        this.body.pop();
        this.grow();
        this.show();
        this.length = this.body.length;
        this.head = this.body[0];
        this.tail = this.body[this.length - 1];
    }
    this.show = function () {
        map.mapView[this.tail.row][this.tail.col].classList.remove('snake');
        for (var i = 0; i < this.length; i++) {
            map.mapView[this.body[i]['row']][this.body[i]['col']].classList.add('snake');
        }
    }
    this.move = function () {
        var THIS = this
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            THIS.step();
        }, this.speed);
    }
    this.grow = function () {
        if (map.mapView[this.newHead.row][this.newHead.col].classList.contains('food')) {
            this.body.push(this.tail);
            map.mapView[this.newHead.row][this.newHead.col].classList.remove('food');
            map.createFood();
            console.log(this.body.length);
            this.speed--;
            this.speed = this.speed <= 50 ? 50 : this.speed;
            this.move();
        }
    }
    this.die = function () {
        if (this.newHead.row < 0 || this.newHead.col < 0 || this.newHead.row > 99 || this.newHead.col > 99) {
            clearInterval(this.timer);
            alert('我感觉我要挂了！！！');
        } else if (map.mapView[this.newHead.row][this.newHead.col].classList.contains('snake')) {
            clearInterval(this.timer);
            console.log(this.newHead);
            console.log(this.body);
            console.log(this.direction);
            alert('我疯狂起来连自己都打！！！');
        }
    }
    this.turn = function (dir) {
        switch (this.direction) {
            case 'up':
                if (dir === 'down') {
                    return;
                }
                break;
            case 'down':
                if (dir === 'up') {
                    return;
                }
                break;
            case 'right':
                if (dir === 'left') {
                    return;
                }
                break;
            case 'left':
                if (dir === 'right') {
                    return;
                }
                break;
        }
        this.direction = dir;
        //解决bug
        this.step();
    }
}