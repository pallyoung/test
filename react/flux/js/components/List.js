var React  = require("react");
class List extends React.Component {
	constructor(...args){
		super(args);

	}
	render(){
		var dataSource = this.props.dataSource ||[];
		var self = this;
		var _= [];
		for(var o in dataSource){
			_.push(<li>{self.props.renderList(dataSource[o],o)}</li>);
		}
		return (
				<ul>
					{_}
				</ul>
			);
	}
}

module.exports = List;