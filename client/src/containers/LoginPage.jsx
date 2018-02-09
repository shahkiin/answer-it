import React, { PropTypes, Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';
import APIManager from '../utils/APIManager.jsx';

export default class LoginPage extends Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
       
        event.preventDefault();

        APIManager.post('/auth/login', {

            email: this.state.user.email,
            password: this.state.user.password
            
        }, (err, response) => {

			if (err) {

                const errors = response.body.errors ? response.body.errors : {};
                errors.summary = response.body.message;
                this.setState({ errors });
				return;
            }
            
            this.setState({ errors: {} });
            this.setState({ username: response.username });
            Auth.authenticateUser(response.token);
            window.location.href = '/';

			// this.props.history.push('/logIn');
		});
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({ user });
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
            />
        );
    }
}