import React, { Component } from 'react';
import { Book } from "../../types/book";

interface ComponentProps {
    book: Book
}

type AllProps = ComponentProps


class BookComponent extends Component<AllProps> {
    render() {
        const {book} = this.props;
        return (
            <tr>
                <td>2</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
            </tr>
        );
    }
}

export default BookComponent