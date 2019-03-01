import * as _ from 'lodash';
import { ApplicationState } from "../store";

import { Book } from "../types/book";
import { createSelector } from "reselect";

// getFlattenedSelectedBooks
// getSelectedBooksInGroup(groupId)
// isBookSelected(groupId, book) ! << getSelectedBooksInGroup
// isRequiredBookCountMet << getSelectedBooks, literature-set.getRequiredBookCount

export const getFlattenedSelectedBooks = (state: ApplicationState) => _.flatten(_.values(state.books.selectedBooks));

export const getSelectedBooksInGroup = (state: ApplicationState, {groupId}: { groupId: number }) => _.get(state.books.selectedBooks, groupId, [] as Book[]);

export const isBookSelectedInGroup = (state: ApplicationState, {groupId, book}: { groupId: number, book: Book }) => !!_.find(_.get(state.books.selectedBooks, groupId), book);


export const getFlattenedBooks = (state: ApplicationState) => _.reduce(
    _.get(state.literatureSet.data, 'literature_groups'),
    (books, group) => [...books, ...group.books],
    [] as Book[]);


export const getBookIndex = createSelector(
    [getFlattenedBooks, (state: ApplicationState, {book}: {book: Book}) => book],
    (flattenedBooks, book) => _.findIndex(flattenedBooks, book));


export const getSelectedBookIndex = createSelector(
    [getFlattenedSelectedBooks, (state: ApplicationState, {book}: {book: Book}) => book],
    (flattenedSelectedBooks, book) => _.findIndex(flattenedSelectedBooks, book));