import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/surveyList">Survey list</Link>
						</li>
						<li>
							<Link to="/surveyEditor">Survey editor</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
