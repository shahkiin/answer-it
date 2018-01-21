import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Footer from './components/footer.component';
import Header from './components/header.component';
import Error from './pages/error.page';
import Home from './pages/home.page';
import SurveyEditor from './pages/survey-editor.page';
import SurveyList from './pages/survey-list.page';
import LogIn from './pages/log-in.page';
import SignUp from './pages/sign-up.page';

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