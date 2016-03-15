StartScreen.prototype = new Screen();
StartScreen.prototype.constructor = StartScreen;

function StartScreen() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'images/background2.png';

    this.Draw = function () {
        ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
        ctx.drawImage(this.backgroundImage, 0, 0);

        ctx.fillStyle = "#fff";
        ctx.font = "70px Maven Pro";
        ctx.textAlign = 'center';
        ctx.fillText("A Space Game", canvasSizeX / 2, 100);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 460, canvasSizeX, 60);
        ctx.closePath();

        ctx.fillStyle = "#ddd";
        ctx.font = "30px Maven Pro";
        ctx.textAlign = 'center';
        ctx.fillText("click to begin", canvasSizeX / 2, 500);
    }

    this.onMouseUp = function (evt) {
        loadScreen(new LevelSelectScreen(), true);
    }
}

LevelSelectScreen.prototype = new Screen();
LevelSelectScreen.prototype.constructor = LevelSelectScreen;

function LevelSelectScreen() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'images/background2.png';
    this.Elements = new Array();
    var self = this;

    this.Init = function () {
        for (i in levelsJson) {
            var btn = new Button();
            btn.sizeX = 50;
            btn.sizeY = 50;
            btn.posX = 150 + ((i / 5) - parseInt(i / 5)) * 800;
            btn.posY = 150 + parseInt(i / 5) * 100;
            btn.text = levelsJson[i].level;
            btn.level = levelsJson[i].level;
            btn.clickCallback = this.loadLevel;
            this.Elements.push(btn);
        }
    }

    this.Draw = function () {
        ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
        ctx.drawImage(this.backgroundImage, 0, 0);

        ctx.fillStyle = "#fff";
        ctx.font = "70px Maven Pro";
        ctx.textAlign = 'center';
        ctx.fillText("A Space Game", canvasSizeX / 2, 100);

        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].Draw();
        }


        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 460, canvasSizeX, 60);
        ctx.closePath();

        ctx.fillStyle = "#ddd";
        ctx.font = "30px Maven Pro";
        ctx.textAlign = 'center';
        ctx.fillText("choose a level", canvasSizeX / 2, 500);
    }

    this.onMouseMove = function (evt) {
        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].onMouseMove(evt);
        }
    }

    this.onMouseUp = function (evt) {
        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].onMouseUp(evt);
        }
    }

    this.onKeyUp = function (evt) {
        if (evt.keyCode == 27) { // esc
            loadScreen(new StartScreen(), true);
        }
    }

    this.loadLevel = function (level) {
        loadScreen(new GameScreen(this.level), true);
    }


}


PauseScreen.prototype = new Screen();
PauseScreen.prototype.constructor = PauseScreen;

function PauseScreen() {
    var self = this;
    this.gameScreen = null;
    this.Elements = new Array();

    this.Init = function () {
        var btnResume = new Button();
        btnResume.sizeX = 200;
        btnResume.posX = canvasSizeX / 2 - btnResume.sizeX / 2;
        btnResume.posY = 200;
        btnResume.text = 'Resume';
        // http://stackoverflow.com/questions/183214/javascript-callback-scope
        btnResume.clickCallback = function () { self.ResumeGame() };
        this.Elements.push(btnResume);

        var btnRestart = new Button();
        btnRestart.sizeX = 200;
        btnRestart.posX = canvasSizeX / 2 - btnResume.sizeX / 2;
        btnRestart.posY = 275;
        btnRestart.text = 'Restart';
        btnRestart.clickCallback = function () { self.RestartLevel() };
        this.Elements.push(btnRestart);

        var btnMainMenu = new Button();
        btnMainMenu.sizeX = 200;
        btnMainMenu.posX = canvasSizeX / 2 - btnMainMenu.sizeX / 2;
        btnMainMenu.posY = 350;
        btnMainMenu.text = 'Main Menu';
        btnMainMenu.clickCallback = function () { self.MainMenu() };
        this.Elements.push(btnMainMenu);

    }

    this.Update = function () {
        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].Update();
        }
    }

    this.Draw = function () {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvasSizeX, canvasSizeY);
        ctx.closePath();


        ctx.fillStyle = "#fff";
        ctx.font = "70px Maven Pro";
        ctx.textAlign = 'center';
        ctx.fillText("Game Paused", canvasSizeX / 2, 100);

        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].Draw();
        }
    }

    this.onMouseMove = function (evt) {
        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].onMouseMove(evt);
        }
    }

    this.onMouseUp = function (evt) {
        for (var i = 0; i < this.Elements.length; i++) {
            this.Elements[i].onMouseUp(evt);
        }
    }

    this.onKeyUp = function (evt) {
        if (evt.keyCode == 27) { // esc
            this.ResumeGame();
        }
    }

    this.ResumeGame = function () {
        this.gameScreen.paused = false;
        unloadScreen(this);
    }

    this.RestartLevel = function () {
        this.gameScreen.RestartLevel();
        unloadScreen(this);
    }

    this.MainMenu = function () {
        loadScreen(new LevelSelectScreen(), true);
    }
}

