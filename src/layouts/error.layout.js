import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Error from '../pages/error.page';

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