import { LiteratureGroup } from "./literature-group";
import { RequiredLiteratureForm } from "./required-literature-form";


export type LiteratureSet = {
    period: string;
    required_book_count: number;
    author_max_count: number;
    literature_groups: LiteratureGroup[];
    required_literature_forms: RequiredLiteratureForm[];
}