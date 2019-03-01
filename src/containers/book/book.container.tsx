import React, { Component } from 'react';
import { Book } from "../../types/book";
import { toggleSelection } from '../../store/books/actions'
import { ApplicationState } from "../../store";
import { isBookSelected } from '../../selectors/book/book.selector'
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

interface ComponentProps {
    groupId: number
    book: Book
}

interface PropsFromState {
    selected: boolean
}

interface PropsFromDispatch {
    toggleSelection: typeof toggleSelection
}

type AllProps = ComponentProps & PropsFromState & PropsFromDispatch

class BookContainer extends Component<AllProps> {
    render() {
        const {groupId, selected, book, toggleSelection} = this.props;
        return (
            <tr>
                <td>
                    <Form.Check type="checkbox" defaultChecked={selected} onClick={() => toggleSelection(groupId, book)}/>
                </td>
                <td>{4}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
            </tr>
        )
    }
}

const mapStateToProps = (state: ApplicationState, props: ComponentProps) => ({
    selected: isBookSelected(state, props)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleSelection: (groupId: number, book: Book) => dispatch(toggleSelection(groupId, book))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookContainer)