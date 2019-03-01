import { createSelector } from "reselect";
import * as _ from "lodash";

import { ApplicationState } from "../store";
import { getSelectedBooksInGroup } from "./book.selector";


// isRequiredSelectedBooksCountInGroupMet(groupId) << getRequiredLiteratureForm, getRequiredLiteratureFormBooks

export const getLiteratureGroup = (state: ApplicationState, {groupId}: { groupId: number }) => {
    return _.find(_.get(state.literatureSet.data, 'literature_groups'), {id: groupId});
};

export const isRequiredSelectedBooksCountInGroupMet = createSelector(
    [getSelectedBooksInGroup, getLiteratureGroup],
    (selectedBooksInGroup, literatureGroup) => {
        return selectedBooksInGroup.length >= _.get(literatureGroup, 'min_count', 0);
    });