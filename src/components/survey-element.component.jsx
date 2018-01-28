import React, { Component } from 'react';

export default class SurveyElement extends Component {

	render() {

		return(

			<div>
				<h2>{this.props.data.name}</h2>
				<p>{this.props.data.description}</p>
			</div>
		);
	}
}