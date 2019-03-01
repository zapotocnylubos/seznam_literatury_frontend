import { ApplicationState } from "../../store";
import { Book } from "../../types/book";

export const isBookSelected = (
    state: ApplicationState,
    {groupId, book}: { groupId: number, book: Book } // container props
) => state.books.selectedBooks[groupId] && state.books.selectedBooks[groupId].includes(book);
