import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<header>
				<div className="logo">
					answer<span className="it">It</span>
				</div>
				<nav>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/surveyList">Survey list</a>
						</li>
						<li>
							<a href="/surveyEditor">Survey editor</a>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
