import React, { Component } from 'react';
import { Book } from "../../types/book";
import { toggleSelection } from '../../store/books/actions'
import { ApplicationState } from "../../store";
import { getBookIndex } from '../../selectors/book.selector'
import { getSelectedBookIndex, isBookSelectedInGroup } from '../../selectors/selected-book.selector'
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

        const canToggleSelection = isRequiredBookCountMet ? isBookSelectedInGroup : true;

        const trClass = classNames({
            'd-print-none': !isBookSelectedInGroup,
            'table-success': isBookSelectedInGroup,
        });

        const trStyles = {
            ...canToggleSelection && {cursor: 'pointer'}
        };

        return (
            <tr className={trClass}
                style={trStyles}
                onClick={() => canToggleSelection && toggleSelection(groupId, book)}>
                <td className={'d-print-none align-middle'}>
                    <Form.Check disabled={!canToggleSelection}
                                type="checkbox"
                                className={'d-flex'}
                                checked={isBookSelectedInGroup}
                                onChange={() => toggleSelection(groupId, book)}
                                onClick={(event: any) => event.stopPropagation()}/>
                </td>
                <td className={'align-middle'}>
                    {getBookIndex(book) + 1}
                </td>
                <td className={'d-none d-print-table-cell align-middle'}>{getSelectedBookIndex(book) + 1}</td>
                <td className={'align-middle'}>
                    {book.author}
                </td>
                <td className={'align-middle'}>
                    {book.title}
                </td>
                <td className={'align-middle'}>
                    {book.literature_form}
                </td>
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