interface SearchBarProps {
    value: string
    onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for name..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64"
        />
        
    )
}

export default SearchBar