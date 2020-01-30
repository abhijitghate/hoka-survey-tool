import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./components/login-component/Login";
import HomePage from "./components/home-page/HomePage";
import Form from "./containers/form/Form";
import FormDetails from "./containers/form-details/FormDetails";
import SubmitForm from "./containers/submit-form/SubmitForm";
import ThanksYou from "./components/thank-you/ThankYou";

const BaseRouter = () => (
	<div>
		<Route exact path="/" component={LoginPage}></Route>
		<Route exact path="/home-page/" component={HomePage}></Route>
		<Route exact path="/form/" component={Form}></Route>
		<Route exact path="/submit-form/:formId" component={SubmitForm}></Route>
		<Route exact path="/thank-you/" component={ThanksYou}></Route>

		<Route
			exact
			path="/form-details/:formId"
			component={FormDetails}
		></Route>
	</div>
);

export default BaseRouter;
