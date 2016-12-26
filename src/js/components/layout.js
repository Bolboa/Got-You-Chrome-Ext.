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
			imageState:"hidden",
			spy:"spy",
			changeEmail:'changeEmail'
		}
	}

	componentWillMount() {
		//gets a message from content script whether mouse was moved
		chrome.runtime.onMessage.addListener(function(request, sender) {
			//if mouse moved
  			if (request.caught) {
  				//this is used to show the Got You message to the culprit
  				this.setState({success:true});
  				//this is used as class name to show the image of the culprit
  				this.setState({imageState:"image"});
  			}
		}.bind(this));
	}

	/*--------INJECT SCRIPT IN PAGE TO LISTEN FOR MOUSE MOVEMENT---------*/
	setupWebcam() {
		//the hidden state is used as class names to decide
		//which elements to hide in the child component
		this.setState({instruction:"hidden"});
		this.setState({setupBtn:"hidden"});
		this.setState({spy:"hidden"});
		this.setState({changeEmail:"hidden"});

		//injects content script
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

	/*-----SWITCH EMAILS--------*/
	switchEmailAccount(){
		//go back to email and password registration
		browserHistory.push('/src/index.html');
	}

	render() {		
		return (
			<div>	
				{/*SHOW MESSAGE IF CULPRIT WAS CAUGHT*/}
				{this.state.success && <h1>Got You B@#$%!</h1>}
				<Main switchEmailAccount={this.switchEmailAccount} changeEmail={this.state.changeEmail} spy={this.state.spy} imageState={this.state.imageState} setupBtn={this.state.setupBtn} instruction={this.state.instruction} setup={this.setupWebcam.bind(this)} />
			</div>
		)
	}
}

/*--------BIND REDUX STATES TO COMPONENT------*/
function mapStateToProps(state) {
	return {
		local:state.local,
		info:state.info
		
	};
}

/*------BIND REDUX ACTIONS TO COMPONENT--------*/
function matchDispatchToProps(dispatch) {
	return bindActionCreators({save, getInfo}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Layout);
