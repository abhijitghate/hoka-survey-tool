import React from "react";
import Form from "../form/Form";
import { Button, Modal, Input, Row } from "antd";
import { connect } from "react-redux";
import {
	addQuestion,
	populateQuestion,
	handleOk,
	handleCancel,
	clearQuestionsMethod
} from "../../store/actions/actions";
import axios from "axios";
import "./FormDetails.css";

class FormDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: ""
		};
	}

	newQuestion = e => {
		this.setState({
			question: e.target.value
		});
	};

	componentDidMount() {
		let formId = this.props.match.params.formId;
		axios({
			method: "post",
			url: "http://13.233.138.223:8000/fetch-questions/",
			data: { formId: formId }
		}).then(res => {
			let questionList = [];
			res.data.questionList.map((k, v) => {
				questionList.push({
					questionStatement: k["questionStatement"],
					questionId: k["questionId"]
				});
			});

			this.props.populateQue(questionList);
		});
	}
	componentWillUnmount() {
		this.props.clearQuestions();
	}
	render() {
		let data_obj = {
			question: this.state.question,
			formId: window.location.href.split("/")[4]
		};
		return (
			<div className="form-container">
				<div className="form-details-style">
					<Form />
					<Button onClick={this.props.addQue}>Add Question</Button>
				</div>
				<div>
					<Modal
						title="Add a new question"
						visible={this.props.showAddQuestionModal}
						onOk={e => this.props.handleOkModal(data_obj)}
						onCancel={this.props.handleCancelModal}
					>
						<Input
							placeholder="Add question here..."
							onChange={this.newQuestion}
						/>
					</Modal>
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
		addQue: e => dispatch(addQuestion(e)),
		populateQue: e => dispatch(populateQuestion(e)),
		handleOkModal: e => dispatch(handleOk(e)),
		handleCancelModal: () => dispatch(handleCancel()),
		clearQuestions: () => dispatch(clearQuestionsMethod())
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(FormDetails);
