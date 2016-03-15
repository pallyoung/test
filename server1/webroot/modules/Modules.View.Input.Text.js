//Text.js 继承input
//@imports Modules.View.Input
(function() {
	var supClass = window.Modules.View.Input;
	supClass.Text = function(value) {
		supClass.call(this);
		this.view.type = "text";
		if (value) {
			this.view.value = value;
		}
		supClass.Text.prototype = new supClass();
		supClass.Text.prototype.constructor = supClass.Text;
	}

})()