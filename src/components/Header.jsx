import { useState } from 'react'

export function Header ({ numberOfAvailableBooks, booksToReading, filterBooksByGenre }) {
  const [selectedGenre, setSelectedGenre] = useState('todos')

  const numberOfBooksToRead = booksToReading.length

  const handleDropdownChange = (event) => {
    const genre = event.target.value
    setSelectedGenre(genre)
    filterBooksByGenre(genre)
  }

  return (
    <header className='header'>
      <div className='header-info-container'>
      <p> <span className='header-number'>{numberOfAvailableBooks}</span> libros disponibles</p>
      <small><span className='header-number'>{numberOfBooksToRead}</span> en la lista de lectura</small>
      </div>
      <div className='header-filter-container'>
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
