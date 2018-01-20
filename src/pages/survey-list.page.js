import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SurveyElement from '../components/survey-element.component';
import { APIManager } from '../utils';

export default class SurveyList extends Component {

	constructor() {

		super();
		this.state = {

			list: []
		};
	}

	componentDidMount() {

		APIManager.get('/api/survey', null, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}

			this.setState({

				list: response.results
			});
		});
	}

	render() {

		const surveyList = this.state.list.map((survey, i) => {

			return (

				<li key={i}><SurveyElement data={survey}/></li>
			);
		});

		return (

			<div>
				<h1>Survey List</h1>
				<ul>
					{ surveyList }
				</ul>
			</div>
		);
	}
};