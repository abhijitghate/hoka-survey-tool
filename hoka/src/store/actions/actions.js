export const addQuestion = payload => {
	return {
		type: "ADD_QUESTION",
		payload
	};
};

export const populateQuestion = payload => {
	return {
		type: "POPULATE_QUESTIONS",
		payload
	};
};
// /populateFormCards

export const populateFormCards = payload => {
	return {
		type: "POPULATE_FORM_CARDS",
		payload
	};
};

//handleOk
export const handleOk = payload => {
	return {
		type: "HANDLE_OK",
		payload
	};
};

export const handleCancel = payload => {
	return {
		type: "HANDLE_CANCEL",
		payload
	};
};

//submitForm
export const submitForm = payload => {
	return {
		type: "SUBMIT_FORM",
		payload
	};
};

//createNewForm
export const createNewForm = payload => {
	return {
		type: "CREATE_NEW_FORM",
		payload
	};
};

export const clearQuestionsMethod = payload => {
	return {
		type: "CLEAR_QUESTIONS",
		payload
	};
};
