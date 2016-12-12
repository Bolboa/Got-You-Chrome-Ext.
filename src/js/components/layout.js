import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Layout extends React.Component {
	constructor(){
		super();
		this.state = {
			imageSource:''
		}
		this.localStream = '';
		this.local2dContext = '';
		this.localCanvas = '';
		this.source = '';
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

	takePicture() {
		//console.log(this.localCanvas);
		var data = this.refs.localCanvas.toDataURL('image/png');
		this.source = data;
		this.setState({imageSource:data});

	}

	sendImage() {
		console.log(this.source);
		fetch('http://localhost:8080', {
			method:'POST',
			mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image:this.source
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("response");
		})
		.catch(function(error) {
			console.log(error);
		})
	}
	/*openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/index.html')});
	}*/
	render() {
		
		return (
			<div>	
				<video ref='localStream' className='localCanvas' width="320" height="240" autoPlay></video>

				<canvas ref="localCanvas" id="canvas" width="640" height="480"></canvas>
				
    			<img id="photo" alt="The screen capture will appear in this box." src={this.state.imageSource} />
  				<button onClick={this.takePicture.bind(this)} id="startbutton">Take photo</button>
  				<button onClick={this.sendImage.bind(this)} id="send_image">SEND</button>
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