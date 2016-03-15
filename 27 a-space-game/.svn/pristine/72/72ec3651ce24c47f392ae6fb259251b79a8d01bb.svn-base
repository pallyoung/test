AIPlayer.prototype = new Player();
AIPlayer.prototype.constructor = AIPlayer;

function AIPlayer() {
    this.Update = function (time) {
        for (var i = 0; i < this.gameScreen.planets.length; i++) {
            var myPlanet = this.gameScreen.planets[i];
            if (myPlanet.player == this && (time - myPlanet.lastSpaceshipsGenerated) > 1000) {
                var enemyPlanets = Array();
                for (var j = 0; j < this.gameScreen.planets.length; j++) {
                    var enemyPlanet = this.gameScreen.planets[j];
                    if (enemyPlanet.player != this) {
                        enemyPlanet.attractiveness = determineAttractiveness(enemyPlanet, myPlanet, this.gameScreen.aiSkill);
                        enemyPlanets.push(enemyPlanet);
                    }
                }
                enemyPlanets.sort(function (a, b) { return a.attractiveness - b.attractiveness });
                if (randomFromTo(1, (-this.gameScreen.aiSkill + 6) * 100) == 1) {
                    for (var j = 0; j < enemyPlanets.length; j++) {
                        var sg = spawnSpaceshipGroup(this.gameScreen, myPlanet, enemyPlanets[j], this);
                        this.gameScreen.spaceshipGroups.push(sg);
                        myPlanet.lastSpaceshipsGenerated = time;
                        break;
                    }
                }
            }
        }
    };

    function determineAttractiveness(targetPlanet, sourcePlanet, aiSkill) {
        var distance = Math.abs(sourcePlanet.posX - targetPlanet.posX) / canvasSizeX * 50 + Math.abs(sourcePlanet.posY - targetPlanet.posY) / canvasSizeY * 50;
        var unitRatio = targetPlanet.unitCount / targetPlanet.capacity * 100;
        var canOvertake = (sourcePlanet.unitCount / 2 - targetPlanet.unitCount > 0) ? 0 : 100;
        
        var neutralbump = (targetPlanet.player == null ? 0 : 100);
        // neutralbump is less at higher skills
        neutralbump /= aiSkill * 20;

        var distancePriority = 3;
        var unitRatioPriority = 1;
        var neutralPriority = 2;
        var canOvertakePriority = 3;

        var attractiveness = (distance * distancePriority) + (unitRatio * unitRatioPriority) + (neutralbump + neutralPriority) + (canOvertake * canOvertakePriority);
        //targetPlanet.debug = canOvertake.toFixed(2) + ' \n' + unitRatio.toFixed(2) + ' \n' + neutralbump + ' \n' + attractiveness.toFixed(2);
        return attractiveness;
    }
}


var aiPlayersJson =
[
{
    "name": "red",
    "color": "rgb(255,0,0)"
},
{
    "name": "green",
    "color": "rgb(0,255,0)"
},
{
    "name": "yellow",
    "color": "rgb(255,255,0)"
}
]
