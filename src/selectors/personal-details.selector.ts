import * as _ from 'lodash';
import { ApplicationState } from "../store";

import { PersonalDetails } from "../types/personal-details";
import { createSelector } from "reselect";

export const getPersonalDetails = (state: ApplicationState) => _.get(state, 'personalDetails', {} as PersonalDetails);

export const isPersonalDetailsNameFilled = createSelector(
    [getPersonalDetails],
    (personalDetails) => {
        return !!personalDetails.name;
    }
);

export const isPersonalDetailsClassFilled = createSelector(
    [getPersonalDetails],
    (personalDetails) => {
        return !!personalDetails.class;
    }
);

export const isPersonalDetailsYearFilled = createSelector(
    [getPersonalDetails],
    (personalDetails) => {
        return !!personalDetails.year;
    }
);

export const arePersonalDetailsFilled = createSelector(
    [isPersonalDetailsNameFilled, isPersonalDetailsClassFilled, isPersonalDetailsYearFilled],
    (isNameFilled, isClassFilled, isYearFilled) => {
        return isNameFilled && isClassFilled && isYearFilled;
    }
);

