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

// getRequiredLiteratureForm(literatureFormId)   // pri hledani pouzit metodu find
// getRequiredLiteratureFormSelectedBooks(literatureFormId) << getRequiredLiteratureForm, book.getSelectedBooks
// isRequiredLiteratureFormCountMet(literatureFormId) << getRequiredLiteratureForm, getRequiredLiteratureFormBooks

export const getSelectedBooksLiteratureFormsCounts = createSelector(
    [getSelectedBooks, getRequiredLiteratureForms],
    (selectedBooks, requiredLiteratureForms) => {
        if (!requiredLiteratureForms) {
            return null;
        }

        const requiredLiteratureFormsResult = requiredLiteratureForms.reduce((forms, form) => {
            return {
                ...forms,
                [form.literature_form_id]: 0
            }
        }, {} as { [key: number]: number });

        selectedBooks.map(book => {
            requiredLiteratureFormsResult[book.literature_form_id]++
        });

        return requiredLiteratureFormsResult;
    });

export const isMinimumLiteratureFormsCountsMet = createSelector(
    [getSelectedBooksLiteratureFormsCounts, getRequiredLiteratureForms],
    (selectedBooksLiteratureFormsCounts, requiredLiteratureForms) => {
        if (!selectedBooksLiteratureFormsCounts) {
            return null;
        }

        if (!requiredLiteratureForms) {
            return null;
        }

        return Object.keys(selectedBooksLiteratureFormsCounts).reduce((result, literatureFormId) => {
            const literatureForm = requiredLiteratureForms.find(form => form.literature_form_id === +literatureFormId);
            if (!literatureForm) {
                return result;
            }

            return {
                ...result,
                [+literatureFormId]: selectedBooksLiteratureFormsCounts[+literatureFormId] >= literatureForm.min_count
            }
        }, {} as { [key: number]: boolean });
    });
