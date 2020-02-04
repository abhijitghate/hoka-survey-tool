import axios from "axios";

export const submitFormApi = async d => {
	try {
		console.log("async", d);
		const response = await axios({
			method: "post",
			url: "http://13.233.138.223:8000/submit-form/",
			data: d
		});
		const data = await response.json();
		return response;
	} catch (e) {
		console.log(e);
	}
};

export const handleOkApi = async d => {
	try {
		console.log("async", d);
		const response = await axios({
			method: "post",
			url: "http://13.233.138.223:8000/add-question/",
			data: d
		}).then(res => {
			console.log(res);
		});
		const data = await response.json();
		return response;
	} catch (e) {
		console.log(e);
	}
};
