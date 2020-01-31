import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { connect } from "react-redux";

import { Layout, Menu, Breadcrumb } from "antd";
import FormCardList from "../../containers/form-card-list/FormCardList";

const { Header, Content, Footer } = Layout;

class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log("from home page", this.props.cards);
		return (
			<Layout className="layout">
				<Header>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						style={{ lineHeight: "64px" }}
					>
						<Menu.Item key="1">
							<Link to="/home-page/" />
							Home
						</Menu.Item>

						<Menu.Item href="/create-form/" key="2">
							<Link to="/create-form/" />
							Create Form
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: "0 50px" }}>
					<div
						style={{
							background: "#fff",
							padding: 24,
							minHeight: 280
						}}
					>
						<FormCardList />
					</div>
				</Content>
			</Layout>
		);
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

export default connect(mapStateToProps, mapDispathcToProps)(HomePage);
