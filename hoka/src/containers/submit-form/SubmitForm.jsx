import React from "react";
import Form from "../form/Form";
import Question from "../../components/question/Question";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./SubmitForm.css";

import { populateQuestion, submitForm } from "../../store/actions/actions";

class SubmitForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}
	// recordAuthor = e => {
	// 	this.setState({
	// 		author: e.target.value
	// 	});
	// };
	onChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}
	handleSubmit = e => {
		e.preventDefault();

		this.props.submitFrm(this.state);
		this.props.history.push("/thank-you/");
	};
	componentDidMount() {
		let formId = this.props.match.params.formId;
		this.setState({
			formId: formId
		});
		axios({
			method: "post",
			url: "http://13.233.138.223:8000/fetch-questions/",
			data: { formId: formId }
		}).then(res => {
			console.log(res);
			let questionListTemp = [];
			res.data.questionList.map((k, v) => {
				questionListTemp.push({
					questionStatement: k["questionStatement"],
					questionId: k["questionId"]
				});
			});

			this.props.populateQue(questionListTemp);
		});
	}
	render() {
		let questions;
		let that = this;
		questions = this.props.questions.map(function(key, value) {
			return (
				<div>
					<p>{key["name"]}</p>
					<input
						className="custom-input"
						id={key["id"]}
						onChange={that.onChange}
					/>
				</div>
			);
		});
		return (
			<div className="form-container">
				<div className="form-style">
					<form onSubmit={this.handleSubmit}>
						<div>{questions}</div>
						<input
							placeholder="Your name please"
							onChange={this.onChange}
							id="author"
							className="custom-input"
						></input>

						<button type="submit">Submit Form</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state
	};
};
const mapDispathcToProps = dispatch => {
	return {
		populateQue: e => dispatch(populateQuestion(e)),
		submitFrm: e => dispatch(submitForm(e))
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(SubmitForm);
