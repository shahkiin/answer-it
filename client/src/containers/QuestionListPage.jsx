import React, {Component} from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';
import APIManager from '../utils/APIManager.jsx';
import QuestionElement from '../components/QuestionElement.jsx';
import { Link } from 'react-router-dom';

export default class QuestionListPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myList: [],
            otherList: [],
            my: true,
            other: true
        };
    }

    componentDidMount() {

        if (!Auth.isUserAuthenticated()) {
            window.location.href = '/';
            return;
        }

        APIManager.get('/api/question', null, (err, response) => {

            if (err) {

				console.error('Error: ' + err.message);
				return;
            }

            this.setState({ 
                
                myList: response.results.my,
                otherList: response.results.other 
            });
		});
    }

    showMy(event) {

        this.setState({ my: !this.state.my });
    }

    showOther(event) {

        this.setState({ other: !this.state.other });
    }

    render() {

        const myList = this.state.myList.map((question, i) => {

			return (

				<li key={i}><QuestionElement data={question} element='edit' number={i}/></li>
			);
		});

        let myListResult = myList.length ? <ul>{ myList }</ul> : <div className="empty-list">Empty my question list.</div>;

        const otherList = this.state.otherList.map((question, i) => {

			return (

				<li key={i}><QuestionElement data={question} element='fill' number={i}/></li>
			);
		});

        let otherListResult = otherList.length ? <ul>{ otherList }</ul> : <div className="empty-list">Empty other question list.</div>;

        return (
            <div className="question-list section-content">
				<h1>Question List</h1>
                <h4>Do you want to ask for something? <Link className='button' to="/questioneditor">Add new question</Link></h4>
                <h2 onClick={this.showMy.bind(this)}>Your questions - click to expand</h2>
                {this.state.my && myListResult}
                <h2 onClick={this.showOther.bind(this)}>Answer it - click to expand</h2>
                {this.state.other && otherListResult}
			</div>
        );
    }
}