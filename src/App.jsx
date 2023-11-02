import './App.css'
import { BookList } from './components/BookList'
import { ReadingList } from './components/ReadingList'
import { Header } from './components/Header'
import { useBookList } from './hooks/useBookList'

function App () {
  const { state, addBookToReadingList, removeBookFromReadingList, filterBooksByGenre } = useBookList()

  return (
    <>
      <Header
        booksToReading={state.booksToReading}
        numberOfAvailableBooks={state.numberOfAvailableBooks}
        filterBooksByGenre={filterBooksByGenre}
      />
      <main className='main-container'>
        <article className='booklist-container'>
          <BookList
            addBookToReadinglist={addBookToReadingList}
            availableBooks={state.availableBooks}
            booksFilteredByGenre={state.booksFilteredByGenre}
          />
        </article>
        <article className='readinglist-container'>
          <ReadingList
            booksToReading={state.booksToReading}
            removeBookFromReadingList={removeBookFromReadingList}
          />
        </article>
      </main>
    </>
  )
}

export default App
