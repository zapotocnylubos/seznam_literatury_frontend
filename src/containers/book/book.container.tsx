import React, { Component } from 'react';
import { Book } from "../../types/book";
import { toggleSelection } from '../../store/books/actions'
import { ApplicationState } from "../../store";
import { getBookIndex, getSelectedBookIndex, isBookSelectedInGroup } from '../../selectors/book.selector'
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import classNames from 'classnames';
import { isRequiredBookCountMet } from "../../selectors/literature-set.selector";

interface ComponentProps {
    groupId: number
    book: Book
}

interface PropsFromState {
    isBookSelectedInGroup: boolean
    isRequiredBookCountMet: boolean

    getBookIndex: (book: Book) => number
    getSelectedBookIndex: (book: Book) => number
}

interface PropsFromDispatch {
    toggleSelection: typeof toggleSelection
}

type AllProps = ComponentProps & PropsFromState & PropsFromDispatch

class BookContainer extends Component<AllProps> {
    render() {
        const {groupId, book} = this.props;
        const {isBookSelectedInGroup, isRequiredBookCountMet, getBookIndex, getSelectedBookIndex} = this.props;
        const {toggleSelection} = this.props;

        const trClass = classNames({
            'd-print-none': !isBookSelectedInGroup
        });

        return (
            <tr className={trClass}>
                <td className={'d-print-none'}>
                    <Form.Check disabled={isRequiredBookCountMet && !isBookSelectedInGroup} type="checkbox" defaultChecked={isBookSelectedInGroup}
                                onClick={() => toggleSelection(groupId, book)}/>
                </td>
                <td>{getBookIndex(book) + 1}</td>
                <td className={'d-none d-print-block'}>{getSelectedBookIndex(book) + 1}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{book.literature_form}</td>
            </tr>
        )
    }
}

const mapStateToProps = (state: ApplicationState, props: ComponentProps) => ({
    isBookSelectedInGroup: isBookSelectedInGroup(state, props),
    isRequiredBookCountMet: isRequiredBookCountMet(state),

    getBookIndex: (book: Book) => getBookIndex(state, {book}),
    getSelectedBookIndex: (book: Book) => getSelectedBookIndex(state, {book})

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleSelection: (groupId: number, book: Book) => dispatch(toggleSelection(groupId, book))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookContainer)