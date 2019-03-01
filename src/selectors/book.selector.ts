import { createSelector } from "reselect";
import * as _ from 'lodash';
import { ApplicationState } from "../store";

import { getRequiredBookCount } from "./literature-set.selector";
import { Book } from "../types/book";

// getFlattenedSelectedBooks
// getSelectedBooksInGroup(groupId)
// isBookSelected(groupId, book) ! << getSelectedBooksInGroup
// isRequiredBookCountMet << getSelectedBooks, literature-set.getRequiredBookCount

export const getFlattenedSelectedBooks = (state: ApplicationState) => _.flatten(_.values(state.books.selectedBooks));

export const getSelectedBooksInGroup = (state: ApplicationState, {groupId}: { groupId: number }) => _.get(state.books.selectedBooks, groupId);

export const isBookSelectedInGroup = (state: ApplicationState, {groupId, book}: { groupId: number, book: Book }) => !!_.find(_.get(state.books.selectedBooks, groupId), book);

export const isRequiredBookCountMet = createSelector(
    [getFlattenedSelectedBooks, getRequiredBookCount],
    (flattenedSelectedBooks, requiredBookCount) => flattenedSelectedBooks.length === requiredBookCount);



// export const isBookSelected = (
//     state: ApplicationState,
//     {groupId, book}: { groupId: number, book: Book } // container props
// ) => state.books.selectedBooks[groupId] && state.books.selectedBooks[groupId].includes(book);
//
// export const getSelectedBooks = (
//     state: ApplicationState
// ) => Object.keys(state.books.selectedBooks).reduce((books, key) => {
//     return [
//         ...books,
//         ...state.books.selectedBooks[+key]
//     ]
// }, [] as Book[]);
//
// export const getSelectedBooksCount = createSelector(
//     [getSelectedBooks],
//     (selectedBooks) => {
//         return selectedBooks.length;
//     }
// );
//
// export const isMinimumBookCountMet = createSelector(
//     [getSelectedBooksCount, getRequiredBookCount],
//     (selectedBooksCount, requiredBooksCount) => {
//         return selectedBooksCount === requiredBooksCount;
//     }
// );
