import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SurveyElement from '../components/survey-element.component.jsx';
import APIManager from '../utils/APIManager.jsx';

export default class SignUp extends Component {

	constructor() {

		super();
		this.state = {

			username: null,
			password: null,
			passwordRepeat: null,
			confirmation: null,
			errors: {

				basic: false,
				confirmation: false,
				username: false,
				passwordRepeat: false
			}
		};
	}

	submitRegister(event) {

		event.preventDefault();

		if (!this.state.username || !this.state.password || !this.state.confirmation) {

			this.setState({ errors: {

				basic: true,
				confirmation: !this.state.confirmation,
				username: !this.state.username ? true : false,
				passwordRepeat: this.state.password !== this.state.passwordRepeat || this.state.password === '' || this.state.password === null
			}});

			return;
		}

		APIManager.post('/register', {

			confirmation: this.state.confirmation,
			username: this.state.username,
			password: this.state.password,
			passwordRepeat: this.state.passwordRepeat
			
		}, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}

			this.props.history.push('/logIn');
		});
	}

	updateConfirmation(event) {
		
		this.setState({ confirmation: event.target.checked }, () => this.validateForm());
	}

	updatePassword(event) {

		this.setState({ password: event.target.value }, () => this.validateForm());
	}

	updatePasswordRepeat(event) {

		this.setState({ passwordRepeat: event.target.value }, () => this.validateForm());
	}

	updateUserName(event) {

		this.setState({ username: event.target.value }, () => this.validateForm());
	}

	validateForm() {

		this.setState({ errors: {

			confirmation: !this.state.confirmation,
			username: this.state.username === '',
			passwordRepeat: this.state.password !== this.state.passwordRepeat
		}});
	}

	render() {

		return (

			<div className="sign-up section-content">
				<h1>Sign up</h1>
				<form onSubmit={this.submitRegister.bind(this)}>
					{this.state.errors.basic &&
						<div className="row">
							<span className="error">Please check once again your username, passwords and confirmation.</span>
						</div>
					}
					<input type="text" name="username" placeholder="username" onChange={this.updateUserName.bind(this)}/>
					{this.state.errors.username &&
						<div className="row">
							<span className="error">Username cannot be empty.</span>
						</div>
					}
					<input type="password" name="password" placeholder="password" onChange={this.updatePassword.bind(this)} />
					<input type="password" name="passwordrepeat" placeholder="repeat password" onChange={this.updatePasswordRepeat.bind(this)} />
					{this.state.errors.passwordRepeat &&
						<div className="row">
							<span className="error">Passwords must be the same.</span>
						</div>
					}
					<div className="row">
						<input type="checkbox" name="confirmation" id="confirmation" onChange={this.updateConfirmation.bind(this)} />
						<label htmlFor="confirmation">I agree to all regulations.</label>
					</div>
					{this.state.errors.confirmation &&
						<div className="row">
							<span className="error">Confirmation is required.</span>
						</div>
					}
					<input type="submit" value="Send form" />
				</form>
			</div>
		);
	}
};