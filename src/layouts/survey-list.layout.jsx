import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from '../components/footer.component.jsx';
import Header from '../components/header.component.jsx';
import SurveyList from '../pages/survey-list.page.jsx';

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