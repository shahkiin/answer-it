import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { APIManager } from '../utils/APIManager';

export default class SurveyEditor extends Component {

	constructor() {

		super();
		this.state = {

			list: []
		};
	}

	submitSurvey() {

		console.log('submit survey');

		let updatedSurvey = Object.assign({}, this.state.survey);

		APIManager.post('/api/survey', updatedSurvey, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}

			console.log('Survey created: ' + JSON.stringify(response));
		});
	}

	updateSurveyDescription() {

		console.log('update description');

		let updatedSurvey = Object.assign({}, this.state.survey);
		updatedSurvey[ 'description' ] = event.target.description;

		this.state({

			survey: updatedSurvey
		});
	}

	updateSurveyName() {

		console.log('update name');

		let updatedSurvey = Object.assign({}, this.state.survey);
		updatedSurvey[ 'name' ] = event.target.name;

		this.state({

			survey: updatedSurvey
		});
	}

	render() {

		return (
			
			<div>
				<input type="text" name="name" placeholder="Survey name" onChange={this.updateSurveyName.bind(this)} /><br />
				<input type="text" name="description" placeholder="Description" onChange={this.updateSurveyDescription.bind(this)} /><br />
				<button onClick={this.submitSurvey.bind(this)}>Create survey</button>
			</div>
		);
	}
};