import React from "react";

// class CreateForm extends React.Component{

//     constructor(props) {
// 		super(props);
// 		this.state = {
// 			questions: []
// 		};
// 	}
//     render(){
//         return(<div></div>)
//     }
// }

// export default CreateForm

import { Form, Input, Icon, Button } from "antd";
import axios from "axios";
import "./CreateForm.css";

let id = 0;

class CreateForm1 extends React.Component {
	remove = k => {
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue("keys");
		// We need at least one passenger
		if (keys.length === 1) {
			return;
		}

		// can use data-binding to set
		form.setFieldsValue({
			keys: keys.filter(key => key !== k)
		});
	};

	add = () => {
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue("keys");
		const nextKeys = keys.concat(id++);
		// can use data-binding to set
		// important! notify form to detect changes
		form.setFieldsValue({
			keys: nextKeys
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { keys, names } = values;
				console.log("Received values of form: ", values);
				console.log(
					"Merged values:",
					keys.map(key => names[key])
				);
			}
			// axios({
			// 	method: "post",
			// 	url: "http://127.0.0.1:8000/create-form/",
			// 	data: values
			// }).then(res => {
			// 	this.props.history.push("/home-page/");
			// 	console.log(res);
			// });
		});
	};

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 }
			}
		};
		const formItemLayoutWithOutLabel = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 20, offset: 4 }
			}
		};
		getFieldDecorator("keys", { initialValue: [] });
		const keys = getFieldValue("keys");
		const formItems = keys.map((k, index) => (
			<Form.Item
				{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
				label={index === 0 ? "Form Name" : "Question"}
				required={false}
				key={k}
			>
				{getFieldDecorator(`names[${k}]`, {
					validateTrigger: ["onChange", "onBlur"],
					rules: [
						{
							required: true,
							whitespace: true,
							message:
								"Please input a question or delete this field."
						}
					]
				})(
					<Input
						placeholder=""
						style={{ width: "60%", marginRight: 50 }}
					/>
				)}
				{keys.length > 1 ? (
					<Icon
						className="dynamic-delete-button"
						type="minus-circle-o"
						onClick={() => this.remove(k)}
					/>
				) : null}
			</Form.Item>
		));
		return (
			<div className="create-form-container">
				<div className="form-details-style">
					<Form onSubmit={this.handleSubmit}>
						{formItems}
						<div>
							<Form.Item {...formItemLayoutWithOutLabel}>
								<Button
									type="dashed"
									onClick={this.add}
									style={{ width: "35%" }}
									className="buttons"
								>
									<Icon type="plus" /> Add field
								</Button>
							</Form.Item>
							<Form.Item {...formItemLayoutWithOutLabel}>
								<Button
									type="primary"
									htmlType="submit"
									className="buttons"
								>
									Submit
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

const CreateForm = Form.create({ name: "dynamic_form_item" })(CreateForm1);

// const WrappedDynamicFieldSet = Form.create({ name: "dynamic_form_item" })(
export default CreateForm;
