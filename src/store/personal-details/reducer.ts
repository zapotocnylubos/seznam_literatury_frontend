import { Reducer } from 'redux'

import { PersonalDetailsActionTypes, PersonalDetailsState } from './types'

const initialState: PersonalDetailsState = {
    name: '',
    class: '',
    year: '',
};

const reducer: Reducer<PersonalDetailsState> = (state = initialState, action) => {
    switch (action.type) {
        case PersonalDetailsActionTypes.SET_PERSON_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        case PersonalDetailsActionTypes.SET_PERSON_CLASS: {
            return {
                ...state,
                class: action.payload
            }
        }
        case PersonalDetailsActionTypes.SET_PERSON_YEAR: {
            return {
                ...state,
                year: action.payload
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as personalDetailsReducer }