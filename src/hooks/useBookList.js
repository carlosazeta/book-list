import { useEffect, useReducer } from 'react'
import booksData from '../mocks/books.json'

const initialState = {
  availableBooks: booksData.library,
  booksToReading: JSON.parse(localStorage.getItem('booksToReading')) || [],
  booksFilteredByGenre: booksData.library,
  numberOfAvailableBooks: null
}

const readingListReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_BOOK_TO_READING_LIST':
      const { book } = actionPayload
      const isBookInReadingList = state.booksToReading.find((item) => item.id === book.id)

      if (!isBookInReadingList) {
        const updatedBooksToReading = [...state.booksToReading, book]

        const newState = {
          ...state,
          booksToReading: updatedBooksToReading
        }

        localStorage.setItem('booksToReading', JSON.stringify(updatedBooksToReading))

        return newState
      }
      return state

    case 'REMOVE_BOOK_FROM_READING_LIST':
      const { id } = actionPayload
      return {
        ...state,
        booksToReading: state.booksToReading.filter((book) => book.id !== id)
      }

    case 'UPDATE_AVAILABLE_BOOKS':
      const { numberOfAvailableBooks } = actionPayload
      return {
        ...state,
        numberOfAvailableBooks
      }

    case 'FILTER_BOOKS_BY_GENRE':
      const { genre } = actionPayload
      if (genre === 'Todos') {
        return {
          ...state,
          booksFilteredByGenre: state.availableBooks
        }
      } else {
        return {
          ...state,
          booksFilteredByGenre: state.availableBooks.filter((item) => item.book.genre === genre)
        }
      }

    default:
      return state
  }
}

export function useBookList () {
  const [state, dispatch] = useReducer(readingListReducer, initialState)

  const addBookToReadingList = (book) => {
    dispatch({ type: 'ADD_BOOK_TO_READING_LIST', payload: { book } })
  }

  const removeBookFromReadingList = (id) => {
    dispatch({ type: 'REMOVE_BOOK_FROM_READING_LIST', payload: { id } })
  }

  const filterBooksByGenre = (genre) => {
    dispatch({ type: 'FILTER_BOOKS_BY_GENRE', payload: { genre } })
  }

  useEffect(() => {
    const numberOfAvailableBooks = state.availableBooks.length - state.booksToReading.length
    dispatch({ type: 'UPDATE_AVAILABLE_BOOKS', payload: { numberOfAvailableBooks } })
  }, [state.availableBooks, state.booksToReading])

  return {
    state,
    dispatch,
    addBookToReadingList,
    removeBookFromReadingList,
    filterBooksByGenre
  }
}
