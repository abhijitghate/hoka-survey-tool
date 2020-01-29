import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom";

import BaseRouter from "./router";
import { connect } from "react-redux";

function App() {
	return (
		<div className="App">
			<Router>
				<BaseRouter />
			</Router>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		...state
	};
};
const mapDispathcToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispathcToProps)(App);
