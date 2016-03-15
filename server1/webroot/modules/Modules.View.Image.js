//Image.js 继承View
Modules.imports("Modules.View", function(isSuccess) {
	var supClass=window.Modules.View;
	if (true===isSuccess&&!supClass.Image) {
		supClass.Image = function(src) {
			supClass.call(this);
			this.view = new Image();
			if (src) {
				this.view.src = src;
			}
		}
		supClass.Image.prototype = new supClass();
		supClass.Image.prototype.constructor = supClass.Image;
		supClass.Image.setSrc = function(src) {
			this.view.src = src;
		}
		supClass.Image.getSrc = function() {
			return this.view.src;
		}
	}

})