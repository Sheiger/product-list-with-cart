interface ErrorStateProps {
    onRetry: () => void
}

const ErrorState = ({ onRetry }: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center gap-4 py-16">
            <span className="text-ambar-900 font-semibold">
                An error occurred while loading the products
            </span>
            <button onClick={onRetry} className="bg-amber-800 text-white rounded-4xl px-6 py-2">  
                Try again
            </button>
        </div>
    )
}

export default ErrorState