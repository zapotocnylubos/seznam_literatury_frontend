import * as _ from 'lodash';
import { createSelector } from "reselect";
import { ApplicationState } from "../store";

import { getFlattenedSelectedBooks } from "./selected-book.selector";


export const getRequiredBookCount = (state: ApplicationState) => _.get(state.literatureSet.data, 'required_book_count');
export const getMaxSelectedBookCountForAuthor = (state: ApplicationState) => _.get(state.literatureSet.data, 'author_max_count', 0);

export const isRequiredBookCountMet = createSelector(
    [getFlattenedSelectedBooks, getRequiredBookCount],
    (flattenedSelectedBooks, requiredBookCount) => _.size(flattenedSelectedBooks) === requiredBookCount);

export const getMaxSelectedBooksForAuthor = createSelector(
    [getFlattenedSelectedBooks],
    (flattenedSelectedBooks) => {
        return _.max(_.values(_.countBy(flattenedSelectedBooks, 'author_id'))) || 0;
    }
);

export const isMaxSelectedBooksForAuthorExceeded = createSelector(
    [getMaxSelectedBooksForAuthor, getMaxSelectedBookCountForAuthor],
    (maxSelectedBooksForAuthor, maxSelectedBookCountForAuthor) => {
        return maxSelectedBooksForAuthor > maxSelectedBookCountForAuthor;
    }
);
