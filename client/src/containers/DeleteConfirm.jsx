import React, {Component} from 'react';
import Auth from '../modules/Auth';
import APIManager from '../utils/APIManager.jsx';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';

export default class DeleteConfirm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {

            id: null
        };
    }

    componentDidMount() {

        if (!Auth.isUserAuthenticated()) {
            window.location.href = '/';
            return;
        }

        const parsed = qs.parse(this.props.location.search);
        let questionId = parsed.question;

        this.setState({ id: questionId });
    }

    cancel(event) {

        this.props.history.push('/questionlist');
    }

    delete(event) {

        APIManager.post('/api/delete/question/' + this.state.id, null, (err, response) => {

            if (err) {
 
                console.error('Error: ' + err.message);
                return;
            }

            localStorage.setItem('successMessage', response.results);
            this.props.history.push('/questionlist');
        });
    }

    render() {
        return (
            <div className="confirm section-content form">
                <h1>Do you want to remove this question?</h1>
                <button onClick={this.delete.bind(this)}>Confirm delete</button>
                <button onClick={this.cancel.bind(this)}>Cancel</button>
            </div>
        );
    }
}