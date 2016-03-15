console.log("ssss");
function test11 (tt) {
	console.log(tt);
	postMessage("I've Done!!");
}
onmessage=function(event){
	var a=event.data;
	var fun=eval(a.method);
	fun(a.parameter);
}
var second=0;
var timeTick=function () {
	second++;
	postMessage(second/100);
	console.log(second);
	setTimeout(timeTick,10);
}