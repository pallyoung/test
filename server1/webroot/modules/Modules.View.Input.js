//Input.js 继承view
//@imports Modules.View
(function() {
	var supClass = window.Modules.View;
	supClass.Input = function(value) {
		supClass.call(this);
		this.view = document.createElement("input");
		if (value) {
			this.view.value = value;
		}
	}
	supClass.Input.prototype = new supClass();
	supClass.Input.prototype.constructor = supClass.Input;
	supClass.Input.prototype.setValue = function(value) {
		this.view.value = value;
	}
	supClass.Input.prototype.getValue = function() {
		return this.view.value;
	}
})()