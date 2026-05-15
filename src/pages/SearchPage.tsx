import { useState } from 'react'
import { type Book } from '../types/book'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'

function SearchPage() {
	const [query, setQuery] = useState('')
	const [result, setResults] = useState<Book[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

  const onSearch = async () => {
		try {
			setIsLoading(true)
			setError(null)
	
			const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=12`)
			const data = await response.json()

			setResults(data.docs)

		} catch(err) {
			setError(`Something went wrong while loading: ${err}`)
		} finally {
			setIsLoading(false)
		} 
	}

	return (
		<>
			<div className="welcome-area justify-center p-6">
					<h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to BaBeLib</h1>
					<p>BaBeLib helps you find information about any book published anywhere in the world.</p>
					<SearchBar
							query={query}
							onChange={setQuery}
							onSearch={onSearch}
					/>
			</div>

			<div className="book-search-results">
				{result.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</div>
		</>
	)
}

export default SearchPage