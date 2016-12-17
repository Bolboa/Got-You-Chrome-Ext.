import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import Main from './subComponents/main';

class Layout extends React.Component {
	constructor(){
		super();
		
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

	
	render() {
		
		return (
			<div>	

				<Main setup={this.sendImage.bind(this)} />
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