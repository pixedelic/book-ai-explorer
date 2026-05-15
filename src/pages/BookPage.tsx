import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router";
import { type BookDetail } from '../types/book'
import AIAnalysis from '../components/AIAnalysis'

function BookPage() {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [book, setBook] = useState<BookDetail | null>(null)
	const [searchParams] = useSearchParams()
	const author = searchParams.get('author') ?? ''

	useEffect(() => {
		const fetchBook = async () => {
			try {
				setIsLoading(true)
				setError(null)
		
				const response = await fetch(`https://openlibrary.org/works/${id}.json`)
				const data = await response.json()

				setBook(data)

			} catch(err) {
				setError(`Something went wrong while loading: ${err}`)
			} finally {
				setIsLoading(false)
			} 
		}

		fetchBook()

	}, [id])

	return (
		<div className="book-detail">
			{error && <p>Sorry! {error}</p>}
			{isLoading && <p>Please, wait a moment</p>}
      {book && (
				<>
					{book.covers && <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} alt={book.title} />}
					<p>Title: {book.title}</p>
					<p>Year: {book.first_publish_date}</p>
					<p>Description:
						{typeof book.description === 'string' 
						? book.description 
						: book.description?.value}
					</p>
					<AIAnalysis 
						title={book.title}
						author={author}
					/>
				</>
			)}
		</div>
	)
}

export default BookPage