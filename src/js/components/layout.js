import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { save, getInfo } from '../actions/index';

import Main from './subComponents/main';

class Layout extends React.Component {
	constructor(){
		super();
		this.state = {
			webcam:false,
			success:false,
			instruction:"instruction",
			setupBtn:"setupBtn",
			imageState:"hidden"
		}
		
	}

	componentWillMount() {
		
		chrome.runtime.onMessage.addListener(function(request, sender) {
			//store the list of stylesheets in redux
  			if (request.caught) {
  				this.setState({success:true});
  				this.setState({imageState:"image"});
  			}
  			
		}.bind(this));
	}

	


	sendImage() {
		this.setState({instruction:"hidden"});
		this.setState({setupBtn:"hidden"});
		chrome.tabs.executeScript(null, {
	        file: 'src/js/scripts/getMouseMovement.js'
	     }, function() {
	        //if you try and inject into an extensions page or the webstore/NTP you'll get an error
	        if (chrome.runtime.lastError) {
	            result = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
	            console.log(result);
	        }
	    });
		
	
	}

	

	
	render() {
		
		return (
			<div>	

				<Main imageState={this.state.imageState} setupBtn={this.state.setupBtn} instruction={this.state.instruction} setup={this.sendImage.bind(this)} />

				{this.state.success && <h1>Got You</h1>}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		example:state.example,
		local:state.local,
		info:state.info
		
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({save, getInfo}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Layout);