import { useProducts } from "../../hooks/useProducts"
import { useState } from "react"
import DessertCard from "../cards/DessertCard"
import Cart from "../cart/Cart"
import { useCartStore } from "../../hooks/cartStore"
import ErrorState from "../states/ErrorState"
import DessertCardSkeleton from "../skeletons/DessertCardSkeleton"
import EmptyState from "../states/EmptyState"
import { useDebouncedValue } from "../../hooks/useDebouncedValue"
import { useCategories } from "../../hooks/useCategories"
import SearchBar from "../filters/SearchBar"
import CategoryFilter from "../filters/CategoryFilter"

const Desserts = () => {

    const {quantities, increase, decrease, remove} = useCartStore()
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")

    const debouncedSearch = useDebouncedValue(search)
    
    const { data: products, isLoading, isError, refetch } = useProducts({
        search: debouncedSearch,
        category
    })

    const { data: categories } = useCategories()

    return (
        <div className="min-h-screen bg-orange-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-16 px-8">
                <main className="md:col-span-2">
                    <h1 className="text-4xl font-bold text-amber-900 pb-8">Desserts</h1>

                    <div className="flex flex-col md:flex-row gap-4 pb-8">
                        <SearchBar value={search} onChange={setSearch}/>
                        <CategoryFilter categories={categories ?? []} value={category} onChange={setCategory}/>
                    </div>
                    { isError ? (
                        <ErrorState onRetry={refetch} />
                    ) : isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8">
                            { Array.from({ length: 6}).map((_,i) => (
                                <DessertCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : !products || products.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8"> 
                        { (products ?? []).map((data) => (
                            <DessertCard key={data.id} 
                                data={data}
                                quantity={quantities[data.id] ?? 0}
                                onIncrease={() => increase(data.id)}
                                onDecrease={() => decrease(data.id)}/>
                        ))}
                    </div>
                    )}
                    
                </main>

                <aside className="md:col-span-1">
                    <Cart products={products ?? []} quantities={quantities} onRemove={remove}/>
                </aside>

            </div>     
        </div>
    )
    
}

export default Desserts