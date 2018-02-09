import React from 'react';
import ReactDom from 'react-dom';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './containers/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import LogoutPage from './containers/LogoutPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import QuestionListPage from './containers/QuestionListPage.jsx';
import QuestionEditor from './containers/QuestionEditor.jsx';
import DeleteConfirm from './containers/DeleteConfirm.jsx';

ReactDom.render((
    <Router>
        <div className="answer-it">
            <Header />
            <main>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/questionlist" component={QuestionListPage} />
                    <Route path="/questioneditor" component={QuestionEditor} />
                    <Route path="/confirmdelete" component={DeleteConfirm} />
                </Switch>
            </main>
            <Footer />
        </div>
    </Router>
), document.getElementById('root'));