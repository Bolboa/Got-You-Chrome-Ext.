import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Main from './subComponents/main';
import { save, getInfo } from '../actions/index';
class Layout extends React.Component {

	constructor(){
		super();
		this.state = {
			email:'',
			password:'',
			errMsg:''
		}
	}

	componentDidMount() {
		//use redux to get user credentials from local storage,
		//credentials will be saved in this.props.info
		this.props.getInfo();
	}

	/*----------USE SAME CREDENTIALS-------------*/
	noChange() {
		//if local storage is not empty, use credentials saved in local storage
		if (this.props.info != null) {
			browserHistory.push('/src/index.html/layout');
		}
		//else throw an error, user will need to re-enter credentials
		else {
			this.setState({errMsg:'Sorry, we cannot remember the previous credentials.'});
		}
	}

	/*-------SAVES EMAIL IN STATE AS USER TYPES--------*/
	handleEmailChange(e) {
		this.setState({email:e.target.value});
	}

	/*--------SAVES PASSWORD IN STATE AS USER TYPES---------*/
	handlePasswordChange(e) {
		this.setState({password:e.target.value});
	}

	/*-------------SUBMIT CREDENTIALS TO THE SERVER---------------*/
	submit() {
		//regex to check if email is the correct format
		var emailValidateRE = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;

		//if password is not empty and email is in correct format
		if (emailValidateRE.test(this.state.email) && this.state.password) {
			//send info to route called validation
			fetch('http://localhost:8080/validation', {
				method:'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				//send credentials from saved state
				body: JSON.stringify({
					email:this.state.email,
					password:this.state.password
				})
			})
			.then((response) => response.json())
			//if this part is reached, then it must have been successful,
			//any errors are caught in the catch statement
			.then((responseJson) => {
				//should print "success"
				console.log(responseJson);
				//use redux to save email and password in local storage
				this.props.save(this.state.email, this.state.password);
				//send user to next page
				browserHistory.push('/src/index.html/layout');
			})
			//if this part is reached, one of the credentials are definitely wrong
			.catch(function(error) {
				console.log("Credentials are Invalid");
				//set error message accordingly
				this.setState({errMsg:"Credentials are wrong."});
			}.bind(this))
		}
		//if password is empty
		else if (!this.state.password) {
			//set error message accordingly
			this.setState({errMsg:"Password is wrong."});
		}
		//if email is wrong format
		else {
			//set error message accordingly
			this.setState({errMsg:"Email is wrong."});
		}	
	}

	render() {	
		return (
			<div>	
				<div className="loginHeader">Please enter the email you wish to use. Ensure the password matches your email password</div>
				<div className="emailWrap">
					<i class="fa fa-envelope" aria-hidden="true"></i>
					<input type="text" name="email" onChange={this.handleEmailChange.bind(this)} />
				</div>
				<div className="passwordWrap">
					<i class="fa fa-lock" aria-hidden="true"></i>
					<input type="password" name="password" onChange={this.handlePasswordChange.bind(this)} />
				</div>
				<button className="submitCreds" onClick={this.submit.bind(this)}>Submit</button>
				<a onClick={this.noChange.bind(this)}>Use same credentials</a>
				{/*IF ERROR MSG NOT EMPTY, SHOW ERROR*/}
				{this.state.errMsg != '' && <div>{this.state.errMsg}</div>}			
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
