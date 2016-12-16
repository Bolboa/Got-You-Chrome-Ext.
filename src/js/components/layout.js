import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import Main from './subComponents/main';

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




	sendImage() {

		chrome.tabs.executeScript(null, {
	        file: 'src/js/scripts/getMouseMovement.js'
	     }, function() {
	        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
	        if (chrome.runtime.lastError) {
	            result = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
	            console.log(result);
	        }
	    });

	
	}

	leave() {
		browserHistory.push('/src/index.html/login');
	}
	/*openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/index.html')});
	}*/
	render() {
		
		return (
			<div>	

				<Main source={this.state.imageSource} setup={this.sendImage.bind(this)} />
				<button onClick={this.leave}>Leave</button>
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