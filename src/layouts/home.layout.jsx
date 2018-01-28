import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/footer.component.jsx';
import Header from '../components/header.component.jsx';
import Home from '../pages/home.page.jsx';

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