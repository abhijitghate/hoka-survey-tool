import React from "react";
import Question from "../../components/question/Question";

import { connect } from "react-redux";

class Form extends React.Component {
	render() {
		let questions;
		questions = this.props.questions.map(function(key, value) {
			return <Question question={key["name"]} id={key["id"]} />;
		});
		return <div>{questions}</div>;
	}
}

const mapStateToProps = state => {
	return {
		...state
	};
};
const mapDispathcToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispathcToProps)(Form);
