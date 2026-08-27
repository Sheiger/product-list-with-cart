const DessertCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="rounded-lg w-full aspect-square bg-orange-100"/>
            <div className="flex flex-col pt-8 gap-2">
                <div className="h-4 w-16 bg-orange-100 rounded"/>
                <div className="h-5 w-32 bg-orange-100 rounded"/>
                <div className="h-4 w-12 bg-orange-100 rounded"/>
            </div>
        </div>
    )
}

export default DessertCardSkeleton