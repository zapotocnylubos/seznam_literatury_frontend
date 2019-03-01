import { action } from 'typesafe-actions'

import { Book } from "../../types/book";
import { BooksActionTypes } from "./types";

export const toggleSelection = (groupId: number, book: Book) => action(BooksActionTypes.TOGGLE_SELECTION, {groupId, book});