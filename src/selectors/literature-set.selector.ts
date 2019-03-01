import { ApplicationState } from "../store";

export const getRequiredBookCount = (state: ApplicationState) => state.literatureSet.data && state.literatureSet.data.required_book_count;
