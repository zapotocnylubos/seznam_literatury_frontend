import * as _ from 'lodash';
import { createSelector } from "reselect";
import { ApplicationState } from "../store";

import { getFlattenedSelectedBooks } from './selected-book.selector';

export const getRequiredLiteratureForms = (state: ApplicationState) => _.get(state.literatureSet.data, 'required_literature_forms');

export const getRequiredLiteratureForm = createSelector(
    [getRequiredLiteratureForms, (state: ApplicationState, {literatureFormId}: { literatureFormId: number }) => literatureFormId],
    (requiredLiteratureForms, literatureFormId) => {
        return _.find(requiredLiteratureForms, {literature_form_id: literatureFormId});
    });

export const getRequiredLiteratureFormSelectedBooks = createSelector(
    [getRequiredLiteratureForm, getFlattenedSelectedBooks],
    (requiredLiteratureForm, flattenedSelectedBooks) => {
        return _.filter(flattenedSelectedBooks, {literature_form_id: _.get(requiredLiteratureForm, 'literature_form_id')})
    });

export const isRequiredLiteratureFormsCountMet = createSelector(
    [getRequiredLiteratureForms, getFlattenedSelectedBooks],
    (requiredLiteratureForms, flattenedSelectedBooks) => {
        return _.every(_.map(requiredLiteratureForms, requiredLiteratureForm => {
            const formBooks = _.filter(flattenedSelectedBooks, {literature_form_id: _.get(requiredLiteratureForm, 'literature_form_id')})
            return _.size(formBooks) >= _.get(requiredLiteratureForm, 'min_count', 0)
        }))
    });

export const isRequiredLiteratureFormCountMet = createSelector(
    [getRequiredLiteratureForm, getRequiredLiteratureFormSelectedBooks],
    (requiredLiteratureForm, requiredLiteratureFormSelectedBooks) => {
        return _.size(requiredLiteratureFormSelectedBooks) >= _.get(requiredLiteratureForm, 'min_count', 0);
    });
