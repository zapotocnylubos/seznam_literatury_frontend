import React, { Component } from 'react';
import { Book } from "../../types/book";
import { toggleSelection } from '../../store/books/actions'
import { ApplicationState } from "../../store";
import { isBookSelected, isMinimumBookCountMet } from '../../selectors/book.selector'
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import classNames from 'classnames';

interface ComponentProps {
    groupId: number
    book: Book
}

interface PropsFromState {
    selected: boolean,
    isMinimumBookCountMet: boolean
}

interface PropsFromDispatch {
    toggleSelection: typeof toggleSelection
}

type AllProps = ComponentProps & PropsFromState & PropsFromDispatch

class BookContainer extends Component<AllProps> {
    render() {
        const {groupId, isMinimumBookCountMet, selected, book, toggleSelection} = this.props;

        const trClass = classNames({
            'd-print-none': !selected
        });

        return (
            <tr className={trClass}>
                <td className={'d-print-none'}>
                    <Form.Check disabled={isMinimumBookCountMet && !selected} type="checkbox" defaultChecked={selected} onClick={() => toggleSelection(groupId, book)}/>
                </td>
                <td>{4}</td>
                <td className={'d-none d-print-block'}>{2}</td>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{book.literature_form}</td>
            </tr>
        )
    }
}

const mapStateToProps = (state: ApplicationState, props: ComponentProps) => ({
    selected: isBookSelected(state, props),
    isMinimumBookCountMet: isMinimumBookCountMet(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleSelection: (groupId: number, book: Book) => dispatch(toggleSelection(groupId, book))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookContainer)