import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import APIManager from '../utils/APIManager.jsx';

export default class QuestionElement extends Component {

	constructor(props) {
        super(props);

        this.state = {
			disabled: false,
			value: null
        };
    }

	setAnswer(event) {

		this.setState({ 

			disabled: true,
			value: event.target.value
		});

		let updatedResponse = Object.assign({}, {

            questionId: event.target.name,
            rate: event.target.value
        });

		APIManager.post('/api/response', updatedResponse, (err, response) => {

			if (err) {
 
				console.error('Error: ' + err.message);
				return;
			}

			console.log(response);
		});
	}

	render() {

		let rightPanel;

		if (this.props.element === 'edit') {
			
			let answers = [];

			for(let i = this.props.data.scale.from;i <= this.props.data.scale.to; i++) {

				answers.push( <th key={i}>{i}</th> );
			}

			let results = [];

			if (this.props.data.responses.length) {

				for(let i = this.props.data.scale.from;i <= this.props.data.scale.to; i++) {

					let counter = this.props.data.responses.filter(response => response.rate === i).length;

					results.push( <td key={i}>{(counter / this.props.data.responses.length) * 100}% ({counter}/{this.props.data.responses.length})</td> );
				}
			}

			rightPanel = (
				<div className="edit">
					<h4>Your results</h4>
					{results.length ? (
						<table>
							<thead>
								<tr>
									{answers}
								</tr>
							</thead>
							<tbody>
								<tr>
									{results}
								</tr>
							</tbody>
						</table>
					) : (
						<p>Empty results.</p>
					)}
					<Link className='button' to={"/questioneditor?question=" + this.props.data._id}>Edit question</Link>
					<Link className='button' to={"/confirmdelete?question=" + this.props.data._id}>Delete question</Link>
				</div>
			);

		} else if (this.props.element === 'fill') {
			
			let answers = [];
			let value;

			if (this.props.data.response) {

				value = this.props.data.response.rate;
			}

			for(let i = this.props.data.scale.from;i <= this.props.data.scale.to; i++) {

				let selected = value === i || this.state.value === i;
				
				answers.push(
					<div className={'group ' + (selected || this.state.value === i ? 'active' : this.state.disabled || value ? 'inactive' : '')} key={i}>
						<input type="radio" name={this.props.data._id} checked={selected} disabled={this.state.disabled || value} value={i} id={'_' + this.props.data._id + '-' + i} onChange={this.setAnswer.bind(this)}/> 
						<label htmlFor={'_' + this.props.data._id + '-' + i}>{i}</label>
					</div>
				);
			}

			rightPanel = (
				<div className="answer">
					{value || this.state.disabled ? <h4>Already answered</h4> : <h4>Set the answer for this question</h4>}
					{answers}
				</div>
			);
		}

		return(
			<div className='question-element' style={{ color: this.props.data.theme.color, backgroundColor: this.props.data.theme.backgroundColor }}>
				<div className="desc">
					<h3>{this.props.number + 1}. {this.props.data.name}</h3>
					{this.props.data.description && <p>{this.props.data.description}</p>}
				</div>
				{rightPanel}
			</div>
		);
	}
}