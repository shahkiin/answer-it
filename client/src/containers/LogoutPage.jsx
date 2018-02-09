import React, { PropTypes, Component } from 'react';
import Auth from '../modules/Auth';

export default class LogoutPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount () {
        Auth.deauthenticateUser();
        // this.props.history.push('/');
        window.location.href = '/';
    }

    render () {
        return null;
    }
}