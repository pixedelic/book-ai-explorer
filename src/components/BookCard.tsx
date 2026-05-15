import { type Book } from '../types/book'
import { Link } from 'react-router-dom'

type BookCardProps = {
    book: Book
}

function BookCard({ book }: BookCardProps) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null
    const bookId = book.key.replace('/works/', '')
    const author = book.author_name?.[0] ?? ''
    const bookURL = `/book/${bookId}?author=${encodeURIComponent(author)}`

    return (
        <Link to={bookURL}>
            <div className="book-card">
                {coverUrl
                    ? <img src={coverUrl} alt={book.title} />
                    : <div className="book-card__no-cover">No cover</div>
                }
                <div className="book-card__info">
                    <h3>{book.title}</h3>
                    {book.author_name && <p>{book.author_name[0]}</p>}
                    {book.first_publish_year && <p>{book.first_publish_year}</p>}
                </div>
            </div>
        </Link>
    )
}

export default BookCard