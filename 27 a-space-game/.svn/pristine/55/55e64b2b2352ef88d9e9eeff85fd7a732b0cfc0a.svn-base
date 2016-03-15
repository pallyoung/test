// some Code by Richard Poole: http://sycora.com/
// Algorithm by Craig Reynolds: http://www.red3d.com/cwr/boids/

Math.dotProduct2 = function(ax, ay, bx, by) {
	return ax * bx + ay * by;
}

function FlockingController(settings) {
	var getVisualStats = function(boid, boids) {
		var stats = {posX: 0, posY: 0, velX: 0, velY: 0, closestDistance: 999999999, count: 0};
		//var count = 0;
		for (var i in boids) {
			if (boids[i] == boid)
				continue;

			var dx = boids[i].posX - boid.posX;
			var dy = boids[i].posY - boid.posY;

			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < stats.closestDistance) {
				stats.closestDistance = distance;
				stats.closestBoid = boids[i];
			}

			var ndx = dx / distance;
			var ndy = dy / distance;

			var cosdirection = Math.dotProduct2(Math.cos(boid.direction), Math.sin(boid.direction), ndx, ndy);
			cosVisualFieldDiv2 = Math.cos(settings.visualField / 2);
			visualRangeSqr = settings.visualRange * settings.visualRange;

			if (dx * dx + dy * dy <= visualRangeSqr && cosdirection >= cosVisualFieldDiv2) {
				stats.posX += boids[i].posX;
				stats.posY += boids[i].posY;
				stats.velX += boids[i].velX;
				stats.velY += boids[i].velY;
				stats.count++;
			}
		}

		stats.posX /= stats.count;
		stats.posY /= stats.count;
		stats.direction = Math.atan2(stats.velY, stats.velY);
		return stats;
	}


    this.UpdateFlocking = function (boid, boids) {
        // Move the boid in a flocky way.
        var avg = getVisualStats(boid, boids);
        var tx = boid.velX;
        var ty = boid.velY;

        // Steer to avoid crowding local flock mates.
        if (avg.closestBoid) {
            var dx = avg.closestBoid.posX - boid.posX;
            var dy = avg.closestBoid.posY - boid.posY;
            if (avg.closestDistance < settings.separationDistance) {
                tx -= dx / avg.closestDistance * settings.separationPriority;
                ty -= dy / avg.closestDistance * settings.separationPriority;
            }
        }

        // Steer towards the average heading of local flock mates.
        tx += Math.cos(avg.direction) * settings.alignmentPriority;
        ty += Math.sin(avg.direction) * settings.alignmentPriority;

        // Steer towards the average position of local flock mates.
        if (avg.count > 0) {
            var dx = avg.posX - boid.posX;
            var dy = avg.posY - boid.posY;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var ndx = dx / distance;
            var ndy = dy / distance;
            tx += ndx * settings.cohesionPriority;
            ty += ndy * settings.cohesionPriority;
        }

        // Steer towards the target.
        var dx = boid.targetX - boid.posX;
        var dy = boid.targetY - boid.posY;
        var distance = Math.max(Math.sqrt(dx * dx + dy * dy), 50);
        var ndx = dx / distance;
        var ndy = dy / distance;
        tx += ndx * settings.targetPriority;
        ty += ndy * settings.targetPriority;

        var tdirection = Math.atan2(ty, tx);
        var cw = (tdirection - boid.direction + Math.PI * 4) % (Math.PI * 2);
        var acw = (boid.direction - tdirection + Math.PI * 4) % (Math.PI * 2);
        var rotation = Math.abs(cw) < Math.abs(acw) ? cw : -acw;
        rotation *= settings.rotationSpeed;
        rotation = Math.min(Math.max(rotation, -settings.maxRotation), settings.maxRotation);
        boid.direction += rotation;

        // update velocity
        boid.velX = Math.cos(boid.direction);
        boid.velY = Math.sin(boid.direction);

        // update position
        boid.posX += boid.velX * boid.speed;
        boid.posY += boid.velY * boid.speed;
    }
}