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

import {
    setPersonName,
    setPersonClass,
    setPersonYear,
} from '../../store/personal-details/actions'
import { PersonalDetailsState } from "../../store/personal-details/types";

interface PropsFromState {
    personalDetails: PersonalDetailsState,
    isPersonalDetailsNameFilled: boolean,
    isPersonalDetailsClassFilled: boolean,
    isPersonalDetailsYearFilled: boolean,
}

interface PropsFromDispatch {
    setPersonName: (name: string) => void,
    setPersonClass: (className: string) => void,
    setPersonYear: (year: string) => void,
}

type AllProps = PropsFromState & PropsFromDispatch;

class PersonalDetails extends Component<AllProps> {
    render() {
        const {
            personalDetails,
            setPersonName,
            setPersonClass,
            setPersonYear,
        } = this.props;

        return (
            <>
                <Form.Group as={Row} className={'mb-2'}>
                    <Col xs={4} className={'d-flex align-items-print-center'}>
                        <Form.Label className={'mb-0'} htmlFor="personal-details-name">
                            Jméno a příjmení:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            size="sm"
                            id="personal-details-name"
                            type="text"
                            onChange={(event: any) => setPersonName(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsNameFilled}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className={'mb-2'}>
                    <Col xs={4} className={'d-flex align-items-print-center'}>
                        <Form.Label className={'mb-0'} htmlFor="personal-details-class">
                            Třída:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            size="sm"
                            id="personal-details-class"
                            type="text"
                            onChange={(event: any) => setPersonClass(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsClassFilled}
                        />
                        <Form.Text className="text-muted d-print-none">
                            Např. 4.A, 4.MA
                        </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className={'mb-2'}>
                    <Col xs={4} className={'d-flex align-items-print-center'}>
                        <Form.Label className={'mb-0'} htmlFor="personal-details-year">
                            Školní rok:
                        </Form.Label>
                    </Col>
                    <Col xs={8}>
                        <Form.Control
                            size="sm"
                            id="personal-details-year"
                            type="text"
                            value={personalDetails.year}
                            onChange={(event: any) => setPersonYear(event.target.value)}
                            isInvalid={!this.props.isPersonalDetailsYearFilled}
                        />
                        <Form.Text className="text-muted d-print-none">
                            Rok maturity, např. {new Date().getFullYear()}
                        </Form.Text>
                    </Col>
                </Form.Group>
            </>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    personalDetails: state.personalDetails,
    isPersonalDetailsNameFilled: isPersonalDetailsNameFilled(state),
    isPersonalDetailsClassFilled: isPersonalDetailsClassFilled(state),
    isPersonalDetailsYearFilled: isPersonalDetailsYearFilled(state),
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