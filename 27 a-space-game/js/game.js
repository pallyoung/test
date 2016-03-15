var canvas;
var ctx;
var canvasPosX;
var canvasPosY;
var canvasSizeX = 1000;
var canvasSizeY = 600;
var MB_lastTime = 0;
var frameCount = 0;
var fps = 0;
var currentScreenStack = new Array();

$(document).ready(function () {
    //get a reference to the canvas
    canvas = $('#canvas');
    ctx = canvas[0].getContext("2d");
    canvasPosX = canvas.offset().left;
    canvasPosY = canvas.offset().top;


    loadScreen(new StartScreen(), true);
    $('body').mousemove(onMouseMove);
    $('body').mousedown(onMouseDown);
    $('body').mouseup(onMouseUp);
    $('body').dblclick(onDblClick);
    //canvas.mouseout(onMouseUp);
    $('body').keyup(onKeyUp);

    gameLoop();
});

function gameLoop() {
    var newTime = +(new Date());
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].Update(newTime);
        currentScreenStack[i].Draw(newTime);
    }
    setTimeout(gameLoop, 50);
}

function onMouseDown(evt) {
    canvasPosX = canvas.offset().left;
    canvasPosY = canvas.offset().top;
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].onMouseDown(evt);
    }
}

function onMouseUp(evt) {
    canvasPosX = canvas.offset().left;
    canvasPosY = canvas.offset().top;
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].onMouseUp(evt);
    }
}

function onMouseMove(evt) {
    canvasPosX = canvas.offset().left;
    canvasPosY = canvas.offset().top;
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].onMouseMove(evt);
    }
}

function onDblClick(evt) {
    canvasPosX = canvas.offset().left;
    canvasPosY = canvas.offset().top;
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].onDblClick(evt);
    }
}

function onKeyUp(evt) {
    var count = currentScreenStack.length;
    for (var i = 0; i < count; i++) {
        currentScreenStack[i].onKeyUp(evt);
    }
}

function loadScreen(screen, clear) {
    if (clear)
        currentScreenStack = new Array();
    currentScreenStack.push(screen);
    screen.Init();
}

function unloadScreen(screen) {
    for (var i = 0; i < currentScreenStack.length; i++) {
        if (currentScreenStack[i] == screen)
            currentScreenStack.splice(i, 1);
    }
}

