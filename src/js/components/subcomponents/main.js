import React, { Component } from 'react';

export default class Main extends Component{
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
		//get canvas content
		this.localCanvas = this.refs.localCanvas.getContext('2d');

		//this will draw the video stream to the canvas
		var streamVideoToCanvas = (vid,ctx)=>{
			ctx.drawImage(vid,0,0,vid.width,vid.height);
		}

		//get webcam permissions
		navigator.getUserMedia_ = (   navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia);
		//connect to the webcam and create a video stream
		navigator.getUserMedia({ audio: false, video: { width: 1280, height: 720 } },
      		function(stream) {
      			//save stream in constructor
      			this.localStream = stream;
      			//place the stream in the video src
				this.refs.localStream.src = window.URL.createObjectURL(this.localStream);
			}.bind(this),
			function(err) {
				//throw error if video stream not found
				console.log("Cannot play video stream");
			});

		//if video is played, draw it to canvas in a steady stream,
		//this happens behind the scenes
		this.refs.localStream.addEventListener('play', function(){
			var self_func = this;
			//constant loop while video is playing
			(function loop() {
				//if video not paused or ended
				if(!self_func.paused && !self_func.ended) {
					//draw video frame to canvas
					self.localCanvas.drawImage(self_func,0,0);
					//draws every 0.03 seconds
					setTimeout(loop, 1000 / 30);
				}
			})();
		},0);

		//listens as to whether mouse was moved or not
		chrome.runtime.onMessage.addListener(function(request, sender) {
			//if mouse moved
			if (request.movement == true) {
				//get the current image of canvas and save it as an image,
				//essentially we are taking a picture of the video stream
				var data = this.refs.localCanvas.toDataURL('image/png');		
				//save image in constructor
				this.source = data;
				//save image in state
				this.setState({imageSource:data});

				//send the image to the server,
				//it will then be sent to the user email
				fetch('http://localhost:8080', {
					method:'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					//send image as JSON type
					body: JSON.stringify({
						image:this.source
					})
				})
				.then((response) => response.json())
				.then((responseJson) => {
					//this should print "success"
					console.log(responseJson);
				})
				.catch(function(error) {
					//get an error if response not received,
					//meaning image was not received by the server
					console.log(error);
				})
			}
		}.bind(this));
	}

	render(){
        return(
        	<div>
        		<i class="fa fa-user-secret" id={this.props.spy} aria-hidden="true"></i>
        		<div className={this.props.instruction}>When you are ready to setup the spy cam, click the button below. Please make sure that you do not move the mouse after clicking the setup button.</div>
        		<video ref='localStream' className='localCanvas' width="320" height="240" autoPlay></video>
				<canvas ref="localCanvas" id="canvas" width="640" height="480"></canvas>
    			<img className={this.props.imageState} id="photo" alt="The screen capture will appear in this box." src={this.state.imageSource} />
  				<button className={this.props.setupBtn} onClick={this.props.setup} id="send_image">Setup</button>
  				<a onClick={this.props.switchEmailAccount} className={this.props.changeEmail}>Change email</a>
  			</div>
        )
    }
}