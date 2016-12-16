import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
	/*openTab() {
		chrome.tabs.create({'url': chrome.extension.getURL('./src/index.html')});
	}*/
	render() {
		
		return (
			<div>	

				<h1>HII</h1>
				
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