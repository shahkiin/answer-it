import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import {
//	BrowserRouter as Router,
//	Route
//} from 'react-router-dom';

import Footer from '../components/footer.component';
import Header from '../components/header.component';
import SurveyList from '../pages/survey-list.page';

class SurveyListLayout extends Component {

	render() {

		return (
			<div className="answer-it">
				<Header />
				<main>
					<SurveyList />
				</main>
				<Footer />
			</div>
		);
	}
};

ReactDOM.render(<SurveyListLayout />, document.getElementById('root'));