import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../modules/Auth';

export default class Header extends Component {

	constructor() {

		super();
		this.state = {
			authenticated: null
		};
	}

	componentDidMount() {

		this.setState({ authenticated: Auth.isUserAuthenticated() });
	}

	render() {
		return (
			<header>
				<Link to="/">
					<div className="logo">
						answer<span className="it">It</span>
					</div>
				</Link>
				<nav>
					{this.state.authenticated ? (
						<ul>
							<li>
								<NavLink actionclassname="active" to="/questionlist">Question list</NavLink>
							</li>
							<li>
								<NavLink actionclassname="active" to="/logout">Log out</NavLink>
								{/* <a href="/logout">log out</a> */}
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<NavLink actionclassname="active" to="/questionlist">Question list</NavLink>
							</li>
							<li>
								<NavLink actionclassname="active" to="/login">Log in</NavLink>
							</li>
							<li>
								<NavLink actionclassname="active" to="/signup">Sign up</NavLink>
							</li>
						</ul>
					)}
				</nav>
			</header>
		);
	}
}