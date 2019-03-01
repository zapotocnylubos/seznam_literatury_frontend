import { ApplicationState } from "../store/index";

export const getLiteratureGroups = (state: ApplicationState) => state.literatureSet.data && state.literatureSet.data.literature_groups;


// isMinimumSelectedBooksCountMet(groupId) << getRequiredLiteratureForm, getRequiredLiteratureFormBooks


//use book.selector
export const isMinimumLiteratureGroupSelectedBooksCountMet = (
    state: ApplicationState,
    {groupId}: { groupId: number }
) => {

};