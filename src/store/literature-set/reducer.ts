import { Reducer } from 'redux'

import { LiteratureSetActionTypes, LiteratureSetState } from './types'

const initialState: LiteratureSetState = {
    data: null,
    errors: undefined,
    loading: false
};

const reducer: Reducer<LiteratureSetState> = (state = initialState, action) => {
    switch (action.type) {
        case LiteratureSetActionTypes.FETCH_REQUEST: {
            return {...state, loading: true}
        }
        case LiteratureSetActionTypes.FETCH_SUCCESS: {
            return {...state, loading: false, data: action.payload}
        }
        case LiteratureSetActionTypes.FETCH_ERROR: {
            return {...state, loading: false, errors: action.payload}
        }
        default: {
            return state
        }
    }
};

export { reducer as literatureSetReducer }