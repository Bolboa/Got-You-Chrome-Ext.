import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Layout extends React.Component {
	constructor(){
		super();
	}

	componentWillMount() {
		var video = document.getElementById('video');
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
				video.src = window.URL.createObjectURL(stream);
				video.play();
			})
		}
	}
	
	render() {
		
		return (
			<div>	
				<video id="video" width="640" height="480" autoplay></video>
				<button id="snap">Snap Photo</button>
				<canvas id="canvas" width="640" height="480"></canvas>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Layout);