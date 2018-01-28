import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Footer from './components/footer.component.jsx';
import Header from './components/header.component.jsx';
import Error from './pages/error.page.jsx';
import Home from './pages/home.page.jsx';
import SurveyEditor from './pages/survey-editor.page.jsx';
import SurveyList from './pages/survey-list.page.jsx';
import LogIn from './pages/log-in.page.jsx';
import SignUp from './pages/sign-up.page.jsx';

class Layout extends Component {

	render() {

		return (
			<Router>
				<div className="answer-it">
					<Header />
					<main>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/surveyEditor" component={SurveyEditor} />
							<Route path="/surveyList" component={SurveyList} />
							<Route path="/logIn" component={LogIn} />
							<Route path="/signUp" component={SignUp} />
						</Switch>
					</main>
					<Footer />
				</div>
			</Router>
		);
	}
};

ReactDOM.render(<Layout />, document.getElementById('root'));