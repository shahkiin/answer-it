import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<header>
				<Link to="/">
					<div className="logo">
						answer<span className="it">It</span>
					</div>
				</Link>
				<nav>
					<ul>
						<li>
							<NavLink actionclassname="active" to="/surveyList">Survey list</NavLink>
						</li>
						<li>
							<NavLink actionclassname="active" to="/surveyEditor">Survey editor</NavLink>
						</li>
						<li>
							<NavLink actionclassname="active" to="/logIn">Log in</NavLink>
						</li>
						<li>
							<NavLink actionclassname="active" to="/signUp">Sign up</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
