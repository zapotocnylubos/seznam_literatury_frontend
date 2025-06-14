import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import BookContainer from "../book/book.container";
import { LiteratureGroup } from "../../types/literature-group";
import { getSelectedBooksInGroup } from "../../selectors/selected-book.selector";
import { isRequiredSelectedBooksCountInGroupMet } from "../../selectors/literature-group.selector";

interface ComponentProps {
    literatureGroup: LiteratureGroup
}

interface PropsFromState {
    getSelectedBooksInGroupCount: number
    isRequiredSelectedBooksCountInGroupMet: boolean
}


type AllProps = ComponentProps & PropsFromState

class LiteratureGroupContainer extends Component<AllProps> {
    render() {
        const {literatureGroup} = this.props;
        const {getSelectedBooksInGroupCount, isRequiredSelectedBooksCountInGroupMet} = this.props;

        return (
            <div className={'mb-4'}>
                <h4>{literatureGroup.title}</h4>
                <small className={'d-print-none'}>
                    Minimální počet knih z této skupiny:&nbsp;
                    <span className={isRequiredSelectedBooksCountInGroupMet ? 'text-success' : 'text-danger'}>
                        ({getSelectedBooksInGroupCount}&nbsp;/&nbsp;{literatureGroup.min_count})
                    </span>
                </small>
                <Table size="sm" responsive>
                    <thead>
                    <tr>
                        <th className={'d-print-none'} style={{width: '3%'}}></th>
                        <th style={{width: '5%'}}>
                            Číslo titulu
                        </th>
                        <th className={'d-none d-print-table-cell'} style={{width: '5%'}}>
                            Číslo otázky
                        </th>
                        <th style={{width: '35%'}}>
                            Jméno a příjmení autora
                        </th>
                        <th style={{width: '45%'}}>
                            Název titulu
                        </th>
                        <th style={{width: '10%'}}>
                            Literární forma
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {literatureGroup.books.map((book, index) =>
                        <BookContainer key={index} groupId={literatureGroup.id} book={book}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState, {literatureGroup}: ComponentProps) => ({
    getSelectedBooksInGroupCount: getSelectedBooksInGroup(state, {groupId: literatureGroup.id}).length,
    isRequiredSelectedBooksCountInGroupMet: isRequiredSelectedBooksCountInGroupMet(state, {groupId: literatureGroup.id})

});

export default connect(
    mapStateToProps
)(LiteratureGroupContainer)