//Application.js
(function(){
	var hasTouch=document.hasOwnProperty("ontouchstart")?true:false;
	var eventTypes=["tap","dbltap","moveh","movev","tapend","tapstart","longtap"];
	var timetick=0;
	//事件监听
	var mouseDownListener=function(e){
		//记录时间间隔
		var tt=timetick;
	}
	var mouseUpListener=function(e){

	}
	var mouseMoveListener=function(e){

	}
	var mouseOutListener=function(e){

	}
	var mouseEnterListener=function(e){

	}
	//触发事件
	var eventEmit=function(context,e){

	}
	//app
	Window.Modules.Application=function(){
	}
	WindowModules.Application.prototype={
		init:function(){

		},
		emit:function(){

		}

	}
})()?