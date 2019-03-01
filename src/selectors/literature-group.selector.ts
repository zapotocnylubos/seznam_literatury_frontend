import { ApplicationState } from "../store/index";
import { Book } from "../types/book";

export const getGroupErrors = (
    state: ApplicationState,
    {groupId, book}: { groupId: number, book: Book } // container props
) => state.books.selectedBooks[groupId] && state.books.selectedBooks[groupId].includes(book);
