import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import SurveyElement from '../components/survey-element.component';

export default class SurveyList extends Component {

	constructor() {

		super();
		this.state = {

			list: []
		};
	}

	componentDidMount() {

		superagent
		.get('/api/survey')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {

			if (err) {

				console.error('Error: ' + err);
				return;
			}

			let results = response.body.results;

			this.setState({

				list: results
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