import { ApplicationState } from "../store";
import { Book } from "../types/book";
import { createSelector } from "reselect";
import { getRequiredBookCount } from "./literature-set.selector";

export const isBookSelected = (
    state: ApplicationState,
    {groupId, book}: { groupId: number, book: Book } // container props
) => state.books.selectedBooks[groupId] && state.books.selectedBooks[groupId].includes(book);

export const getSelectedBooks = (
    state: ApplicationState
) => Object.keys(state.books.selectedBooks).reduce((books, key) => {
    return [
        ...books,
        ...state.books.selectedBooks[+key]
    ]
}, [] as Book[]);

export const getSelectedBooksCount = createSelector(
    [getSelectedBooks],
    (selectedBooks) => {
        return selectedBooks.length;
    }
);

export const isMinimumBookCountMet = createSelector(
    [getSelectedBooksCount, getRequiredBookCount],
    (selectedBooksCount, requiredBooksCount) => {
        return selectedBooksCount === requiredBooksCount;
    }
);
