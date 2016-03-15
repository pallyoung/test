GameScreen.prototype = new Screen();
GameScreen.prototype.constructor = GameScreen;

function GameScreen(level) {
    this.players = new Array();
    this.startPlanets = new Array();
    this.planets = new Array();
    this.spaceshipGroups = new Array();
    this.miscEntities = new Array();
    this.currentLevel;
    this.paused = false;
    this.backgroundImage = new Image();
    this.planetImage1 = new Image();
    this.planetImage2 = new Image();
    this.planetImage3 = new Image();
    this.planetImage4 = new Image();
    this.shipImage = new Image();
    this.aiSkill;

    this.Init = function () {
        this.loadLevel(level);
    }

    this.loadLevel = function (level) {
        this.currentLevel = level;
        this.players = new Array();
        this.planets = new Array();
        this.startPlanets = new Array();
        this.spaceshipGroups = new Array();
        this.miscEntities = new Array();
        var levelIndex = level - 1;
        if (levelsJson[levelIndex] == null) return;
        this.backgroundImage.src = 'images/background4.png?v2';
        this.planetImage1.src = 'images/planet01.png';
        this.planetImage2.src = 'images/planet02.png';
        this.planetImage3.src = 'images/planet03.png';
        this.planetImage4.src = 'images/planet04.png';
        this.shipImage.src = 'images/ship.png?v2';

        var aiCount = levelsJson[levelIndex].aiCount;
        this.aiSkill = levelsJson[levelIndex].aiSkill;
        var loopIndex = 0;
        var humanPlayer = new HumanPlayer();
        humanPlayer.gameScreen = this;
        humanPlayer.name = 'Blue';
        humanPlayer.color = 'rgb(0,0,255)';
        this.players.push(humanPlayer);

        while (loopIndex++ < aiCount) {
            var p = new AIPlayer;
            p.gameScreen = this;
            p.name = aiPlayersJson[loopIndex - 1].name;
            p.color = aiPlayersJson[loopIndex - 1].color;
            this.players.push(p);
        }

        // create defined planets
        var planetsJson = levelsJson[levelIndex].planets;
        var playerIndex = 0;
        if (planetsJson) {
            var loopIndex = 0;
            while (loopIndex < planetsJson.length) {
                var p = generatePlanet(this, planetsJson[loopIndex].size, planetsJson[loopIndex].posX, planetsJson[loopIndex].posY);
                if (planetsJson[loopIndex].occupied)
                    p.player = this.players[playerIndex++];
                else
                    p.player = null;
                this.planets.push(p);
                loopIndex++;
            }
        }

        // create random occupied planets
        while (playerIndex < this.players.length) {
            var p = generatePlanet(this, 2);
            p.player = this.players[playerIndex++];
            this.planets.push(p);
        }


        // create random neutral planets
        while (levelsJson[levelIndex].randomPlanetCount > this.planets.length) {
            var p = generatePlanet(this);
            p.player = null;
            this.planets.push(p);
        }
        for (var i = 0; i < this.planets.length; i++) {
            this.startPlanets.push(this.planets[i].Clone());
        }

        var lblCurrentLevel = new Label();
        lblCurrentLevel.text = 'level ' + this.currentLevel;
        lblCurrentLevel.posX = 0;
        lblCurrentLevel.posY = 0;
        lblCurrentLevel.sizeX = 100;
        lblCurrentLevel.sizeY = 50;
        this.miscEntities.push(lblCurrentLevel);

    }

    this.Update = function (newTime) {
        if (!this.paused) {
            //try {
            for (var i = 0; i < this.planets.length; i++) {
                this.planets[i].Update(newTime);
            }

            // remove empty spaceshipGroups
            var i = this.spaceshipGroups.length;
            while (i--) {
                if (this.spaceshipGroups[i] && this.spaceshipGroups[i].length == 0) {
                    this.spaceshipGroups.splice(i, 1);
                }
            }

            for (sg in this.spaceshipGroups) {
                var shipGroup = this.spaceshipGroups[sg];
                for (s in shipGroup) {
                    var ship = shipGroup[s];
                    if (ship.player != ship.startPlanet.player) {
                        shipGroup.splice(s, 1);
                        break;
                    }
                    if (!ship.isSpawned) {
                        ship.isSpawned = true;
                        ship.startPlanet.unitCount -= ship.unitCount;
                        break;
                    }
                }
            }

            for (var i = 0; i < this.spaceshipGroups.length; i++) {
                if (this.spaceshipGroups[i])
                    for (var j = 0; j < this.spaceshipGroups[i].length; j++) {
                        this.spaceshipGroups[i][j].Update(newTime);
                    }
            }
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].Update(newTime);
            }
            for (var i = 0; i < this.miscEntities.length; i++) {
                this.miscEntities[i].Update(newTime);
            }
            //}
            //catch (err) {
            //}
        }
    }

    this.Draw = function (newTime) {
        //try {
            ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
            ctx.drawImage(this.backgroundImage, 0, 0);

            for (var i = 0; i < this.planets.length; i++) {
                this.planets[i].Draw();
            }
            for (var i = 0; i < this.spaceshipGroups.length; i++) {
                if (this.spaceshipGroups[i])
                    for (var j = 0; j < this.spaceshipGroups[i].length; j++) {
                        this.spaceshipGroups[i][j].Draw();
                    }
            }

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].Draw();
            }

            for (var i = 0; i < this.miscEntities.length; i++) {
                this.miscEntities[i].Draw();
            }
        //}
        //catch (err) {
        //}
    }

    this.onMouseDown = function (evt) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].onMouseDown(evt);
        }
    }

    this.onMouseUp = function (evt) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].onMouseUp(evt);
        }
    }

    this.onMouseMove = function (evt) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].onMouseMove(evt);
        }
    }

    this.onDblClick = function (evt) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].onDblClick(evt);
        }
    }

    this.onKeyUp = function (evt) {
        if (!this.paused) {
            if (evt.keyCode == 27) { // esc
                this.paused = true;
                var pauseScreen = new PauseScreen();
                pauseScreen.gameScreen = this;
                loadScreen(pauseScreen, false);
            }
        }
    }

    this.RestartLevel = function () {
        this.spaceshipGroups = new Array();
        this.planets = new Array();
        for (var i = 0; i < this.startPlanets.length; i++) {
            this.planets.push(this.startPlanets[i].Clone());
        }
        this.paused = false;
    }
}

