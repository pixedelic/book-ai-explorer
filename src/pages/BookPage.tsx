import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from "react-router";
import { type BookDetail } from '../types/book'
import AIAnalysis from '../components/AIAnalysis'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card"

function BookPage() {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [book, setBook] = useState<BookDetail | null>(null)
	const [searchParams] = useSearchParams()
	const author = searchParams.get('author') ?? ''
	const navigate = useNavigate()

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
		<div className="book-detail my-16">
			{error && <p>Sorry! {error}</p>}
			{isLoading && <p>Please, wait a moment</p>}
      {book && (
				<div className='flex max-w-4xl m-auto gap-8 items-start'>
					<Button variant="ghost" onClick={() => navigate(-1)}>← Back</Button>
					<div className='flex flex-col gap-4 w-2/5 bg-gray-100'>
						{book.covers && <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} alt={book.title} />}
					</div>
					<Card className='flex flex-col gap-4 w-3/5'>
						<CardHeader>
							<CardTitle>Title: {book.title}</CardTitle>
							<CardDescription>Year: {book.first_publish_date}</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Description:
								{typeof book.description === 'string' 
								? book.description 
								: book.description?.value}
							</p>
						</CardContent>
						<CardFooter className="flex-col gap-2">
							<AIAnalysis 
								title={book.title}
								author={author}
							/>
						</CardFooter>
					</Card>
				</div>
			)}
		</div>
	)
}

export default BookPage