import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SurveyElement from '../components/survey-element.component.jsx';
import APIManager from '../utils/APIManager.jsx';

export default class LogIn extends Component {

	constructor() {

		super();
		this.state = {

			username: null,
			password: null,
			errors: {

				basic: false,
				username: false,
				password: false
			}
		};
	}

	submitLogIn(event) {

		event.preventDefault();

		if (!this.state.username || !this.state.password) {

			this.setState({ errors: {

				basic: true,
				username: this.state.username !== '',
				password: this.state.password !== ''
			}});

			return;
		}

		// APIManager.post('/logIn', {

		// 	username: this.state.username,
		// 	password: this.state.password,
			
		// }, (err, response) => {

		// 	if (err) {

		// 		console.error('Error: ' + err.message);
		// 		return;
		// 	}

		// 	console.log('login success!!!');
		// 	console.log(response);

		// 	this.props.history.push('/');
		// });
	}

	updatePassword(event) {

		this.setState({ password: event.target.value }, () => this.validateForm());
	}

	updateUserName(event) {

		this.setState({ username: event.target.value }, () => this.validateForm());
	}

	validateForm() {

		this.setState({ errors: {

			username: this.state.username === '',
			password: this.state.password === ''
		}});
	}

	render() {

		return (
			<div className="log-in section-content">
				<h1>Log in</h1>
				<form onSubmit={this.submitLogIn.bind(this)} method="post" action="/logIn">
					{this.state.errors.basic &&
						<div className="row">
							<span className="error">Please check once again your username and passwords.</span>
						</div>
					}
					<input type="text" name="username" placeholder="username" onChange={this.updateUserName.bind(this)}/>
					{this.state.errors.username &&
						<div className="row">
							<span className="error">Username cannot be empty.</span>
						</div>
					}
					<input type="password" name="password" placeholder="password" onChange={this.updatePassword.bind(this)} />
					{this.state.errors.password &&
						<div className="row">
							<span className="error">Password cannot be empty.</span>
						</div>
					}
					<input type="submit" value="Log in" />
				</form>
			</div>
		);
	}
};