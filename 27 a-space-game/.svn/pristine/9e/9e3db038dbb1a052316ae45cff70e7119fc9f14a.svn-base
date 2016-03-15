
LoseScreen.prototype = new Screen();
LoseScreen.prototype.constructor = LoseScreen;

function LoseScreen() {
    var self = this;
    this.gameScreen = null;
    this.Elements = new Array();

    this.Init = function () {
        var btnRetry = new Button();
        btnRetry.sizeX = 200;
        btnRetry.posX = canvasSizeX / 2 - btnRetry.sizeX / 2 - 125;
        btnRetry.posY = 350;
        btnRetry.text = 'Retry Level';
        btnRetry.clickCallback = function () { self.RetryLevel(); };
        this.Elements.push(btnRetry);

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
        ctx.fillText("You Lose", canvasSizeX / 2, 100);

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

    this.RetryLevel = function () {
        self.gameScreen.RestartLevel();
        unloadScreen(this);
    }

    this.MainMenu = function () {
        loadScreen(new LevelSelectScreen(), true);
    }
}

