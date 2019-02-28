import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { LiteratureGroup } from "../../types/literature-group";
import BookComponent from "../book/book.component";

interface ComponentProps {
    literatureGroup: LiteratureGroup
}

type AllProps = ComponentProps


class LiteratureGroupComponent extends Component<AllProps> {
    render() {
        const { literatureGroup } = this.props;
        return (
            <div>
                <h4>{literatureGroup.title}</h4>
                <small>Minimální počet knih z této skupiny: {literatureGroup.min_count}</small>
                <Table size="sm">
                    <thead>
                    <tr>
                        <th>Číslo titulu</th>
                        <th>Jméno a příjmení autora</th>
                        <th>Název titulu</th>
                    </tr>
                    </thead>
                    <tbody>
                    {literatureGroup.books.map(book => <BookComponent book={book}/>)}
                    </tbody>
                </Table>
            </div>

        );
    }
}

export default LiteratureGroupComponent