import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import BookContainer from "../book/book.container";
import { LiteratureGroup } from "../../types/literature-group";

interface ComponentProps {
    literatureGroup: LiteratureGroup
}

interface PropsFromState {
    // selected: boolean
}


type AllProps = ComponentProps & PropsFromState

class LiteratureGroupContainer extends Component<AllProps> {
    render() {
        const {literatureGroup} = this.props;
        return (
            <div className={'mb-4'}>
                <h4>{literatureGroup.title}</h4>
                <small>Minimální počet knih z této skupiny: {literatureGroup.min_count}</small>
                <Table size="sm">
                    <thead>
                    <tr>
                        <th className={'d-print-none'}>Vybrat</th>
                        <th>Číslo titulu</th>
                        <th className={'d-none d-print-block'}>Číslo otázky</th>
                        <th>Jméno a příjmení autora</th>
                        <th>Název titulu</th>
                        <th>Literární forma</th>
                    </tr>
                    </thead>
                    <tbody>
                    {literatureGroup.books.map((book, index) => <BookContainer key={index} groupId={literatureGroup.id} book={book}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState, props: ComponentProps) => ({});

export default connect(
    mapStateToProps
)(LiteratureGroupContainer)