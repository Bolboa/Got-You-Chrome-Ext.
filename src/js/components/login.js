import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Main from './subComponents/main';

class Layout extends React.Component {
	constructor(){
		super();
		this.state = {
			email:'',
			password:''
		}
	}

	handleEmailChange(e) {
		this.setState({email:e.target.value});
	}

	handlePasswordChange(e) {
		this.setState({password:e.target.value});
	}


	submit() {
		console.log(this.state.email);
		var emailValidateRE = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;
		if (emailValidateRE.test(this.state.email) && this.state.password) {

			fetch('http://localhost:8080/validation', {
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email:this.state.email,
				password:this.state.password
			})
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("response");
		})
		.catch(function(error) {
			console.log(error);
		})

			//browserHistory.push('/src/index.html/layout');
		}

		
	}

	render() {
		
		return (
			<div>	

				<input type="text" name="email" onChange={this.handleEmailChange.bind(this)} />
				<input type="password" name="password" onChange={this.handlePasswordChange.bind(this)} />
				<button onClick={this.submit.bind(this)}>Submit</button>
				
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