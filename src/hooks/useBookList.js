import { useEffect, useReducer } from 'react'
import booksData from '../mocks/books.json'

const initialState = {
  availableBooks: booksData.library,
  booksToReading: JSON.parse(localStorage.getItem('booksToReading')) || [],
  booksFilteredByGenre: booksData.library,
  booksFilteredByPages: [],
  numberOfAvailableBooks: null
}

const readingListReducer = (state, action) => {
  let isBookInReadingList = false

  switch (action.type) {
    case 'ADD_BOOK_TO_READING_LIST':
      isBookInReadingList = state.booksToReading.find(item => item.id === action.book.id)
      if (!isBookInReadingList) {
        const updatedBooksToReading = [...state.booksToReading, action.book]

        const newState = {
          ...state,
          booksToReading: [...state.booksToReading, action.book]
        }

        localStorage.setItem('booksToReading', JSON.stringify(updatedBooksToReading))

        return newState
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

    case 'FILTER_BOOKS_BY_PAGES':
      return {
        ...state,
        booksFilteredByPages: state.booksFilteredByGenre.filter(item => {
          return item.book.pages >= action.bookPages
        })

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

  return {
    state,
    dispatch,
    addBookToReadingList,
    removeBookFromReadingList,
    filterBooksByGenre
  }
}
