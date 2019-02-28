import React, { Component } from 'react';
import { LiteratureSet } from "../../types/literature-set";

interface ComponentProps {
    literatureSet: LiteratureSet
}

type AllProps = ComponentProps


class LiteratureSetHeaderComponent extends Component<AllProps> {
    render() {
        const {literatureSet: {period, required_book_count, author_max_count, required_literature_forms}} = this.props;
        return (
            <div className="text-center">
                <h1>Seznam literatury {period}</h1>
                <p className="mb-0">Požadovaný počet knih: {required_book_count}</p>
                <p className="mb-0">Maximální počet knih od stejného autora: {author_max_count}</p>

                {required_literature_forms.length > 0 && <p className="mb-0">
                    Minimální počet literárních forem:
                    {required_literature_forms.map((requiredLiteratureForm, index) =>
                        <>{requiredLiteratureForm.literature_form}: {requiredLiteratureForm.min_count}{index != required_literature_forms.length-1 && ","} </>
                    )}
                </p>}
            </div>
        );
    }
}

export default LiteratureSetHeaderComponent