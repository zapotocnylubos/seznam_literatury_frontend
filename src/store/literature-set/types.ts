import { LiteratureSet } from "../../types/literature-set";

export enum LiteratureSetActionTypes {
    FETCH_REQUEST = '@@literature-set/FETCH_REQUEST',
    FETCH_SUCCESS = '@@literature-set/FETCH_SUCCESS',
    FETCH_ERROR = '@@literature-set/FETCH_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface LiteratureSetState {
    readonly loading: boolean
    readonly data: (LiteratureSet | null)
    readonly errors?: string
}