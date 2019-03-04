import { createSelector } from "reselect";
import * as _ from "lodash";

import { ApplicationState } from "../store";
import { getSelectedBooks, getSelectedBooksInGroup } from "./selected-book.selector";


export const getLiteratureGroups = (state: ApplicationState) => _.get(state.literatureSet.data, 'literature_groups');

export const getLiteratureGroup = createSelector(
    [getLiteratureGroups, (state: ApplicationState, {groupId}: { groupId: number }) => groupId],
    (literatureGroups, groupId) => {
        return _.find(literatureGroups, {id: groupId});
    });

export const isRequiredSelectedBooksCountInGroupsMet = createSelector(
    [getSelectedBooks, getLiteratureGroups],
    (selectedBooks, literatureGroups) => {
        return _.every(_.map(literatureGroups, literatureGroup => {
            return _.size(_.get(selectedBooks, literatureGroup.id)) >= _.get(literatureGroup, 'min_count', 0)
        }))
    });

export const isRequiredSelectedBooksCountInGroupMet = createSelector(
    [getSelectedBooksInGroup, getLiteratureGroup],
    (selectedBooksInGroup, literatureGroup) => {
        return _.size(selectedBooksInGroup) >= _.get(literatureGroup, 'min_count', 0);
    });