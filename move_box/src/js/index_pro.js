window.onload = function () {
    //游戏步数
    var steps = 0;
    //遮罩层
    var bg = document.getElementById('bg');
    //人物的行列坐标
    var r,l;
    //过关提示框中的   下一关按钮
    var alertNext=document.getElementById('alertNext');
    //储存当前  关卡
    var level=0;
    //过关提示框
    var alert_dom=document.getElementById('alert');
    //关卡显示
    var mission=document.getElementById('mission');
    var missions=['一','二','三','四','五','六','七','八','九','十'];
    //下拉框开启按钮
    var panelBtn=document.getElementById('panelBtn');
    //下拉框
    var dropShow=document.getElementById('dropShow');
    //下拉框关闭按钮
    var close=document.getElementById('close');
    //下拉框初始位置变量
    var dtop=-100;
    //上一关按钮
    var previous=document.getElementById('previous');
    //下一关按钮
    var next=document.getElementById('next');
    //重新开始
    var restart=document.getElementById('restart');
    var deg;
    //游戏界面生成、布局
    var li = gameLayout();
    //界面初始化
    var map = maps[0];
    readMap(map);
    var body = document.getElementsByTagName('body')[0];
    //为body绑定键盘事件
    body.addEventListener('keyup', move, false);

    function taskSelecor() {
        //下拉按钮
        panelBtn.onclick = function () {
            dtop = -100;
            bg.style.display = 'block';
            body.removeEventListener('keyup', move, false);
            var timer1 = setInterval(function () {
                dtop += 4;
                dropShow.style.top = dtop + 'px';
                if (dtop >= 31) {
                    clearInterval(timer1);
                }
            }, 10)
            deg = 0;
            var timer2 = setInterval(function () {
                deg += 6;
                panelBtn.style.transform = 'rotate(' + deg + 'deg)';
                if (deg >= 270) {
                    clearInterval(timer2);
                }
            }, 10)
        }
        //下拉按钮end

        //关闭下拉菜单
        close.onclick = function () {
            var timer1 = setInterval(function () {
                dtop -= 4;
                dropShow.style.top = dtop + 'px'
                if (dtop <= -100) {
                    clearInterval(timer1);
                    bg.style.display = 'none';
                    body.addEventListener('keyup', move, false);
                }
            }, 10)
            var timer2 = setInterval(function () {
                deg -= 6;
                panelBtn.style.transform = 'rotate(' + deg + 'deg)';
                if (deg <= 0) {
                    clearInterval(timer2);
                }
            }, 10)
        }
        //关闭下拉菜单end

        //选择上一关
        previous.onclick = function () {
            if (level > 0) {
                level--;
                map = maps[level];
                readMap(map);
                mission.innerHTML = missions[level];
            }
            steps = -1;
            stepCounter();
        }
        //选择上一关end

        //重新开始
        restart.onclick = function () {
            map = maps[level];
            readMap(map);
            mission.innerHTML = missions[level];
            steps = -1;
            stepCounter();
        }
        //重新开始end

        //选择下一关
        next.onclick = function () {
            if (level < maps.length - 1) {
                level++;
                map = maps[level];
                readMap(map);
                mission.innerHTML = missions[level];
            }else if(level==maps.length-1){
                alert('已经是最后一关了！');
            }
            steps = -1;
            stepCounter();
        }
        //选择下一关end

        //过关之后选择下一关start
        alertNext.onclick = function () {
            if (level < maps.length - 1) {
                level++;
                map = maps[level];
                readMap(map);
                mission.innerHTML = missions[level];
            }else if(level==map.length-1){
                alert('恭喜通关！');
            }
            bg.style.display = 'none';
            alert_dom.style.display = 'none';
            body.addEventListener('keyup', move, false);
            steps = -1;
            stepCounter();
        }
        //过关之后选择下一关end

    }
    taskSelecor();

    function gameLayout() {
        //主界面容器
        var li = []
        var box = document.getElementById('box');
        var ul = document.createElement('ul');
        //创建10X10的方格界面
        for (var i = 0; i < 10; i++) {
            li[i] = [];
            for (var j = 0; j < 10; j++) {
                li[i][j] = document.createElement('li');
                ul.appendChild(li[i][j]);
            }
        }
        box.appendChild(ul);
        return li;
    }
    /*
    游戏中采用10X10的二维数组映射界面中的小方格，一一对应。
    地图数组中的不同数字分别代表界面中的不同元素：
                    0-----空白
                    1-----墙壁
                    2-----箱子
                    3-----小人
                    4-----指定位置
    
    */

    //读取地图，将地图的不同数字一一对应的映射到界面中
    function readMap(map) {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                li[i][j].sign = map[i][j];
                //为不同元素分别设置对应的样式
                switch (li[i][j].sign) {
                    case 0:
                        li[i][j].className = 'blank';
                        break;
                    case 1:
                        li[i][j].className = 'wall';
                        break;
                    case 2:
                        li[i][j].className = 'shit';
                        break;
                    case 3:
                        li[i][j].className = 'people';
                        //获取小人坐标
                        r = i;
                        l = j;
                        break;
                    case 4:
                        li[i][j].className = 'hole';
                        break;
                }
            }
        }
    }

    //刷新屏幕
    function refresh() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                switch (li[i][j].sign) {
                    case 0:
                        li[i][j].className = 'blank';
                        break;
                    case 1:
                        li[i][j].className = 'wall';
                        break;
                    case 2:
                        li[i][j].className = 'shit';
                        break;
                    case 3:
                        li[i][j].className = 'people';
                        break;
                    case 4:
                        li[i][j].className = 'hole';
                        break;
                }
            }
        }
    }

    //判断是否过关
    function isWin() {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (map[i][j] == 4) {
                    if (li[i][j].sign != 2) {
                        return;
                    }
                }
            }
        }
        //setTimeout('alert("过关！！")',10);
        bg.style.display = 'block';
        alert_dom.style.display = 'block';
        //过关弹框时，禁用键盘
        body.removeEventListener('keyup', move, false);
    }

    //计算步数
    function stepCounter() {
        steps++;
        stepNum.innerHTML = steps;
    }

    //游戏操作逻辑
    /*
    逻辑分析：以向左移动为例，
            可以移动的条件（满足一个即可）：1.左边一格是空白 或者 指定位置
                                        2.左边一格是箱子 并且 再左边一格是空白或者指定位置
            移动之后需要更改原来小人位置的样式：
                                         那么再判断，如果原来地图上该位置是箱子或小人，则设置为空白，否则地图是什么就改成什么
                                    
     */
    function move(event) {
        event = event || window.event;
        switch (event.keyCode) {
            case 38://up
                if (li[r - 1][l].sign == 0 || li[r - 1][l].sign == 4) {
                    r--;
                    li[r][l].sign = 3;
                    li[r + 1][l].sign = map[r + 1][l] == 2 || map[r + 1][l] == 3 ? 0 : map[r + 1][l];
                    refresh();
                    stepCounter();
                } else if (li[r - 1][l].sign == 2 && (li[r - 2][l].sign == 0 || li[r - 2][l].sign == 4)) {
                    r--;
                    li[r - 1][l].sign = 2;
                    li[r][l].sign = 3;
                    li[r + 1][l].sign = map[r + 1][l] == 2 || map[r + 1][l] == 3 ? 0 : map[r + 1][l];
                    refresh();
                    stepCounter();
                }
                break;
            case 40://down
                if (li[r + 1][l].sign == 0 || li[r + 1][l].sign == 4) {
                    //peopleStand.push(li[r+1][l].sign);
                    r++;
                    li[r][l].sign = 3;
                    li[r - 1][l].sign = map[r - 1][l] == 2 || map[r - 1][l] == 3 ? 0 : map[r - 1][l];
                    refresh();
                    stepCounter();
                } else if (li[r + 1][l].sign == 2 && (li[r + 2][l].sign == 0 || li[r + 2][l].sign == 4)) {
                    r++;
                    li[r + 1][l].sign = 2;
                    li[r][l].sign = 3;
                    li[r - 1][l].sign = map[r - 1][l] == 2 || map[r - 1][l] == 3 ? 0 : map[r - 1][l];
                    refresh();
                    stepCounter();
                }
                break;
            case 37://left
                if (li[r][l - 1].sign == 0 || li[r][l - 1].sign == 4) {
                    l--;
                    li[r][l].sign = 3;
                    li[r][l + 1].sign = map[r][l + 1] == 2 || map[r][l + 1] == 3 ? 0 : map[r][l + 1];
                    refresh();
                    stepCounter();
                } else if (li[r][l - 1].sign == 2 && (li[r][l - 2].sign == 0 || li[r][l - 2].sign == 4)) {
                    l--;
                    li[r][l - 1].sign = 2;
                    li[r][l].sign = 3;
                    li[r][l + 1].sign = map[r][l + 1] == 2 || map[r][l + 1] == 3 ? 0 : map[r][l + 1];
                    refresh();
                    stepCounter();
                }

                break;
            case 39://right
                if (li[r][l + 1].sign == 0 || li[r][l + 1].sign == 4) {
                    l++;
                    li[r][l].sign = 3;
                    li[r][l - 1].sign = map[r][l - 1] == 2 || map[r][l - 1] == 3 ? 0 : map[r][l - 1];
                    refresh();
                    stepCounter();
                } else if (li[r][l + 1].sign == 2 && (li[r][l + 2].sign == 0 || li[r][l + 2].sign == 4)) {
                    l++;
                    li[r][l + 1].sign = 2;
                    li[r][l].sign = 3;
                    li[r][l - 1].sign = map[r][l - 1] == 2 || map[r][l - 1] == 3 ? 0 : map[r][l - 1];
                    refresh();
                    stepCounter();
                }
                break;
        }
        isWin();
    }

}




