import { Reducer } from 'redux'

import { BooksActionTypes, BooksState } from './types'

const initialState: BooksState = {
    selectedBooks: []
};

const reducer: Reducer<BooksState> = (state = initialState, action) => {
    switch (action.type) {
        case BooksActionTypes.TOGGLE_SELECTION: {
            const {groupId, book} = action.payload;
            const {[groupId]: group = []} = state.selectedBooks;

            if (group.includes(book)) {
                return {
                    ...state,
                    selectedBooks: {
                        ...state.selectedBooks,
                        [groupId]: group.filter(selectedBook =>
                            selectedBook.literature_groups_has_books_id !== book.literature_groups_has_books_id
                        )
                    }
                }
            } else {
                return {
                    ...state,
                    selectedBooks: {
                        ...state.selectedBooks,
                        [groupId]: [...group, book]
                    }
                }
            }
        }
        default: {
            return state
        }
    }
};

export { reducer as booksReducer }