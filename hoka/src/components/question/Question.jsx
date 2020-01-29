import React from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import "./Question.css";

class Question extends React.Component {
	render() {
		return (
			<div className="input-container">
				<p>{this.props.question}</p>
				<input id={this.props.id} className="custom-input"></input>
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
		// ageUp: () => dispatch({ type: "AGE_UP" }),
		// ageDown: () => dispatch({ type: "AGE_DOWN" })
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(Question);
