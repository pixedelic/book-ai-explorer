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
			<div className="welcome-area flex flex-col items-center p-6 gap-y-6 my-8">
					<h1 className="flex text-5xl font-bold text-gray-800">Welcome to BaBeLib</h1>
					<p>BaBeLib helps you find information about any book published anywhere in the world.</p>
					<SearchBar
							query={query}
							onChange={setQuery}
							onSearch={onSearch}
					/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
				{error && <p>Sorry! {error}</p>}
				{isLoading && <p>Please, wait a moment</p>}
				{result.map((book) => (
					<BookCard key={book.key} book={book} />
				))}
			</div>
		</>
	)
}

export default SearchPage