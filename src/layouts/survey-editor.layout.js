import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Footer from '../components/footer.component';
import Header from '../components/header.component';
import SurveyEditor from '../pages/survey-editor.page';

class SurveyEditorLayout extends Component {

	render() {

		return (
			<div className="answer-it">
				<Header />
				<main>
					<SurveyEditor />
				</main>
				<Footer />
			</div>
		);
	}
};

ReactDOM.render(<SurveyEditorLayout />, document.getElementById('root'));