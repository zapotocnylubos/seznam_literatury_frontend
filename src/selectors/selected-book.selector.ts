import { ApplicationState } from "../store";
import * as _ from "lodash";
import { Book } from "../types/book";
import { createSelector } from "reselect";
import { getFlattenedBooks } from "./book.selector";


export const getSelectedBooks = (state: ApplicationState) => state.books.selectedBooks;

export const getFlattenedSelectedBooks = (state: ApplicationState) => _.flatten(_.values(state.books.selectedBooks));

export const isBookSelectedInGroup = (state: ApplicationState, {groupId, book}: { groupId: number, book: Book }) => !!_.find(_.get(state.books.selectedBooks, groupId), book);

export const getSelectedBooksInGroup = createSelector(
    [getSelectedBooks, (state: ApplicationState, {groupId}: { groupId: number }) => groupId],
    (selectedBooks, groupId) => _.get(selectedBooks, groupId, [] as Book[])
);

export const getSelectedBookIndex = createSelector(
    [getFlattenedSelectedBooks, getFlattenedBooks, (state: ApplicationState, {book}: { book: Book }) => book],
    (flattenedSelectedBooks, flattenedBooks, book) => {
        return _.findIndex(
            _.sortBy(flattenedSelectedBooks, selectedBook => {
                return flattenedBooks.indexOf(selectedBook)
            }),
            book);
    });