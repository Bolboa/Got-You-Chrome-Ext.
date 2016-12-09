import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Layout extends React.Component {
	constructor(){
		super();
		this.localStream = '';
		this.local2dContext = '';
		this.localCanvas = '';
		this.localCanvasLoop = '';
	}

	componentDidMount() {

		var self = this;

		this.localCanvas = this.refs.localCanvas.getContext('2d');

		var streamVideoToCanvas = (vid,ctx)=>{
			ctx.drawImage(vid,0,0,vid.width,vid.height);
		}

		navigator.getUserMedia_ = (   navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia);

		navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
      		function(stream) {
      			this.localStream = stream;
				this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
				//this.refs.localStream.play();
			}.bind(this),
			function(err) {
				console.log("nope");
			});

		this.refs.localStream.addEventListener('play', function(){
			var self_func = this;
			(function loop() {
				if(!self_func.paused && !self_func.ended) {
					self.localCanvas.drawImage(self_func,0,0);
					setTimeout(loop, 1000 / 30);
				}
			})();
		},0);
	}

	/*openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/index.html')});
	}*/
	render() {
		
		return (
			<div>	
				<video ref='localStream' className='localCanvas' width="320" height="240" autoPlay></video>

				<button id="snap">Snap Photo</button>
				<canvas ref="localCanvas" id="canvas" width="640" height="480"></canvas>
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