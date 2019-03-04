import { createSelector } from "reselect";
import { isRequiredLiteratureFormsCountMet } from "./literature-form.selector";
import { isMaxSelectedBooksForAuthorExceeded, isRequiredBookCountMet } from "./literature-set.selector";
import { isRequiredSelectedBooksCountInGroupsMet } from "./literature-group.selector";


export const isFormValid = createSelector(
    [
        isRequiredBookCountMet,
        isRequiredSelectedBooksCountInGroupsMet,
        isRequiredLiteratureFormsCountMet,
        isMaxSelectedBooksForAuthorExceeded
    ],
    (
        isRequiredBookCountMet,
        isRequiredSelectedBooksCountInGroupsMet,
        isRequiredLiteratureFormsCountMet,
        isMaxSelectedBooksForAuthorExceeded
    ) => {
        return isRequiredBookCountMet && isRequiredSelectedBooksCountInGroupsMet && isRequiredLiteratureFormsCountMet && !isMaxSelectedBooksForAuthorExceeded
    });