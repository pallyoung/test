(function() {
	window.Modules.View = function() {
		this.view = document.createElement("p");
	}
	window.Modules.View.prototype = {
		getView: function() {
			return this.view;
		},
		setName: function(name) {
			this.view.name= name;
		},
		getName: function() {
			return this.view.name;
		},
		setStyle: function(Style) {
			this.view.style.cssText=Style;
		},
		getStyle: function() {
			return this.view.style.cssText;
		},
		setId:function(id){
			this.view.id=id;
		},
		getId:function(){
			return this.view.id;
		},
		setClassName:function(className){
			this.view.className=className;
		},
		getClassName:function(){
			return this.view.className;
		},
		addClassName:function(className){
			
		},
		removeClassName:function(className){

		},
		deleteClassName:function(){
			this.view.className="";
		},
		serialize:function(property){

		},
		parse:function(){

		},
		addEvent:function(type,handle){
		},
		removeEvent:function(type,handle){
		}
	};
})()