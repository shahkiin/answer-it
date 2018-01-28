import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Footer from '../components/footer.component.jsx';
import Header from '../components/header.component.jsx';
import Error from '../pages/error.page.jsx';

class ErrorLayout extends Component {

	render() {

		return (
			<div className="answer-it">
				<Header />
				<main>
					<Error />
				</main>
				<Footer />
			</div>
		);
	}
};

ReactDOM.render(<ErrorLayout />, document.getElementById('root'));