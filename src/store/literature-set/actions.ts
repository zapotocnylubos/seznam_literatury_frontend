import { action } from 'typesafe-actions'

import { LiteratureSet } from "../../types/literature-set";
import { LiteratureSetActionTypes } from "./types";

export const fetchRequest = () => action(LiteratureSetActionTypes.FETCH_REQUEST);

export const fetchSuccess = (data: LiteratureSet | null) => action(LiteratureSetActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(LiteratureSetActionTypes.FETCH_ERROR, message);