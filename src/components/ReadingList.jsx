import { ReadingBook } from './ReadingBook'

export function ReadingList ({ booksToReading, removeBookFromReadingList }) {
  return (
    <div className='book-reading-container'>
      <h3>Lista de lectura</h3>
      <ul className='book-reading-list'>
        {booksToReading.map(book => (
          <li key={book.id}>
            <ReadingBook
              id={book.id}
              title={book.title}
              cover={book.cover}
              removeBookFromReadingList={removeBookFromReadingList}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
