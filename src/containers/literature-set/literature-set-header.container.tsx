import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { LiteratureSet } from "../../types/literature-set";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { getFlattenedSelectedBooks } from "../../selectors/selected-book.selector";
import {
    getMaxSelectedBooksForAuthor,
    isMaxSelectedBooksForAuthorExceeded,
    isRequiredBookCountMet
} from "../../selectors/literature-set.selector";
import {
    getRequiredLiteratureFormSelectedBooks,
    isRequiredLiteratureFormCountMet
} from "../../selectors/literature-form.selector";
import { isFormValid } from "../../selectors/form-errors.selector";
import classNames from "classnames";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import logo from './delta-logo.png';

interface PropsFromState {
    data: LiteratureSet | null

    isFormValid: boolean,

    flattenedSelectedBooksCount: number
    isRequiredBookCountMet: boolean

    maxSelectedBooksForAuthor: number
    isMaxSelectedBooksForAuthorExceeded: boolean

    getRequiredLiteratureFormSelectedBooksCount: (literatureFormId: number) => number
    isRequiredLiteratureFormCountMet: (literatureFormId: number) => boolean
}

type AllProps = PropsFromState

class LiteratureSetContainer extends Component<AllProps> {
    render() {
        const {data} = this.props;
        if (!data) return null;

        const {isFormValid} = this.props;
        const {flattenedSelectedBooksCount, isRequiredBookCountMet} = this.props;
        const {getRequiredLiteratureFormSelectedBooksCount, isRequiredLiteratureFormCountMet} = this.props;
        const {maxSelectedBooksForAuthor, isMaxSelectedBooksForAuthorExceeded} = this.props;

        const {required_book_count, author_max_count, required_literature_forms} = data;

        const validClass = classNames({
            'text-danger text-center': !isFormValid,
            'd-none': isFormValid
        });

        return (
            <div>
                <Row className={'d-none d-print-flex pb-3'}>
                    <Col sm={3} style={{textAlign: 'center'}}>
                        <img style={{maxHeight: '75px'}} src={logo} alt="DELTA logo"/>
                    </Col>
                    <Col sm={9} className={'d-flex align-items-center text-center'}>
                        DELTA - Střední škola informatiky a ekonomie, Základní škola <br/>
                        a Mateřská škola, s.r.o., Ke Kamenci 151, Pardubice
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col sm={8}>
                        <Form.Group as={Row}>
                            <Col sm={5}>
                                <Form.Label>Jméno a příjmení:</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control size="sm" type="text"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={5}>
                                <Form.Label>Třída:</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control size="sm" type="text"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={5}>
                                <Form.Label>Školní rok:</Form.Label>
                            </Col>
                            <Col sm={7}>
                                <Form.Control size="sm" type="text"/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm={4} className={'d-flex align-items-center'}>
                        {!isFormValid && <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id={`tooltip-print`}>
                                    Tento formulář <strong>není kompletní</strong>.
                                </Tooltip>
                            }>
                            <Button variant="warning" className={'mx-auto'}>
                                <i className="fas fa-print"></i> Vytisknout
                            </Button>
                        </OverlayTrigger>}

                        {isFormValid && <Button onClick={window.print} variant="success" className={'mx-auto'}>
                            <i className="fas fa-print"></i> Vytisknout
                        </Button>}
                    </Col>
                </Row>
                <h2 className={'text-center my-4'} id="title">
                    <strong>Seznam děl pro ústní část maturitní zkoušky</strong>
                </h2>
                <p className={validClass}>{!isFormValid && "Tento formulář není kompletní"}</p>
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

    isFormValid: isFormValid(state),

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