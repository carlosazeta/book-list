import { Book } from './Book'
export function BookList ({ availableBooks, addBookToReadinglist, filteredBooksByGenre }) {
  return (
    <ul className='booklist'>
      {availableBooks.map(item => {
        const book = item.book
        return (
          <li key={book.ISBN}>
            <Book
              id={book.ISBN}
              title={book.title}
              pages={book.pages}
              genre={book.genre}
              cover={book.cover}
              addBookToReadinglist={addBookToReadinglist}
            />
          </li>
        )
      })}
    </ul>
  )
}
