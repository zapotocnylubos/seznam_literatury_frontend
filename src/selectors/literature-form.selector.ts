import { ApplicationState } from "../store";
import { createSelector } from "reselect";
import { getSelectedBooks } from "./book.selector";

export const getRequiredLiteratureForms = (state: ApplicationState) => state.literatureSet.data && state.literatureSet.data.required_literature_forms;

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

        if(!requiredLiteratureForms) {
            return null;
        }

        return Object.keys(selectedBooksLiteratureFormsCounts).reduce((result, literatureFormId) => {
            const literatureForm = requiredLiteratureForms.find(form => form.literature_form_id === +literatureFormId);
            if(!literatureForm) {
                return result;
            }

            return {
                ...result,
                [+literatureFormId]: selectedBooksLiteratureFormsCounts[+literatureFormId] >= literatureForm.min_count
            }
        }, {} as { [key: number]: boolean });
    });
