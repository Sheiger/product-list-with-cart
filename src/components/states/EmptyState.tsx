const EmptyState = () => {
    return (
        <div className="flex flex-col items-center gap-2 py-16">
            <span className="font-semibold text-gray-400">
                No products were found
            </span>
            <span className="text-sm text-gray-400">
                Try another search or filter
            </span>
        </div>
    )
}

export default EmptyState