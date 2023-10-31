import { useState } from 'react'

export function Header ({ numberOfAvailableBooks, booksToReading, filteredBooksByGenre, setFilteredBooksByGenre }) {
  const numberOfBooksToRead = booksToReading.length
  const [selectedGenre, setSelectedGenre] = useState()

  const handleDropdownChange = (event) => {
    const genre = event.target.value
    if (genre === 'todos') {
      setFilteredBooksByGenre(filteredBooksByGenre)
    } else {
      const filteredBooks = filteredBooksByGenre.filter((book) => book.genre === genre)
      setFilteredBooksByGenre(filteredBooks)
    }
  }

  return (
    <header>
      <p>{numberOfAvailableBooks} Libros disponibles</p>
      <small>{numberOfBooksToRead} en la lista de lectura</small>
      <div>
        <label htmlFor='genero'>Ordenar por genero</label>
        <select
          id='genero'
          value={selectedGenre}
          onChange={handleDropdownChange}
        >
          <option value='todos'>Todos</option>
          <option value='fantasía'>Fantasía</option>
          <option value='ciencia ficción'>Ciencia ficción</option>
          <option value='zombies'>Zombies</option>
          <option value='terror'>Terror</option>
        </select>
      </div>
    </header>
  )
}
