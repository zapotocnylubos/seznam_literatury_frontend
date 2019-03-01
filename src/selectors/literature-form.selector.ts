import * as _ from 'lodash';
import { createSelector } from "reselect";
import { ApplicationState } from "../store";

import { getFlattenedSelectedBooks } from './book.selector';

export const getRequiredLiteratureForm = (state: ApplicationState, {literatureFormId}: { literatureFormId: number }) => {
    return _.find(_.get(state.literatureSet.data, 'required_literature_forms'), {literature_form_id: literatureFormId});
};

export const getRequiredLiteratureFormSelectedBooks = createSelector(
    [getRequiredLiteratureForm, getFlattenedSelectedBooks],
    (requiredLiteratureForm, flattenedSelectedBooks) => {
        return _.filter(flattenedSelectedBooks, {literature_form_id: _.get(requiredLiteratureForm, 'literature_form_id')})
    });

export const isRequiredLiteratureFormCountMet = createSelector(
    [getRequiredLiteratureForm, getRequiredLiteratureFormSelectedBooks],
    (requiredLiteratureForm, requiredLiteratureFormSelectedBooks) => {
        return requiredLiteratureFormSelectedBooks.length >= _.get(requiredLiteratureForm, 'min_count', 0);
    });
