import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { LiteratureSet } from "../../types/literature-set";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getFlattenedSelectedBooks } from "../../selectors/book.selector";
import {
    getMaxSelectedBooksForAuthor,
    isMaxSelectedBooksForAuthorExceeded,
    isRequiredBookCountMet
} from "../../selectors/literature-set.selector";
import {
    getRequiredLiteratureFormSelectedBooks,
    isRequiredLiteratureFormCountMet
} from "../../selectors/literature-form.selector";

interface ComponentProps {
    // literatureGroup: LiteratureGroup
}

interface PropsFromState {
    data: LiteratureSet | null

    flattenedSelectedBooksCount: number
    isRequiredBookCountMet: boolean

    maxSelectedBooksForAuthor: number
    isMaxSelectedBooksForAuthorExceeded: boolean

    getRequiredLiteratureFormSelectedBooksCount: (literatureFormId: number) => number
    isRequiredLiteratureFormCountMet: (literatureFormId: number) => boolean
}

type AllProps = ComponentProps & PropsFromState

class LiteratureSetContainer extends Component<AllProps> {
    render() {
        const {data} = this.props;
        if (!data) return null;

        const {flattenedSelectedBooksCount, isRequiredBookCountMet} = this.props;
        const {getRequiredLiteratureFormSelectedBooksCount, isRequiredLiteratureFormCountMet} = this.props;
        const {maxSelectedBooksForAuthor, isMaxSelectedBooksForAuthorExceeded} = this.props;

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
                        Požadovaný počet knih:&nbsp;
                        <span className={isRequiredBookCountMet ? 'text-success' : 'text-danger'}>
                        ({flattenedSelectedBooksCount} / {required_book_count})
                    </span>
                    </p>
                    <p className="mb-0">Maximální počet knih od stejného autora:&nbsp;
                        <span className={!isMaxSelectedBooksForAuthorExceeded ? 'text-success' : 'text-danger'}>
                            ({maxSelectedBooksForAuthor} / {author_max_count})
                        </span>
                    </p>

                    {required_literature_forms.length > 0 && <p className="mb-0">
                        Minimální počet literárních forem:&nbsp;
                        {required_literature_forms.map(({literature_form_id, literature_form, min_count}, index) =>
                            <span key={index}>
                                {literature_form}:&nbsp;
                                <span
                                    className={isRequiredLiteratureFormCountMet(literature_form_id) ? 'text-success' : 'text-danger'}>
                                    ({getRequiredLiteratureFormSelectedBooksCount(literature_form_id)} / {min_count})
                                </span>{index !== required_literature_forms.length - 1 && ", "}
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

    flattenedSelectedBooksCount: getFlattenedSelectedBooks(state).length,
    isRequiredBookCountMet: isRequiredBookCountMet(state),

    maxSelectedBooksForAuthor: getMaxSelectedBooksForAuthor(state),
    isMaxSelectedBooksForAuthorExceeded: isMaxSelectedBooksForAuthorExceeded(state),

    getRequiredLiteratureFormSelectedBooksCount: (literatureFormId: number) => getRequiredLiteratureFormSelectedBooks(state, {literatureFormId}).length,
    isRequiredLiteratureFormCountMet: (literatureFormId: number) => isRequiredLiteratureFormCountMet(state, {literatureFormId}),
});

export default connect(
    mapStateToProps
)(LiteratureSetContainer)