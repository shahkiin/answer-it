import React, {Component} from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';
import APIManager from '../utils/APIManager.jsx';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';

export default class QuestionEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            scale: '0-5',
            theme: 'Jasny',
            themes: [],
            scales: [],
            editable: false,
            changed: false,
            id: null
        };
    }

    componentDidMount() {

        if (!Auth.isUserAuthenticated()) {
            window.location.href = '/';
            return;
        }

        APIManager.get('/api/prepare/question', null, (err, response) => {

            if (err) {
 
                console.error('Error: ' + err.message);
                return;
            }

            this.setState({ 

                themes: response.result.themes,
                scales: response.result.scales 
            });
        });

        const parsed = qs.parse(this.props.location.search);
        let questionId = parsed.question;

        if (questionId) {
            
            APIManager.get('/api/question/' + questionId, null, (err, response) => {

                if (err) {
     
                    console.error('Error: ' + err.message);
                    return;
                }
   
                this.setState({ 

                    name: response.result.name,
                    description: response.result.description,
                    scale: response.result.scale,
                    theme: response.result.theme,
                    editable: true,
                    id: response.result.id
                });
            });
        }
    }

    submitQuestion(event) {

        event.preventDefault();

        if (!this.state.name) {

            this.setState({ name: '' });
            return;
        }

       if (this.state.editable) {

            this.submitQuestionUpdate();
       } else {
            this.submitQuestionNew();
       }
    }

    submitQuestionNew() {

        let updatedQuestion = Object.assign({}, {

            name: this.state.name,
            description: this.state.description,
            scale: this.state.scale,
            theme: this.state.theme,
        });
        
		APIManager.post('/api/question', updatedQuestion, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}
            
            localStorage.setItem('successMessage', response.results);
            this.props.history.push('/questionlist');
		});
    }

    submitQuestionUpdate() {

        let updatedQuestion = Object.assign({}, {

            name: this.state.name,
            description: this.state.description,
            id: this.state.id
        });
        
		APIManager.post('/api/update/question/', updatedQuestion, (err, response) => {

			if (err) {

				console.error('Error: ' + err.message);
				return;
			}
            
            localStorage.setItem('successMessage', response.results);
            this.props.history.push('/questionlist');
		});
    }

    updateName(event) {

        this.setState({ name: event.target.value, changed: true });
    }

    updateDescription(event) {

        this.setState({ description: event.target.value });
    }

    updateScale(event) {

        this.setState({ scale: event.target.value });
    }

    updateTheme(event) {

        this.setState({ theme: event.target.value });
    }

    render() {

        let optionScale = this.state.scales.map((scale, i) => <option value={scale.name} key={i}>{scale.name}</option>);
        let optionTheme = this.state.themes.map((theme, i) => <option value={theme.name} key={i}>{theme.name}</option>);
        let buttonText = this.state.editable ? 'Save changes' : 'Create question';

        return (
            <div className="question-editor section-content form">
				<h1>Question Editor</h1>
                <form>
                    <input type="text" name="name" placeholder="Question name" value={this.state.name} onChange={this.updateName.bind(this)} />
                    {this.state.name === '' && this.state.changed && 
                        <div className="row">
                            <span className="error">Question name cannot be empty.</span>
                        </div>
                    }
                    <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.updateDescription.bind(this)} />
                    {this.state.scales &&
                        <select name='scale' value={this.state.scale} disabled={this.state.editable} onChange={this.updateScale.bind(this)}>
                            {optionScale}
                        </select>
                    }
                    {this.state.themes &&
                        <select name='theme' value={this.state.theme} disabled={this.state.editable} onChange={this.updateTheme.bind(this)}>
                            {optionTheme}
                        </select>
                    }
                    <button onClick={this.submitQuestion.bind(this)}>{buttonText}</button>
                </form>
			</div>
        );
    }
}