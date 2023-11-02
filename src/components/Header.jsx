import { useState } from 'react'

export function Header ({ numberOfAvailableBooks, booksToReading, filterBooksByGenre, filterBooksByPages }) {
  const [selectedGenre, setSelectedGenre] = useState('todos')

  const numberOfBooksToRead = booksToReading.length

  const handleDropdownChange = (event) => {
    const genre = event.target.value
    setSelectedGenre(genre)
    filterBooksByGenre(genre)
  }

  return (
    <header>
      <p>{numberOfAvailableBooks} Libros disponibles</p>
      <small>{numberOfBooksToRead} en la lista de lectura</small>
      <div>
        <label htmlFor='genero'>Ordenar por genero</label>
        <select
          id='genero'
          onChange={handleDropdownChange}
          value={selectedGenre}
        >
          <option value='Todos'>Todos</option>
          <option value='Fantasía'>Fantasía</option>
          <option value='Ciencia ficción'>Ciencia ficción</option>
          <option value='Zombies'>Zombies</option>
          <option value='Terror'>Terror</option>
        </select>
      </div>
    </header>
  )
}
