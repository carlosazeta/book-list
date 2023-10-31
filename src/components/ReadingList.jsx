import { ReadingBook } from './ReadingBook'

export function ReadingList ({ booksToReading, removeBookFromReadingList }) {
  return (
    <div className='bookreading-container'>
      <h3>Reading List</h3>
      <ul className='booksreadinglist'>
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
