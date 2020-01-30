export const handleOkAsyncAction = payload => {
	return {
		type: "HANDLE_OK_ASYNC",
		payload
	};
};

export const submitFormAsyncAction = payload => {
	return {
		type: "SUBMIT_FORM_ASYNC",
		payload
	};
};
