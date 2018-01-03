import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {

	render() {

		let tryButton = "button orange big";

		return (
			<section className="home">
				<div className="welcome">
					<h1>answerIt</h1>
					<p>simple service to create and share surveys</p>
					<span className={tryButton}>try it!</span>
				</div>
			</section>
		);
	}
};