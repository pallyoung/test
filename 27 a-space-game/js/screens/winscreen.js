
WinScreen.prototype = new Screen();
WinScreen.prototype.constructor = WinScreen;

function WinScreen() {
    var self = this;
    this.gameScreen = null;
    this.Elements = new Array();

    this.Init = function () {
        var btnContinue = new Button();
        btnContinue.sizeX = 200;
        btnContinue.posX = canvasSizeX / 2 - btnContinue.sizeX / 2 - 125;
        btnContinue.posY = 350;
        btnContinue.text = 'Next Level';
        btnContinue.clickCallback = function () { self.NextLevel(); };
        this.Elements.push(btnContinue);

        var btnMainMenu = new Button();
        btnMainMenu.sizeX = 200;
        btnMainMenu.posX = canvasSizeX / 2 - btnMainMenu.sizeX / 2 + 125;
        btnMainMenu.posY = 350;
        btnMainMenu.text = 'Main Menu';
        btnMainMenu.clickCallback = function () { self.MainMenu(); };
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
        ctx.fillText("You Win!", canvasSizeX / 2, 100);

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

    this.NextLevel = function () {
        var newLevel = self.gameScreen.currentLevel + 1;
        loadScreen(new GameScreen(newLevel), true);
    }

    this.MainMenu = function () {
        loadScreen(new LevelSelectScreen(), true);
    }
}

