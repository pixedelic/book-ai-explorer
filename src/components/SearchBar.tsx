import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
        <div className="search-bar-mask flex gap-4">
            <Input
                type="search"
                className="search-input px-2 py-2 min-w-md"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your text here..."
            />
            <Button
                className="search-button"
                onClick={onSearch}
            >Search</Button>
        </div>
    )
}

export default SearchBar