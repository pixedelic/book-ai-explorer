type SearchBarProps = {
    query: string
    onChange: (value: string) => void
    onSearch: () => void
}

function SearchBar( {
    query,
    onChange,
    onSearch
} : SearchBarProps) {
    return(
        <div className="search-bar-mask">
            <input
                type="search"
                className="search-input"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your text here..."
            />
            <button
                className="search-button"
                onClick={onSearch}
            >Search</button>
        </div>
    )
}

export default SearchBar