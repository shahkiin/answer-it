import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

export default class SurveyEditor extends Component {

	constructor() {

		super();
	}

	componentDidMount() {

		console.log("mounted editor!");

//		superagent
//			.get()
//			.query()
//			.set()
//			.end();
	}

	render() {

		return (
			
			<form action="/api/survey" method="post">
				<input type="text" name="name" placeholder="Survey name" /><br />
				<input type="text" name="description" placeholder="Description" /><br />
				<input type="submit" value="Create survey" />
			</form>
		);
	}
};