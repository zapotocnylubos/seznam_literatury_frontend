import { Book } from "../../types/book";

export enum BooksActionTypes {
    TOGGLE_SELECTION = '@@book/TOGGLE_SELECTION'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface BooksState {
    readonly selectedBooks: {
        [groupId: number]: Book[]
    }
}