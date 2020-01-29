import React from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import { populateFormCards } from "../../store/actions/actions";
import "../../store/reducers/reducer";
import "./FormCardList.css";
import axios from "axios";

class FormCardList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/fetch-forms-cards/",
			data: {}
		}).then(res => {
			console.log("printing rsponse from formcardlist", res);
			let tempFormList = [];
			res.data.formList.map((k, v) => {
				tempFormList.push({
					name: k["formName"],
					id: k["formId"],
					responseCount: k["numberOfResponses"],
					respondants: k["respondants"],
					url: k["url"]
				});
			});

			this.props.populateForm(tempFormList);
		});
	}

	render() {
		let formCards;
		formCards = this.props.cards.map(function(key, value) {
			let href_card = "/form-details/" + key["id"];
			let respondants;
			if (key["respondants"]) {
				respondants = String(key["respondants"]);
			}

			return (
				<Col span={8}>
					<Card
						title={key["name"]}
						bordered={true}
						hoverable
						extra={
							<a className="edit-link" href={href_card}>
								Edit
							</a>
						}
						className="card-style"
					>
						<div>
							<p></p>
							<p>Responses - {key["numberOfResponses"]}</p>
							<p>Respondants - {respondants}</p>
							<a href={key["url"]}>link</a>
							<p>{key["url"]}</p>
						</div>
					</Card>
				</Col>
			);
		});
		return (
			<div>
				<Row gutter={[16, 16]}>{formCards}</Row>
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
		populateForm: e => dispatch(populateFormCards(e))
		// ageUp: () => dispatch({ type: "AGE_UP" }),
		// ageDown: () => dispatch({ type: "AGE_DOWN" })
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(FormCardList);

// export default FormCardList;
