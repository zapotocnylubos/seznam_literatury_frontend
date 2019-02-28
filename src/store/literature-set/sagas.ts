import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

import { LiteratureSetActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi } from "../../utils/api";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:7000';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi, 'get', API_ENDPOINT, '/literature-set/active-literature-set');

        if (res.error) {
            yield put(fetchError(res.error));
        } else {
            yield put(fetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchError(err.stack!));
        } else {
            yield put(fetchError('An unknown error occured.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield takeEvery(LiteratureSetActionTypes.FETCH_REQUEST, handleFetch)
}

// Export our root saga.
// We can also use `fork()` here to split our saga into multiple watchers.
export function* heroesSaga() {
    yield all([fork(watchFetchRequest)])
}

export default heroesSaga
