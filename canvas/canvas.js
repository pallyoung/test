(function() {
	/*canvas 绘图工具库 v1.0*/
	var Sprite = function(painters) {
		this.painters = painters || {};
		if (!Sprite.prototype.paint) {
			Sprite.prototype = {
				paint: function(canvas) {
					for (var name in this.painters) {
						if (this.painters[name].visible) {
							this.painters[name].paint(this, canvas);
						}
					}

				},
				addPainter: function(name, painter) {
					this.painters[name] = painter;
				},
				removePainter: function(name) {
					delete this.painters[name];

				},
				update: function(canvas, time) {
					for (var name in this.painters) {
						this.painters[name].execute(this, canvas, time);
					}
				}
			};
			return new Sprite(painters);
		}
	}
	var Painter = function() {
		// this.top = 0;
		// this.left = 0;
		// this.height = 0;
		// this.width = 0;
		// this.startTime = 0;
		// this.velocityX = 0;
		// this.velocityY = 0;
		// this.accelerationY = 0;
		// this.accelerationX = 0;
		// this.visible = true;
		// this.animating = false;
		this.paint = function() {

			}
		this.execute = function() {

			}
		}
})()