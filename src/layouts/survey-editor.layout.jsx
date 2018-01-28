import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Footer from '../components/footer.component.jsx';
import Header from '../components/header.component.jsx';
import SurveyEditor from '../pages/survey-editor.page.jsx';

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