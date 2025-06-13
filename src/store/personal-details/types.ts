export enum PersonalDetailsActionTypes {
    SET_PERSON_NAME = '@@personal-details/SET_PERSON_NAME',
    SET_PERSON_CLASS = '@@personal-details/SET_PERSON_CLASS',
    SET_PERSON_YEAR = '@@personal-details/SET_PERSON_YEAR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PersonalDetailsState {
    readonly name: string;
    readonly class: string;
    readonly year: string;
}