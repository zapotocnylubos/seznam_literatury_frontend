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