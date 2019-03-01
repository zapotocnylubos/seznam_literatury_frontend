import * as _ from 'lodash';
import { ApplicationState } from "../store";

export const getRequiredBookCount = (state: ApplicationState) => _.get(state.literatureSet.data, 'required_book_count');
