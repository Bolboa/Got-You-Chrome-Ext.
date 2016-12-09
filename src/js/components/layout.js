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

		navigator.getUserMedia_ = (   navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia);

<<<<<<< HEAD
		navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
      		function(stream) {
      			this.localStream = stream;
				this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
				this.refs.localStream.play();
			}.bind(this),
			function(err) {
				console.log("nope");
			});
		}

=======
		navigator.getUserMedia({video:true, audio:true}, stream => {
			this.localStream = stream;
			this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
		},function(err){
			console.log("Error", err);
		});
>>>>>>> 861f01477f7c9ee4be1265485143f039b9dfd0df

	openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/index.html')});
	}
	render() {
		
		return (
			<div>	
<<<<<<< HEAD
				<video ref='localStream' className='localCanvas' width="320" height="240" autoPlay></video>
=======
				<video ref='localStream' className='localCanvas' width="320" height="240"></video>
>>>>>>> 861f01477f7c9ee4be1265485143f039b9dfd0df
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