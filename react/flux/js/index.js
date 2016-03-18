var App = require("./components/App");
var React  = require("react");
var ReactDOM = require("react-dom");
var Const = require('./constants/const');

ReactDOM.render(<App heading={Const.APP_NAME}/>,document.getElementById("container"));