import { createSelector } from "reselect";

import { arePersonalDetailsFilled } from "./personal-details.selector";
import { isRequiredLiteratureFormsCountMet } from "./literature-form.selector";
import { isMaxSelectedBooksForAuthorExceeded, isRequiredBookCountMet } from "./literature-set.selector";
import { isRequiredSelectedBooksCountInGroupsMet } from "./literature-group.selector";


export const isFormValid = createSelector(
    [
        arePersonalDetailsFilled,
        isRequiredBookCountMet,
        isRequiredSelectedBooksCountInGroupsMet,
        isRequiredLiteratureFormsCountMet,
        isMaxSelectedBooksForAuthorExceeded
    ],
    (
        arePersonalDetailsFilled,
        isRequiredBookCountMet,
        isRequiredSelectedBooksCountInGroupsMet,
        isRequiredLiteratureFormsCountMet,
        isMaxSelectedBooksForAuthorExceeded
    ) => {
        return arePersonalDetailsFilled
            && isRequiredBookCountMet
            && isRequiredSelectedBooksCountInGroupsMet
            && isRequiredLiteratureFormsCountMet
            && !isMaxSelectedBooksForAuthorExceeded
    });