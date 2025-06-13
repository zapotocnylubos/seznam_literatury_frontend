import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    isPersonalDetailsNameFilled,
    isPersonalDetailsClassFilled,
    isPersonalDetailsYearFilled,
} from "../../selectors/personal-details.selector";
import { isFormValid } from "../../selectors/form-errors.selector";

import {
    setPersonName,
    setPersonClass,
    setPersonYear,
} from '../../store/personal-details/actions'

interface PropsFromState {
    isPersonalDetailsNameFilled: boolean,
    isPersonalDetailsClassFilled: boolean,
    isPersonalDetailsYearFilled: boolean,

    isFormValid: boolean,
}

interface PropsFromDispatch {
    setPersonName: (name: string) => void,
    setPersonClass: (className: string) => void,
    setPersonYear: (year: string) => void,
}

type AllProps = PropsFromState & PropsFromDispatch;

class PersonalDetails extends Component<AllProps> {
    render() {
        const {isFormValid} = this.props;

        const {
            setPersonName,
            setPersonClass,
            setPersonYear,
        } = this.props;

        return (
            <>
                <Form.Group as={Row} className={'mb-1'}>
                    <Col xs={4} className={'d-flex align-items-center'}>
                        <Form.Label className={'mb-0'}>
                            Jméno a příjmení:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            type="text"
                            onChange={(event: any) => setPersonName(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsNameFilled}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className={'mb-1'}>
                    <Col xs={4} className={'d-flex align-items-center'}>
                        <Form.Label className={'mb-0'}>
                            Třída:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            type="text"
                            onChange={(event: any) => setPersonClass(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsClassFilled}
                        />

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className={'mb-1'}>
                    <Col xs={4} className={'d-flex align-items-center'}>
                        <Form.Label className={'mb-0'}>
                            Školní rok:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            type="text"
                            onChange={(event: any) => setPersonYear(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsYearFilled}
                        />
                    </Col>
                </Form.Group>
            </>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    isPersonalDetailsNameFilled: isPersonalDetailsNameFilled(state),
    isPersonalDetailsClassFilled: isPersonalDetailsClassFilled(state),
    isPersonalDetailsYearFilled: isPersonalDetailsYearFilled(state),

    isFormValid: isFormValid(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setPersonName: (name: string) => dispatch(setPersonName(name)),
    setPersonClass: (className: string) => dispatch(setPersonClass(className)),
    setPersonYear: (year: string) => dispatch(setPersonYear(year)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalDetails)