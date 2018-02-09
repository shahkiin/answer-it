import React, {Component} from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';
import APIManager from '../utils/APIManager.jsx';

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    componentDidMount() {

        if (!Auth.isUserAuthenticated()) {
            return;
        }

        APIManager.get('/api/home', null, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}

            this.setState({ username: response.results });
			// this.props.history.push('/logIn');
		});
    }

    render() {
        return (<Home username={this.state.username} />);
    }
}