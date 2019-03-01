import { Book } from "./book";

export type LiteratureGroup = {
    id: number;
    title: string;
    min_count: number;
    books: Book[];
}