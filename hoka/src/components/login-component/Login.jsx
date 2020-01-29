import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./Login.css";

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.loginUser(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="loginform">
				<Form.Item>
					{getFieldDecorator("username", {
						rules: [
							{
								required: true,
								message: "Please input your username!"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="user"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							placeholder="Username"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "Please input your Password!"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>
				<Form.Item className="align-bottom-items">
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button "
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const LoginPage = Form.create({ name: "normal_login" })(Login);

const mapStateToProps = state => {
	return {
		...state
	};
};
const mapDispathcToProps = dispatch => {
	return {
		loginUser: () => dispatch({ type: "LOGIN_USER" })
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(LoginPage);
