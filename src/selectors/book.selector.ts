import * as _ from 'lodash';
import { ApplicationState } from "../store";

import { Book } from "../types/book";
import { createSelector } from "reselect";


export const getFlattenedBooks = (state: ApplicationState) => _.reduce(
    _.get(state.literatureSet.data, 'literature_groups'),
    (books, group) => [...books, ...group.books],
    [] as Book[]);


export const getBookIndex = createSelector(
    [getFlattenedBooks, (state: ApplicationState, {book}: { book: Book }) => book],
    (flattenedBooks, book) => _.findIndex(flattenedBooks, book));


