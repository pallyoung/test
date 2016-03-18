// AppDispatcher.js
var Dispatcher = require("./Dispatcher"); 

var AppDispatcher = new Dispatcher();
AppDispatcher.handleViewAction = function(action){
	this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
}

module.exports = AppDispatcher;