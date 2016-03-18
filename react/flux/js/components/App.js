var React  = require("react");
var ReactDOM = require("react-dom");
var List = require("./List");
var TodoStore = require('../stores/TodoStore');
var TodoActions=require('../actions/TodoActions');


function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

class App extends React.Component{
	constructor(...args){
		super(args);
		this.state = getTodoState();
	}
	_renderList(item,i){
		return (<span>{item.text}</span>);
	}
	componentDidMount() {
    	TodoStore.addChangeListener(this._onChange.bind(this));
  	}

  	componentWillUnmount() {
    	TodoStore.removeChangeListener(this._onChange.bind(this));
  	}
  	_onChange() {
    	this.setState(getTodoState());
  	}
  	_create(){
  		TodoActions.create(this.refs.text.value);
  	}
	render(){
		return (
				<div>
					<h1>{this.props.heading}</h1>
					<div>
						<List 
							dataSource = {this.state.allTodos}
							renderList = {this._renderList.bind(this)}/>
						<div>
							<input type="text" ref="text"/>
							<a href="javascript:void(0)" onClick = {this._create.bind(this)}>添加</a>
						</div>
					</div>
				</div>	
			);
	}
}
module.exports = App;