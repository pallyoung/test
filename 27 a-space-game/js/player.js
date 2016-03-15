function Player() {
    this.gameScreen;
    this.name;
    this.color;

    this.Update = function (time) { };
    this.Draw = function () { };
    this.onMouseDown = function (evt) { }
    this.onMouseUp = function (evt) { }
    this.onMouseMove = function (evt) { }
    this.onDblClick = function (evt) { }
}

HumanPlayer.prototype = new Player();
HumanPlayer.prototype.constructor = HumanPlayer;

function HumanPlayer() {
    var mouseDownX;
    var mouseDownY;
    var mouseCurrentX;
    var mouseCurrentY;
    var selectedPlanets = new Array();
    var winloseDelay = 0;

    this.Update = function (time) {
        var iAmStillAlive = false;
        for (i in this.gameScreen.planets) {
            var p = this.gameScreen.planets[i];
            if (p.player == this) {
                iAmStillAlive = true;
                break;
            }
        }

        if (!iAmStillAlive) {
            for (i in this.gameScreen.spaceshipGroups) {
                var sg = this.gameScreen.spaceshipGroups[i];
                if (sg && sg.length > 0 && sg[0].player == this) {
                    iAmStillAlive = true;
                    break;
                }
            }
        }

        if (!iAmStillAlive) {
            if (winloseDelay == 0)
                winloseDelay = time + 2000;
            else if (time >= winloseDelay) {
                this.gameScreen.paused = true;
                var loseScreen = new LoseScreen();
                loseScreen.gameScreen = this.gameScreen;
                loadScreen(loseScreen, false);
            }
            return;
        }

        var enemyStillAlive = false;
        for (i in this.gameScreen.planets) {
            var p = this.gameScreen.planets[i];
            if (p.player != null && p.player != this) {
                enemyStillAlive = true;
                break;
            }
        }

        if (!enemyStillAlive) {
            for (i in this.gameScreen.spaceshipGroups) {
                var sg = this.gameScreen.spaceshipGroups[i];
                if (sg && sg.length > 0 && sg[0].player != this) {
                    enemyStillAlive = true;
                    break;
                }
            }
        }

        if (!enemyStillAlive) {
            if (winloseDelay == 0)
                winloseDelay = time + 2000;
            else if (time >= winloseDelay) {
                this.gameScreen.paused = true;
                var winScreen = new WinScreen();
                winScreen.gameScreen = this.gameScreen;
                loadScreen(winScreen, false);
            }
            return;
        }

    };

    this.Draw = function () {
        // draw selection circles
        if (selectedPlanets.length > 0) {
            var strokeStyle = '#00bb00';
            var hoverPlanet;
            for (var i = 0; i < this.gameScreen.planets.length; i++) {
                var p = this.gameScreen.planets[i];
                if (p.CollidesWithPixel(mouseCurrentX, mouseCurrentY)) {
                    hoverPlanet = p;
                    break;
                }
            }

            for (var i = 0; i < selectedPlanets.length; i++) {
                var p = selectedPlanets[i];
                var sourceDrawRadius = p.sizeX / 2 + 4;
                var sourceX = p.posX + p.sizeX / 2;
                var sourceY = p.posY + p.sizeY / 2;
                if (hoverPlanet) {
                    var destDrawRadius = hoverPlanet.sizeX / 2 + 4;
                    var destX = hoverPlanet.posX + hoverPlanet.sizeX / 2;
                    var destY = hoverPlanet.posY + hoverPlanet.sizeY / 2;
                    var sourceDir = Math.atan2((destY - sourceY), (destX - sourceX));
                    var destDir = Math.atan2((sourceY - destY), (sourceX - destX));

                    if (hoverPlanet.player != this) strokeStyle = '#bb0000';

                    ctx.beginPath();
                    ctx.arc(sourceX, sourceY, sourceDrawRadius, destDir - Math.PI + 2 * Math.PI, destDir - Math.PI, true);
                    ctx.arc(destX, destY, destDrawRadius, sourceDir - Math.PI + 2 * Math.PI, sourceDir - Math.PI, true);
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                    ctx.closePath();
                }
                else {
                    ctx.beginPath();
                    ctx.arc(sourceX, sourceY, sourceDrawRadius, 0, Math.PI * 2, true);
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }



        // draw selection rectangle
        if (mouseDownX) {
            ctx.beginPath();
            ctx.rect(mouseDownX, mouseDownY, mouseCurrentX - mouseDownX, mouseCurrentY - mouseDownY);
            ctx.fillStyle = "rgba(143,187,233,0.3)";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(143,187,233,1)";
            ctx.stroke();
            ctx.closePath();
        }


    }

    this.onMouseDown = function (evt) {
        mouseDownX = evt.pageX - canvasPosX;
        mouseDownY = evt.pageY - canvasPosY;
    }

    this.onMouseMove = function (evt) {
        mouseCurrentX = evt.pageX - canvasPosX;
        mouseCurrentY = evt.pageY - canvasPosY;
    }

    this.onMouseUp = function (evt) {
        // yucky method should be refactored
        var box = new Entity();
        box.posX = Math.min(mouseDownX, mouseCurrentX);
        box.posY = Math.min(mouseDownY, mouseCurrentY);
        box.sizeX = Math.abs(mouseCurrentX - mouseDownX);
        box.sizeY = Math.abs(mouseCurrentY - mouseDownY);
        mouseDownX = null;
        mouseDownY = null;

        // if some planets were already selected
        if (selectedPlanets.length > 0) {
            // find the planet we just clicked on
            var clickedPlanet;
            for (var i = 0; i < this.gameScreen.planets.length; i++) {
                var p = this.gameScreen.planets[i];
                if (p.CollidesWithPixel(mouseCurrentX, mouseCurrentY)) {
                    clickedPlanet = p;
                    break;
                }
            }

            if (clickedPlanet == null) {
                this.deselectAllPlanets();
            }
            else {
                // spawn spaceships
                for (var i = 0; i < selectedPlanets.length; i++) {
                    var selectedPlanet = selectedPlanets[i];
                    if (selectedPlanet == clickedPlanet) continue;
                    var sg = spawnSpaceshipGroup(this.gameScreen, selectedPlanet, clickedPlanet, this);
                    if (sg) {
                        this.gameScreen.spaceshipGroups.push(sg);
                    }
                }
                this.deselectAllPlanets();
                return;
            }
        }


        // select planets
        for (var i = 0; i < this.gameScreen.planets.length; i++) {
            var p = this.gameScreen.planets[i];
            if (p.player == this && p.CollidesWith(box)) {
                selectedPlanets.push(p);
            }
        }
    }

    this.onDblClick = function (evt) {
        // find the planet we just clicked on
        var clickedPlanet;
        for (var i = 0; i < this.gameScreen.planets.length; i++) {
            var p = this.gameScreen.planets[i];
            if (p.player == this && p.CollidesWithPixel(mouseCurrentX, mouseCurrentY)) {
                clickedPlanet = p;
                break;
            }
        }

        if (clickedPlanet != null) {
            // select all planets
            this.deselectAllPlanets();
            for (var i = 0; i < this.gameScreen.planets.length; i++) {
                var p = this.gameScreen.planets[i];
                if (p.player == this) {
                    selectedPlanets.push(p);
                }
            }
        }
    }

    this.deselectAllPlanets = function () {
        selectedPlanets = new Array();
    }

    


}


