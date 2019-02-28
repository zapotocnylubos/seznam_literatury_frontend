import { Book } from "./book";

export type LiteratureGroup = {
    title: string;
    min_count: number;
    books: Book[];
}