import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Layout extends React.Component {
	constructor(){
		super();
		this.localStream = '';
		this.local2dContext = '';
	}

	componentDidMount() {
		this.local2dContext = this.refs.localCanvas;

		navigator.getUserMedia_ = (   navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia);

		navigator.getUserMedia({video:true, audio:true}, stream => {
			this.localStream = stream;
			this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
		},function(err){
			console.log("Error", err);
		});

		
	}
	openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/permission.html')});
	}
	render() {
		
		return (
			<div>	
				<video ref='localStream' className='localCanvas' width="320" height="240"></video>
				<button id="snap">Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
				<button onClick={this.openTab}>open</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		example:state.example
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Layout);