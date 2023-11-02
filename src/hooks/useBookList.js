import { useEffect, useReducer } from 'react'
import booksData from '../mocks/books.json'

const initialState = {
  availableBooks: booksData.library,
  booksToReading: [],
  booksFilteredByGenre: booksData.library,
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
    case 'FILTER_BOOKS_BY_GENRE':
      if (action.bookGenre === 'Todos') {
        return {
          ...state,
          booksFilteredByGenre: state.availableBooks
        }
      } else {
        return {
          ...state,
          booksFilteredByGenre: state.availableBooks.filter(item => {
            return item.book.genre === action.bookGenre
          })
        }
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

  const filterBooksByGenre = (bookGenre) => {
    dispatch({ type: 'FILTER_BOOKS_BY_GENRE', bookGenre })
  }

  useEffect(() => {
    const numberOfAvailableBooks = state.availableBooks.length - state.booksToReading.length
    dispatch({ type: 'UPDATE_AVAILABLE_BOOKS', numberOfAvailableBooks })
  }, [state.availableBooks, state.booksToReading])

  return { state, dispatch, addBookToReadingList, removeBookFromReadingList, filterBooksByGenre }
}
