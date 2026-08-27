interface CategoryFilterProps {
    categories: string[]
    value: string
    onChange: (value: string) => void;
}

const CategoryFilter = ({ categories, value, onChange }: CategoryFilterProps) => {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2">
            <option value="">All categories</option>
            { categories.map((category) => (
                <option key={category} value={category}> {category}</option>
            ))}
        </select>
    )
}

export default CategoryFilter