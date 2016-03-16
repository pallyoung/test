var React = require('react');
var ReactDOM = require('react-dom');

class Timer2 extends React.Component{
			constructor(...args){
				super(args);
				this.state = {
					heading:"另一个一个简单的计时器"
				}
			}
			componentDidMount(){
				var self = this;
				setTimeout(function(){
					self.forceUpdate();
				},500);
			}
			componentDidUpdate(){
				var self = this;
				setTimeout(function(){
					self.forceUpdate();
				},500);
			}
			render(){
				return (
					<div>
						<h2>{this.state.heading}</h2>
						<p>{new Date().toLocaleString()}</p>
					</div>
					);
			}
		}
ReactDOM.render(<Timer2 />,document.getElementById("container"));