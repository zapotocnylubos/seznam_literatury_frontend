import { action } from 'typesafe-actions'

import { PersonalDetailsActionTypes } from "./types";

export const setPersonName = (name: string) => action(PersonalDetailsActionTypes.SET_PERSON_NAME, name);
export const setPersonClass = (className: string) => action(PersonalDetailsActionTypes.SET_PERSON_CLASS, className);
export const setPersonYear = (year: string) => action(PersonalDetailsActionTypes.SET_PERSON_YEAR, year);
