import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class LiteratureSetFooterComponent extends Component {
    render() {
        return (
            <Row className={'mb-2'}>
                <Col>
                    Datum: {new Date().toLocaleDateString('cs-CZ', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </Col>
                <Col>
                    Podpis:
                </Col>
            </Row>
        )
    }

}

export default LiteratureSetFooterComponent