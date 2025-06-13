import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'

import { PersonalDetailsState } from "./personal-details/types";
import { personalDetailsReducer } from "./personal-details/reducer";

import { LiteratureSetState } from './literature-set/types'
import { literatureSetReducer } from './literature-set/reducer'
import literatureSetSaga from './literature-set/sagas'

import { BooksState } from "./books/types";
import { booksReducer } from "./books/reducer";

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
    personalDetails: PersonalDetailsState;
    literatureSet: LiteratureSetState;
    books: BooksState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
    personalDetails: personalDetailsReducer,
    literatureSet: literatureSetReducer,
    books: booksReducer
});


// We `fork()` these tasks so they execute in the background.
export function* rootSaga() {
    yield all([
        fork(literatureSetSaga),
        // `fork()` any other store sagas down here...
    ])
}