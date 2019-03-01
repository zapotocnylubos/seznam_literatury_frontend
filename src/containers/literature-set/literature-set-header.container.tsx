import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { LiteratureSet } from "../../types/literature-set";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getSelectedBooksCount, isMinimumBookCountMet } from '../../selectors/book.selector'
import {
    getSelectedBooksLiteratureFormsCounts,
    isMinimumLiteratureFormsCountsMet
} from "../../selectors/literature-form.selector";

interface ComponentProps {
    // literatureGroup: LiteratureGroup
}

interface PropsFromState {
    data: LiteratureSet | null
    selectedBooksCount: number
    isMinimumBookCountMet: boolean,
    selectedBooksLiteratureFormsCounts: { [key: number]: number } | null
    isMinimumLiteratureFormsCountsMet: { [key: number]: boolean } | null
}

type AllProps = ComponentProps & PropsFromState

class LiteratureSetContainer extends Component<AllProps> {
    render() {
        const {data, selectedBooksCount, isMinimumBookCountMet, selectedBooksLiteratureFormsCounts, isMinimumLiteratureFormsCountsMet} = this.props;
        if (!data) return null;

        const {required_book_count, author_max_count, required_literature_forms} = data;

        return (
            <div>
                <div className={'col-sm-6'}>
                    <Form.Group as={Row}>
                        <Col sm={6}>
                            <Form.Label>Jméno a příjmení:</Form.Label>
                        </Col>
                        <Col sm={6}>
                            <Form.Control size="sm" type="text"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={6}>
                            <Form.Label>Třída:</Form.Label>
                        </Col>
                        <Col sm={6}>
                            <Form.Control size="sm" type="text"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col sm={6}>
                            <Form.Label>Školní rok:</Form.Label>
                        </Col>
                        <Col sm={6}>
                            <Form.Control size="sm" type="text"/>
                        </Col>
                    </Form.Group>
                </div>
                <h2 className={'text-center my-2'}>
                    <strong>Seznam děl pro ústní část maturitní zkoušky</strong>
                </h2>
                <div className="text-center d-print-none">
                    <p className="mb-0">
                        Požadovaný počet knih: <span
                        className={isMinimumBookCountMet ? 'text-success' : 'text-danger'}>({selectedBooksCount} / {required_book_count})</span>
                    </p>
                    <p className="mb-0">Maximální počet knih od stejného autora: {author_max_count}</p>

                    {required_literature_forms.length > 0 && <p className="mb-0">
                        Minimální počet literárních forem:&nbsp;
                        {required_literature_forms.map(({literature_form_id, literature_form, min_count}, index) =>
                            <span key={index}>
                                {literature_form}:
                                <span
                                    className={isMinimumLiteratureFormsCountsMet && isMinimumLiteratureFormsCountsMet[literature_form_id] ? 'text-success' : 'text-danger'}>
                                    ({selectedBooksLiteratureFormsCounts && selectedBooksLiteratureFormsCounts[literature_form_id] + " / "}{min_count})
                                </span>{index != required_literature_forms.length - 1 && ", "}
                            </span>
                        )}
                    </p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    data: state.literatureSet.data,
    selectedBooksCount: getSelectedBooksCount(state),
    isMinimumBookCountMet: isMinimumBookCountMet(state),
    selectedBooksLiteratureFormsCounts: getSelectedBooksLiteratureFormsCounts(state),
    isMinimumLiteratureFormsCountsMet: isMinimumLiteratureFormsCountsMet(state)
});

export default connect(
    mapStateToProps
)(LiteratureSetContainer)