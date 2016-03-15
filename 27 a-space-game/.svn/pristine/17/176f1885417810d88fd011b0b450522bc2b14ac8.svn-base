Planet.prototype = new Entity();
Planet.prototype.constructor = Planet;

function Planet() {
    this.gameScreen;
    this.imageIndex;
    this.player = null;
    this.unitCount;
    this.capacity;
    this.lastUnitIncrease = 0;
    this.lastSpaceshipsGenerated = 0;
    var INCREASE_RATE = 1000;

    this.Update = function (time) {
        var diffTime = time - this.lastUnitIncrease;
        if (diffTime > INCREASE_RATE) {
            if (this.player != null
                && this.unitCount < this.capacity
                ) {
                this.unitCount++;
            }
            this.lastUnitIncrease = time;
        }
    }

    this.Draw = function () {
        // draw planet
        var planetRadius = this.sizeX / 2;
        var texture;
        if (this.imageIndex == 1)
            texture = this.gameScreen.planetImage1;
        else if (this.imageIndex == 2)
            texture = this.gameScreen.planetImage2;
        else if (this.imageIndex == 3)
            texture = this.gameScreen.planetImage3;
        else
            texture = this.gameScreen.planetImage4;
        ctx.drawImage(texture, this.posX, this.posY, this.sizeX, this.sizeX);


        // draw occupation circle
        if (this.player != null) {
            var percentageOccupied = (this.unitCount / this.capacity);
            var radius = ((planetRadius - (planetRadius / 2)) * percentageOccupied) + (planetRadius / 2);
            radius = Math.min(radius, planetRadius);
            ctx.beginPath();
            ctx.arc(this.posX + planetRadius, this.posY + planetRadius, radius, 0, Math.PI * 2, true);
            ctx.fillStyle = this.player.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.closePath();
        }

        // draw occupation number
        ctx.textAlign = 'center';
        ctx.font = 'bold 15px Kelly Slab';

        ctx.fillStyle = '#000';
        ctx.fillText(this.unitCount, this.posX + this.sizeX / 2 + 1, this.posY + this.sizeY / 2 + 4);
        ctx.fillText(this.unitCount, this.posX + this.sizeX / 2 - 1, this.posY + this.sizeY / 2 + 4);
        ctx.fillText(this.unitCount, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 4 + 1);
        ctx.fillText(this.unitCount, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 4 - 1);

        ctx.fillStyle = '#eee';
        ctx.fillText(this.unitCount, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 4);

//        ctx.textAlign = 'center';
//        ctx.font = '15px Kelly Slab';
//        ctx.fillStyle = '#ff00ff';
//        ctx.fillText(this.debug, this.posX + this.sizeX / 2 + 1, this.posY + this.sizeY / 2 + 70);
    }

    this.Clone = function () {
        var p = new Planet();
        p.posX = this.posX;
        p.posY = this.posY;
        p.sizeX = this.sizeX;
        p.sizeY = this.sizeY;
        p.velX = this.velX; // velocity
        p.velY = this.velY;
        p.gameScreen = this.gameScreen;
        p.imageIndex = this.imageIndex;
        p.player = this.player;
        p.unitCount = this.unitCount;
        p.capacity = this.capacity;
        p.lastUnitIncrease = this.lastUnitIncrease;
        return p;
    }


}

function generatePlanet(gameScreen, planetSize, posX, posY) {
    var p = new Planet();
    p.gameScreen = gameScreen;
    if (planetSize == null)
        planetSize = randomFromTo(1, 4);
    p.sizeX = 25 * planetSize;
    p.sizeY = p.sizeX;
    p.capacity = p.sizeX;
    p.unitCount = Math.round(p.capacity / 2);

    if (posX != null) {
        p.posX = posX;
        p.posY = posY;
    }
    else {
        var collision = true;
        while (collision) {
            p.posX = randomFromTo(50, canvasSizeX - p.sizeX - 50);
            p.posY = randomFromTo(50, canvasSizeY - p.sizeX - 50);

            var loopIndex = gameScreen.planets.length;
            collision = false;
            while (loopIndex--) {
                var p2 = gameScreen.planets[loopIndex];
                if (p.CollidesWith(p2)) {
                    collision = true;
                    break;
                }
            }
        }
    }

    p.imageIndex = randomFromTo(1, 4);
    
    return p;
}
