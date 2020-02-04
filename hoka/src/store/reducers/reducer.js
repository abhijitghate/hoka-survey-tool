import axios from "axios";

const initialState = {
	cards: [],
	questions: [],
	showAddQuestionModal: false
};

const reducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case "ADD_QUESTION":
			newState.showAddQuestionModal = true;

			return { ...newState };
		case "POPULATE_QUESTIONS":
			action.payload.map((k, v) => {
				newState.questions.push({
					name: k["questionStatement"],
					id: k["questionId"]
				});
			});
			return { ...state, newState };
		case "POPULATE_FORM_CARDS":
			action.payload.map((k, v) => {
				newState.cards.push({
					name: k["name"],
					id: k["id"],
					numberOfResponses: k["responseCount"],
					respondants: k["respondants"],
					url: k["url"]
				});
			});
			return { ...state, newState };
		case "HANDLE_OK_ASYNC":
			newState.showAddQuestionModal = false;
			return { ...newState };
		case "SUBMIT_FORM_ASYNC":
			newState.showAddQuestionModal = false;
			return { ...newState };
		case "HANDLE_CANCEL":
			newState.showAddQuestionModal = false;

			return { ...newState };
		case "CLEAR_QUESTIONS":
			newState.questions = [];
			return { ...state, newState };
		case "LOGIN_USER":
			// return authSuccess(state, action);
			break;
		// case "CREATE_NEW_FORM_ASYNC":
		// 	axios({
		// 		method: "post",
		// 		url: "http://13.233.138.223:8000/create-form/",
		// 		data: action.payload
		// 	}).then(res => {
		// 		console.log(res);
		// 	});
		// 	return { ...newState };

		default:
			return state;
	}
};

export default reducer;
