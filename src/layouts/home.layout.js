import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import {
//	BrowserRouter as Router,
//	Route
//} from 'react-router-dom';

import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Home from '../pages/home.page';

class HomeLayout extends Component {

	render() {

		return (
			<div className="answer-it">
				<Header />
				<main>
					<Home />
				</main>
				<Footer />
			</div>
		);
	}
};

ReactDOM.render(<HomeLayout />, document.getElementById('root'));