import React, { PropTypes, Component } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import APIManager from '../utils/APIManager.jsx';

export default class SignUpPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        
        event.preventDefault();

        APIManager.post('/auth/signup', {

            name: this.state.user.name,
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
            localStorage.setItem('successMessage', response.message);
            this.props.history.push('/login');
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
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}