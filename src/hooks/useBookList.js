import { useEffect, useReducer } from 'react'
import booksData from '../mocks/books.json'

const initialState = {
  booksToReading: [],
  availableBooks: booksData.library,
  numberOfAvailableBooks: null
}

const readingListReducer = (state, action) => {
  let isBookInReadingList = false

  switch (action.type) {
    case 'ADD_BOOK_TO_READING_LIST':
      isBookInReadingList = state.booksToReading.find(item => item.id === action.book.id)
      if (!isBookInReadingList) {
        return {
          ...state,
          booksToReading: [...state.booksToReading, action.book]
        }
      }
      return state
    case 'REMOVE_BOOK_FROM_READING_LIST':
      return {
        ...state,
        booksToReading: state.booksToReading.filter(book => book.id !== action.bookId)
      }
    case 'UPDATE_AVAILABLE_BOOKS':
      return {
        ...state,
        numberOfAvailableBooks: action.numberOfAvailableBooks
      }
    default:
      return state
  }
}

export function useBookList () {
  const [state, dispatch] = useReducer(readingListReducer, initialState)

  const addBookToReadingList = (book) => {
    dispatch({ type: 'ADD_BOOK_TO_READING_LIST', book })
  }

  const removeBookFromReadingList = (bookId) => {
    dispatch({ type: 'REMOVE_BOOK_FROM_READING_LIST', bookId })
  }

  useEffect(() => {
    const numberOfAvailableBooks = state.availableBooks.length - state.booksToReading.length
    dispatch({ type: 'UPDATE_AVAILABLE_BOOKS', numberOfAvailableBooks })
  }, [state.availableBooks, state.booksToReading])

  return { state, dispatch, addBookToReadingList, removeBookFromReadingList }
}
