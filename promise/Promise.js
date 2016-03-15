function Promise(cb) {
	cb(Promise.resolve.bind(this), Promise.reject.bind(this));
}

Promise.reject = function(promise) {
	
}
Promise.resolve = function(promise) {

}
Promise.prototype = {
	then: function(res, rej) {

	}
}

function fire(promise){

}