export function Book ({ id, title, pages, genre, cover, addBookToReadinglist }) {
  const handleAddToReadingList = () => {
    const book = {
      id,
      title,
      genre,
      cover
    }

    addBookToReadinglist(book)
  }

  return (
    <div
      className='book-container'
      onClick={handleAddToReadingList}
    >
      <img src={cover} alt={title} />
    </div>
  )
}
