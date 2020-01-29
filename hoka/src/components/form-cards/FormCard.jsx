import React from "react";
import { Card, Col, Row } from "antd";
import "./FormCard.css";

class FormCard extends React.Component {
	render() {
		// style={{ background: "#ECECEC", padding: "30px" }}
		return (
			<div>
				<div className="card-style">
					<Card
						title="Card title"
						bordered={false}
						className="card-style"
						style={{ width: 300 }}
					>
						<p>Card content</p>
						<p>Card content</p>
						<p>Card content</p>
					</Card>
				</div>
			</div>
		);
	}
}

export default FormCard;
