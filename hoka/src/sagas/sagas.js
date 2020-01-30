import { all, fork, takeEvery, put, call } from "redux-saga/effects";
import { handleOkAsyncAction, submitFormAsyncAction } from "./asyncActions";
import { submitFormApi, handleOkApi } from "./api";

function* handleOkAsync(e) {
	try {
		const data = yield call(handleOkApi, e);
		yield put(handleOkAsyncAction(data));
	} catch (err) {
		console.log(err);
	}
}

function* watchHandleOk() {
	yield takeEvery("HANDLE_OK", e => handleOkAsync(e.payload));
}

function* submitFormAsync(e) {
	try {
		const data = yield call(submitFormApi, e);
		yield put(submitFormAsyncAction(data));
	} catch (err) {
		console.log(err);
	}
}
function* watchSubmitForm() {
	yield takeEvery("SUBMIT_FORM", e => submitFormAsync(e.payload));
}

export default function* rootSaga() {
	yield all([fork(watchHandleOk), fork(watchSubmitForm)]);
}
