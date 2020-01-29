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
				console.log(k);
				newState.cards.push({
					name: k["name"],
					id: k["id"],
					numberOfResponses: k["responseCount"],
					respondants: k["respondants"],
					url: k["url"]
				});
			});
			console.log(newState.cards);
			return { ...state, newState };
		case "HANDLE_OK":
			console.log(action.payload);
			axios({
				method: "post",
				url: "http://127.0.0.1:8000/add-question/",
				data: action.payload
			}).then(res => {
				console.log(res);
			});

			newState.showAddQuestionModal = false;
			return { ...newState };
		case "SUBMIT_FORM":
			axios({
				method: "post",
				url: "http://127.0.0.1:8000/submit-form/",
				data: action.payload
			}).then(res => {
				console.log(res);
			});

			newState.showAddQuestionModal = false;
			return { ...newState };
		case "HANDLE_CANCEL":
			newState.showAddQuestionModal = false;

			return { ...newState };
		case "LOGIN_USER":
			// return authSuccess(state, action);
			break;
		case "CREATE_NEW_FORM":
			axios({
				method: "post",
				url: "http://127.0.0.1:8000/create-form/",
				data: action.payload
			}).then(res => {
				console.log(res);
			});
			return { ...newState };

		default:
			return state;
	}

	// return newState;
};

export default reducer;
