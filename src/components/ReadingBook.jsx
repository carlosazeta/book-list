export function ReadingBook ({ id, cover, title, removeBookFromReadingList }) {
  const handleRemoveBook = () => {
    removeBookFromReadingList(id)
  }

  return (

      <div className='reading-image-container'>
        <img src={cover} alt={title} />
        <button
          className='remove-button'
          onClick={handleRemoveBook}
        >X
        </button>
      </div>
  )
}
