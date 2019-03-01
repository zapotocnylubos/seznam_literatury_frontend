import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { LiteratureSet } from "../../types/literature-set";

interface ComponentProps {
    // literatureGroup: LiteratureGroup
}

interface PropsFromState {
    data: LiteratureSet | null
}

type AllProps = ComponentProps & PropsFromState

class LiteratureSetContainer extends Component<AllProps> {
    render() {
        const {data} = this.props;
        if (!data) return null;

        const {period, required_book_count, author_max_count, required_literature_forms} = data;

        return (
            <div className="text-center">
                <h1>Seznam literatury {period}</h1>
                <p className="mb-0">Požadovaný počet knih: {required_book_count}</p>
                <p className="mb-0">Maximální počet knih od stejného autora: {author_max_count}</p>

                {required_literature_forms.length > 0 && <p className="mb-0">
                    Minimální počet literárních forem:&nbsp;
                    {required_literature_forms.map(({literature_form, min_count}, index) =>
                        <span key={index}>
                            {literature_form}: {min_count}{index != required_literature_forms.length - 1 && ", "}
                        </span>
                    )}
                </p>}
            </div>
        )
    }
}

const mapStateToProps = ({literatureSet}: ApplicationState) => ({
    data: literatureSet.data
});

export default connect(
    mapStateToProps
)(LiteratureSetContainer)