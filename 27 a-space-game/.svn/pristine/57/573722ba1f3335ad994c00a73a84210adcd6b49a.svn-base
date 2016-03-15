//function SpaceShipGroup() {
//    this.spaceships = new Array();
//}

SpaceShip.prototype = new Entity();
SpaceShip.prototype.constructor = SpaceShip;

function SpaceShip() {
    this.gameScreen;
    this.player;
    this.unitCount = 1;
    this.startPlanet;
    this.targetPlanet;
    this.spaceshipGroup;
    this.isSpawned = false;

    this.Update = function (time) {
        if (!this.isSpawned) return;
        var flockSettings = {
            alignmentPriority: 2,
            cohesionPriority: 1,
            maxRotation: 30 * Math.PI / 180,
            rotationSpeed: 0.2,
            separationDistance: 20,
            separationPriority: 3,
            targetPriority: 5,
            visualField: Math.PI * 270 / 180,
            visualRange: 50
        };

        var flockingController = new FlockingController(flockSettings);
        flockingController.UpdateFlocking(this, this.spaceshipGroup);

        if (this.CollidesWith(this.targetPlanet)) {
            if (this.targetPlanet.player != this.player) {
                if (this.targetPlanet.unitCount < this.unitCount) {
                    this.targetPlanet.player = this.player;
                }
                this.targetPlanet.unitCount = Math.abs(this.unitCount - this.targetPlanet.unitCount);
            }
            else {
                this.targetPlanet.unitCount += this.unitCount;
            }

            // remove spaceship
            var index = this.spaceshipGroup.indexOf(this);
            this.spaceshipGroup.splice(index, 1);
        }


    }

    this.Draw = function () {
        if (!this.isSpawned) return;
        var destDir = Math.atan2((this.targetY - this.posY), (this.targetX - this.posX));

        ctx.save();
        ctx.translate(this.posX, this.posY);
        ctx.rotate((this.direction + destDir) / 2);
        
        // if we are pointing the wrong way because of wrap around issues with our avg, correct
        if (Math.abs(this.direction - destDir) > Math.PI) {
            ctx.rotate(Math.PI);
        }
        
        // rotate to orient the way we are drawing the ship
        ctx.rotate(Math.PI / 2);

        ctx.beginPath();
        var newX = 0 - (this.sizeX / 2);
        var newY = 0 - (this.sizeY / 2);

        ctx.fillStyle = this.player.color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.moveTo(newX, newY);
        ctx.lineTo(newX + 6, newY + 21);
        ctx.lineTo(newX, newY + 16);
        ctx.lineTo(newX - 6, newY + 21);
        ctx.lineTo(newX, newY);

        ctx.fill();
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.closePath();

        ctx.restore();
    }
}

function spawnSpaceshipGroup(gameScreen, startPlanet, targetPlanet, player) {
    if (startPlanet.player != player)
        return null;
    var sgUnitCount = Math.round(startPlanet.unitCount / 2);
    var newUnitCount = startPlanet.unitCount - sgUnitCount;
    if (sgUnitCount <= 0 || newUnitCount <= 0)
        return null;
    var extraUnits = 0;
    if (sgUnitCount > 100) {
        extraUnits = sgUnitCount - 100;
        sgUnitCount = 100;
    }
    var sg = new Array();
    for (var i = 0; i < sgUnitCount; i++) {
        var s = new SpaceShip();
        s.spaceshipGroup = sg;
        s.gameScreen = gameScreen;
        s.player = player;
        s.startPlanet = startPlanet;
        s.targetPlanet = targetPlanet;
        s.targetX = targetPlanet.posX + targetPlanet.sizeX / 2;
        s.targetY = targetPlanet.posY + targetPlanet.sizeY / 2;
        s.sizeX = 10;
        s.sizeY = 10;
        s.speed = 5;
        s.posX = (startPlanet.posX + startPlanet.sizeX / 2) + Math.random();
        s.posY = (startPlanet.posY + startPlanet.sizeY / 2) + Math.random();
        s.direction = Math.atan2((s.targetY - s.posY), (s.targetX - s.posX));
        s.velX = 50;
        s.velY = 1;
        if (i == sgUnitCount - 1) {
            s.unitCount += extraUnits;
        }
        sg.push(s);
    }

    return sg;
}
