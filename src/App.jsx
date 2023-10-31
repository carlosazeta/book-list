import './App.css'
import { BookList } from './components/BookList'
import { ReadingList } from './components/ReadingList'
import { Header } from './components/Header'
import { useBookList } from './hooks/useBookList'
import { useState } from 'react'

function App () {
  const { state, addBookToReadingList, removeBookFromReadingList } = useBookList()
  const [filteredBooksByGenre, setFilteredBooksByGenre] = useState(state)
  console.log(filteredBooksByGenre)

  return (
    <>
      <Header
        booksToReading={state.booksToReading}
        numberOfAvailableBooks={state.numberOfAvailableBooks}
        filteredBooksByGenre={filteredBooksByGenre}
        setFilteredBooksByGenre={setFilteredBooksByGenre}
      />
      <main className='main-container'>
        <article className='booklist-container'>
          <BookList
            addBookToReadinglist={addBookToReadingList}
            availableBooks={state.availableBooks}
            filteredBooksByGenre={filteredBooksByGenre}
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
