﻿var time;

function player(x, y, end, map) {
    this.speed = {
        x: 0,
        y: 0
    };
    this.position = {
        x: x,
        y: y
    };
    this.constPosition = {
        x: x,
        y: y
    }
    this.map = map;
    this.mapIndex = 0;
    this.endPosition = end;
    this.moveAble = true;
}
player.prototype = {
    init: function () {
        this.speed = {
            x: 0,
            y: 0,
        };
        this.position.x = this.constPosition.x;
        this.position.y = this.constPosition.y;

        this.moveAble = true;
        this.mapIndex = 0;
    },
    moveX: function (dom, time,callBack) {
        //dom.style.left = this.position.x + "px";
        var t = 120;
        var callback=function(){};
        if (time) {
            t = time;
        }
        if(callBack){
            callback=callBack;
        }

        $(dom).animate({ left: this.position.x + "px" }, t,callback);//
    },
    moveY: function (dom, time) {
        // dom.style.top = this.position.y + "px";
        var t = 120;
        if (time) {
            t = time;
        }
        $(dom).animate({ top: this.position.y + "px" }, t);//
    },
    jumpTo: function (index, dom) {
        if (this.map[this.mapIndex] && (Math.abs(this.speed.x) + index) > this.map[this.mapIndex].x) {
            this.position.y = this.map[this.mapIndex].y;
            this.show(dom);
            this.mapIndex++;
        }

    },
    getDirection: function (p0, p1) {
        var deltaX = p1.x - p0.x;
        var deltaY = p1.y - p0.y;
        var zeta = 0;
        if (deltaX == 0 && deltaY < 0) {
            return 270;
        }
        if (deltaX == 0 && deltaY > 0) {
            return 90;
        }
        if (deltaY == 0 && deltaX > 0) {
            return 0;
        }
        if (deltaY == 0 && deltaX < 0) {
            return 180;
        }
        return zeta = deltaX / deltaY;
        zeta = Math.atan(zeta) * 180 / Math.PI;
        return zeta;
        if (zeta < 0) {
            return 360 + zeta;
        } else {
            return zeta;
        }

    },
    show: function (dom) {
        dom.style.left = this.position.x + "px";
        dom.style.top = this.position.y + "px";
    }
}
function controller(speed, acceleration, scene, player, map, endCallBack) {
    this.time = 0;
    this.constSpeed = speed;
    this.acceleration = acceleration;
    this.speed = speed;
    this.scene = scene;
    this.timer = null;
    this.setTime = null;
    this.player = player;
    this.map = map;
    this.stage = 0;
    this.direction = 0;
    this.endCallBack = endCallBack;
    this.end = vCoordinate.end.slice();
    this.endPosition=0;
    this.setPic=null;
    this.pic1=coordinate.player.runImage;
    this.pic2=coordinate.player.stopImage;

}
controller.prototype = {
    endAction: function () {
        var w = [];
        var l = [];
        var len = 0;
        var that = this;
        var stageNow = "";
        var time = Date.now();
       
        if (this.endPosition!=Math.abs(parseInt(this.scene.background.style.left)) + parseInt(this.scene.player.style.left)){
            setTimeout(function(){ 
                that.endPosition=Math.abs(parseInt(that.scene.background.style.left)) + parseInt(that.scene.player.style.left);
                that.endAction();
            },250);
            return;
        }
        if (this.end[0]) {
            stageNow = this.end.shift();
            w = stageNow.x - this.player.position.x + this.scene.position.x;
            l = stageNow.y - this.player.position.y;
            if (Math.abs(this.scene.position.x - this.scene.width - this.player.position.x) <= Math.abs(this.scene.backWidth)) {
                this.scene.position.x -= w;
                this.scene.move(200);
            } else {
                this.player.position.x += w;
            }

            this.player.position.y += l;
            this.player.position.y -= vCoordinate.player.height;
            this.player.position.x += vCoordinate.player.width;
            this.player.moveY(this.scene.player, 200);
            this.player.moveX(this.scene.player, 200,function () { that.endAction() });
            this.player.position.x -= vCoordinate.player.width;
            this.player.position.y += vCoordinate.player.height;
            //setTimeout(function () { that.endAction() }, 250);
            return;
        } else {
            this.time = Date.now() - this.time;
            this.speed = 0;
            clearInterval(this.setTime);
            clearInterval(this.setPic)
            if (this.endCallBack) {
                setTimeout(this.endCallBack, 250);
            }
        }


    },
    stop: function () {
        this.endAction(this.endCallBack);
        unBindMove();

    },
    start: function () {
        this.time = Date.now();
        this.speed = this.constSpeed;
        var that = this;
        this.setTime = setInterval(function () {
            gameSceneNode.timer.innerHTML = parseInt((Date.now() - that.time) / 1000) + "'" + String((Date.now() - that.time) % 1000).substring(0, 2);
        }, 10);
        this.setPic=setInterval(function(){
            var pic=that.pic1;
            that.pic1=that.pic2;
            that.pic2=pic;
            that.scene.player.src = that.pic1;

        },coordinate.player.time);
    },
    speedup: function (i) {
        this.speed += i;
    },
    delay: function (i) {
        var time = Date.now();
        while (Date.now() - time < i) {

        }
    },
    init: function () {
        this.time = 0;
        this.speed = this.constSpeed;
        this.stage = 0;
        this.scene.init();
        this.player.init();
        this.end = vCoordinate.end.slice();
        gameSceneNode.timer.innerHTML = "0'00";
        bindMove();
    },
    move: function (time) {
        var t = vCoordinate.acc.time;
        var that = this;
        // if(time){
        //     t=time;
        // }
        // unBindMove();
        // this.scene.player.src = vCoordinate.player.runImage;
        // if (this.time == 0) {
        //     this.start();
        // }
        // clearTimeout(this.timer);
        // this.speedup(this.acceleration);
        this.timer = setTimeout(function () {
            that.speed = that.constSpeed;
            //that.scene.player.src = vCoordinate.player.stopImage;
        }, 150);
        if (this.map[this.stage + 1]) {
            this.direction = this.player.getDirection(this.map[this.stage], this.map[this.stage + 1]);
            if (this.direction == 0) {
                this.player.speed.x = -this.speed;
                this.scene.speed.x = this.speed;
                this.player.position.y -= vCoordinate.player.height;
                if (Math.abs(this.scene.position.x - this.scene.width - this.player.position.x) <= Math.abs(this.scene.backWidth)) {
                    if (Math.abs(this.scene.position.x) + this.player.position.x - this.speed >= this.map[this.stage + 1].x) {
                        this.scene.position.x = -this.map[this.stage + 1].x + this.player.position.x
                        this.stage++;
                    } else {
                        this.scene.position.x += this.scene.speed.x;
                    }
                    this.scene.move(t);
                } else {
                    if (Math.abs(this.scene.position.x) + this.player.position.x - this.speed >= this.map[this.stage + 1].x) {
                        this.player.position.x = this.map[this.stage + 1].x + this.scene.position.x
                        this.stage++;
                    } else {
                        this.player.position.x += this.player.speed.x;
                    }
                    this.player.moveX(this.scene.player, t);
                    this.player.moveY(this.scene.player, t);
                }
                this.player.position.y += vCoordinate.player.height;
            } else if (this.direction == 90) {
                this.player.speed.y = this.speed;
                if (this.player.position.y + this.speed <= this.map[this.stage + 1].y) {
                    this.player.position.y = this.map[this.stage + 1].y;
                    this.stage++;
                } else {
                    this.player.position.y += this.player.speed.y;
                }
                this.player.position.y -= vCoordinate.player.height;
                this.player.position.x -= vCoordinate.player.width;

                this.player.moveX(this.scene.player, t);
                this.player.moveY(this.scene.player, t);
                this.player.position.x += vCoordinate.player.width;
                this.player.position.y += vCoordinate.player.height;

            } else if (this.direction == 270) {
                this.player.speed.y = -this.speed;
                if (this.player.position.y + this.player.speed.y >= this.map[this.stage + 1].y) {
                    this.player.position.y = this.map[this.stage + 1].y;
                    this.stage++;
                } else {
                    this.player.position.y += this.player.speed.y;
                }
                this.player.position.y -= vCoordinate.player.height;
                this.player.position.x -= vCoordinate.player.width;
                this.player.moveX(this.scene.player, t);
                this.player.moveY(this.scene.player, t);
                this.player.position.x += vCoordinate.player.width;
                this.player.position.y += vCoordinate.player.height;

            } else {
                this.player.speed.x = Math.abs(this.speed * Math.sin(this.direction));
                this.scene.speed.x = -Math.abs(this.speed * Math.sin(this.direction));
                this.player.speed.y = this.speed * Math.cos(this.direction);
                if (Math.abs(this.scene.position.x - this.scene.width - this.player.position.x) <= Math.abs(this.scene.backWidth)) {
                    if (Math.abs(this.scene.position.x) + this.player.position.x - this.speed >= this.map[this.stage + 1].x) {
                        this.scene.position.x = -this.map[this.stage + 1].x + this.player.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else if (this.player.speed.y > 0 && (this.player.position.y + this.player.speed.y >= this.map[this.stage + 1].y)) {
                        this.scene.position.x = -this.map[this.stage + 1].x + this.player.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else if (this.player.speed.y < 0 && (this.player.position.y + this.player.speed.y <= this.map[this.stage + 1].y)) {
                        this.scene.position.x = -this.map[this.stage + 1].x + this.player.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else {
                        this.scene.position.x += this.scene.speed.x;
                        this.player.position.y += this.player.speed.y;
                    }
                    this.player.position.y -= vCoordinate.player.height;
                    this.scene.move(t);
                    this.player.moveY(this.scene.player, t);
                } else {
                    if (Math.abs(this.scene.position.x) + this.player.position.x - this.speed >= this.map[this.stage + 1].x) {
                        this.player.position.x = this.map[this.stage + 1].x + this.scene.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else if (this.player.speed.y > 0 && (this.player.position.y + this.player.speed.y >= this.map[this.stage + 1].y)) {
                        this.player.position.x = this.map[this.stage + 1].x + this.scene.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else if (this.player.speed.y < 0 && (this.player.position.y + this.player.speed.y <= this.map[this.stage + 1].y)) {
                        this.player.position.x = this.map[this.stage + 1].x + this.scene.position.x;
                        this.player.position.y = this.map[this.stage + 1].y;
                        this.stage++;
                    } else {
                        this.player.position.x += this.player.speed.x;
                        this.player.position.y += this.player.speed.y;
                    }
                    this.player.position.y -= vCoordinate.player.height;
                    this.player.moveY(this.scene.player, t);
                    this.player.moveX(this.scene.player, t);
                }
                this.player.position.y += vCoordinate.player.height;
            }
            if (this.map[this.stage + 1] && this.map[this.stage + 1].jump) {
                setTimeout(function () { that.move(vCoordinate.acc.time * 1.4) }, vCoordinate.acc.time + 10);
                return;
            } 
            setTimeout(function () { that.move(vCoordinate.acc.time) }, vCoordinate.acc.time + 10);
        } else {
            this.stop();
        }

    }

}
function scene(screen, background, player) {
    this.screen = screen.node;
    this.background = background.node;
    this.player = player.node;
    this.width = screen.node.offsetWidth;
    this.height = screen.node.offsetHeight;
    this.backWidth = background.node.scrollWidth;
    this.backHeight = background.node.scrollHeight;
    this.backLeft = background.x;
    this.backTop = background.y;
    this.playerLeft = player.x;
    this.playerTop = player.y - vCoordinate.player.height;
    this.speed = {
        x: 0,
        y: 0,
    };
    this.position = {
        x: background.x,
        y: background.y
    };
    this.moveAble = true;
    this.init();
}
scene.prototype = {
    init: function () {
        this.player.style.left = this.playerLeft + "px";
        this.player.style.top = this.playerTop + "px";
        this.background.style.left = this.backLeft + "px";
        this.background.style.top = this.backTop + "px";
        this.moveAble = true;
        this.position = {
            x: this.backLeft,
            y: this.backTop,
        }
    },
    move: function (time) {
        // this.position.x+=this.speed.x;
        // if(Math.abs(this.position.x-this.width)>=Math.abs(this.backWidth)){				
        // 	this.position.x=this.width-this.backWidth;
        // 	this.moveAble=false;	
        // }
        //this.background.style.left = this.position.x + "px";
        var t = 120;
        if (time) {
            t = time;
        }
        $(this.background).animate({ left: this.position.x + "px" }, t);
    }
}
var coordinate = {
    map: [{ x: 110, y: 280 }, { x: 345, y: 280 }, { x: 370, y: 290 }, { x: 370, y: 303 }, { x: 380, y: 310 }, { x: 470, y: 310 }, { x: 480, y: 300 }, { x: 480, y: 290 }, { x: 495, y: 280 }, { x: 515, y: 280 }, { x: 530, y: 265 }, { x: 530, y: 215 }, { x: 565, y: 140, jump: true }, { x: 600, y: 205, jump: true },
    { x: 1040, y: 205 }, { x: 1055, y: 220 }, { x: 1055, y: 245 }, { x: 1070, y: 258 }, { x: 1175, y: 258 }, { x: 1185, y: 270 }, { x: 1185, y: 295 }, { x: 1240, y: 230, jump: true }, { x: 1285, y: 310, jump: true }, { x: 1315, y: 310 }, { x: 1330, y: 295 }, { x: 1330, y: 150 }, { x: 1345, y: 140 }, { x: 1385, y: 55, jump: true }, { x: 1420, y: 140, jump: true },
    { x: 1510, y: 140 }, { x: 1520, y: 150 }, { x: 1520, y: 245 }, { x: 1540, y: 260 }, { x: 1730, y: 260 }, { x: 1740, y: 270 }, { x: 1740, y: 300 }, { x: 1755, y: 310 }, { x: 1785, y: 235, jump: true }, { x: 1830, y: 310, jump: true }, { x: 1845, y: 295 }, { x: 1845, y: 250 }, { x: 1865, y: 235 }, { x: 2015, y: 235 }, { x: 2045, y: 150, jump: true }, { x: 2070, y: 235, jump: true }, { x: 2080, y: 220 }, { x: 2080, y: 220 }, { x: 2080, y: 200 }, { x: 2095, y: 185 }, { x: 2150, y: 185 }, { x: 2175, y: 220 }, { x: 2305, y: 220 }, { x: 2315, y: 235 }, { x: 2315, y: 270 }, { x: 2330, y: 280 }, { x: 2485, y: 280 }, { x: 2510, y: 315 }, { x: 2530, y: 315 }, { x: 2580, y: 220, jump: true }, { x: 2600, y: 315, jump: true }, { x: 2630, y: 280 }, { x: 2655, y: 280 }, { x: 2655, y: 280 }, { x: 2665, y: 265 }, { x: 2665, y: 215 }, { x: 2680, y: 205 }, { x: 3005, y: 205 },{ x: 3005, y: 205 }],
    end: [{ x: 3135, y: 128 }, { x: 3195, y: 275 }],
    player: {
        x: 110,
        y: 280,
        height: 67,
        width: 25,
        sWidth: 50,
        runImage: 'img/human.gif',
        stopImage: "img/human.gif",
        time:120
    },
    image: {
        height: 400,
        width: 711
    },
    acc: {
        speed: -10,
        acceleration: -25,
        height: 50,
        width: 50,
        time: 120
    },
    timer: {
        height: 40,
        width: 100,
        fontSize: 45
    },

    scale: 1
}
var vCoordinate = {
    map: [],
    player: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        runImage: 'human.gif',
        stopImage: "human.gif"
    },
    acc: {

    },
    timer: {

    }
}
var gameSceneNode = {
    // display: document.getElementById("runinggame"),
    // background: document.getElementById("background"),
    // role: document.getElementById("role"),
    // timer: document.getElementById("timer"),
    // button: document.getElementById("button"),
    // loading: document.getElementById("Loading")
}
var assertStatus = [false, false, false, false, false];
var listenLoading = function (i) {
    assertStatus[i] = true;
    console.log("assert " + i + " was loaded");
}
var getScale = function () {
    coordinate.scale = gameSceneNode.background.offsetHeight / coordinate.image.height;
}
var changeCoordinate = function (i) {
    return i * coordinate.scale;
}
var getMap = function () {
    var map = []
    var cMap = coordinate.map;
    for (var i = 0; i < cMap.length; i++) {
        map.push({ x: changeCoordinate(cMap[i].x), y: changeCoordinate(cMap[i].y) });
        if (cMap[i].jump) {
            map[i].jump = true;
        }
    }
    return map;
}
var getEnd = function () {
    var end = []
    var cEnd = coordinate.end;
    for (var i = 0; i < cEnd.length; i++) {
        end.push({ x: changeCoordinate(cEnd[i].x), y: changeCoordinate(cEnd[i].y) });
    }
    return end;
}
var getPlayer = function () {
    var player = {};
    var cPlayer = coordinate.player;
    player.x = changeCoordinate(cPlayer.x);
    player.y = changeCoordinate(cPlayer.y);
    player.height = changeCoordinate(cPlayer.height);
    player.width = changeCoordinate(cPlayer.width);
    player.sWidth = changeCoordinate(cPlayer.sWidth);
    player.runImage = cPlayer.runImage;
    player.stopImage = cPlayer.stopImage;
    return player;
}
var getAcc = function () {
    var acc = {};
    var cAcc = coordinate.acc;
    acc.speed = changeCoordinate(cAcc.speed);
    acc.acceleration = changeCoordinate(cAcc.acceleration);
    acc.time = cAcc.time;
    acc.height = changeCoordinate(cAcc.height);
    acc.width = changeCoordinate(cAcc.width);
    return acc;
}
var getTimer = function () {
    var timer = {};
    var cTimer = coordinate.timer;
    timer.fontSize = changeCoordinate(cTimer.fontSize);
    timer.height = changeCoordinate(cTimer.height);
    timer.width = changeCoordinate(cTimer.width);
    return timer;
}

var initGameSceneNode = function () {
    var clientHeight = window.innerHeight;//document.documentElement.clientHeight;
    var clientWidth = window.innerWidth;//document.documentElement.clientWidth;
    gameSceneNode.display.style.height = clientHeight + "px";
    gameSceneNode.display.style.width = clientWidth + "px"
    document.body.style.overflow = "hidden";
    getScale();
    vCoordinate.map = getMap();
    vCoordinate.player = getPlayer();
    vCoordinate.acc = getAcc();
    vCoordinate.timer = getTimer();
    vCoordinate.end = getEnd();
    gameSceneNode.role.style.height = vCoordinate.player.height + "px";
    gameSceneNode.role.style.width = "auto";
    gameSceneNode.button.style.height = vCoordinate.acc.height * 2 + "px";
    gameSceneNode.button.style.width = vCoordinate.acc.width * 2 + "px";
    gameSceneNode.button.style.right = 0 + "px";
    gameSceneNode.button.style.bottom = changeCoordinate(30) + "px";
    //gameSceneNode.background.style.width=changeCoordinate(coordinate.image.width)*5+"px";
    gameSceneNode.background.style.width = Math.ceil(gameSceneNode.background.children[0].offsetWidth * 5 + 1) + "px";
    gameSceneNode.timer.style.height = vCoordinate.timer.height + "px"
    //gameSceneNode.timer.style.width=vCoordinate.timer.width+"px";
    gameSceneNode.timer.style.fontSize = vCoordinate.timer.fontSize / 1.5 + "px";
    gameSceneNode.timer.style.right = 50 / 2 + "px";
    gameSceneNode.timer.style.top = changeCoordinate(50) / 3 + "px";
    //gameSceneNode.loading.
}
var bindMove = function () {
    gameSceneNode.button.ontouchstart = function (e) {
        if (c.time == 0) {
            c.start();
            c.move();
        }
        c.scene.player.src = vCoordinate.player.runImage;
        clearTimeout(c.timer);
        c.speedup(c.acceleration);
        e.preventDefault();
        e.stopPropagation();
    };
    gameSceneNode.button.onclick = function (e) {
        if (c.time == 0) {
            c.start();
            c.move();
        }
        c.scene.player.src = vCoordinate.player.runImage;
        clearTimeout(c.timer);
        c.speedup(c.acceleration);
        e.preventDefault();
        e.stopPropagation();
    };
}
var unBindMove = function () {
    gameSceneNode.button.ontouchstart = null;
    gameSceneNode.button.onclick = null
}



window.onload = function () {
    gameSceneNode = {
        display: document.getElementById("runinggame"),
        background: document.getElementById("background"),
        role: document.getElementById("role"),
        timer: document.getElementById("timer"),
        button: document.getElementById("button"),
        loading: document.getElementById("Loading")
    }
    initGameSceneNode();
    var assertObserver = setInterval(function () {
        for (var l = 0; l < assertStatus.length; l++) {
            if (assertStatus[l] == false) {
                return;
            }
        }
        gameSceneNode.loading.style.display = "none";
        clearInterval(assertObserver);
    }, 50);
    var p = new player(vCoordinate.player.x, vCoordinate.player.y, gameSceneNode.display.offsetWidth - 100, vCoordinate.map);
    var s = new scene({ node: gameSceneNode.display, x: 0, y: 0 }, { node: gameSceneNode.background, x: 0, y: 0 }, { node: gameSceneNode.role, x: vCoordinate.player.x, y: vCoordinate.player.y });
    window.c = new controller(vCoordinate.acc.speed, vCoordinate.acc.acceleration, s, p, vCoordinate.map, function () { $(".mask").css("display", "block"); $("#Popup1").css("display", "block"); $("#Popup1 span").html((c.time / 1000).toFixed(1)); time = (c.time / 1000).toFixed(1); });

    c.init();
    gameSceneNode.button.onclick = function (e) {
        if (c.time == 0) {
            c.start();
            c.move();
        }
        c.scene.player.src = vCoordinate.player.runImage;
        clearTimeout(c.timer);
        c.speedup(c.acceleration);
        e.preventDefault();
        e.stopPropagation();
    }
    gameSceneNode.button.ontouchstart = function (e) {
        //c.move();
        if (c.time == 0) {
            c.start();
            c.move();
        }
        c.scene.player.src = vCoordinate.player.runImage;
        clearTimeout(c.timer);
        c.speedup(c.acceleration);
        e.preventDefault();
        e.stopPropagation();
    }
    try {
        gameSceneNode.button.addEventListener("touchstart", function (e) { e.preventDefault(); }, false);
    } catch (e) {

    }


}