//Button.js 继承Input
Modules.imports("Modules.View.Input", function(issuccess) {
	var supClass=window.Modules.View.Input;
	if (true===issuccess&&!supClass.Button) {
		supClass.Button = function(value) {
			supClass.call(this);
			this.view.type = "button";
			if (value) {
				this.view.value = value;
			}

		}
		supClass.Button.prototype = new supClass();
		supClass.Button.prototype.constructor = supClass.Button;

	}

})