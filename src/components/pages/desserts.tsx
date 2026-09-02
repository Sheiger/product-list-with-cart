import { useProducts } from "../../hooks/useProducts"
import { useState, useEffect } from "react"
import DessertCard from "../cards/DessertCard"
import Cart from "../cart/Cart"
import { useCartStore } from "../../services/cartStore"
import ErrorState from "../states/ErrorState"
import DessertCardSkeleton from "../skeletons/DessertCardSkeleton"
import EmptyState from "../states/EmptyState"
import { useDebouncedValue } from "../../hooks/useDebouncedValue"
import { useCategories } from "../../hooks/useCategories"
import SearchBar from "../filters/SearchBar"
import CategoryFilter from "../filters/CategoryFilter"

const Desserts = () => {

    const {quantities, cartProducts, increase, decrease, remove} = useCartStore()
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [page, setPage] = useState(1)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const debouncedSearch = useDebouncedValue(search)

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch, category])
    
    const { data, isLoading, isError, refetch } = useProducts({
        search: debouncedSearch,
        category,
        page
    })

    const { data: categories } = useCategories()

    const productsList = data?.products || []
    const totalPages = data?.totalPages || 1

    const cartTotalItems = Object.values(quantities).reduce((acc, curr) => acc + curr, 0)

    return (
        <div className="min-h-screen bg-orange-50 relative overflow-x-hidden">
            <button 
                onClick={() => setIsDrawerOpen(true)}
                className="fixed top-6 right-6 z-30 bg-amber-800 text-white p-3 rounded-full shadow-xl hover:bg-amber-900 transition-colors flex items-center justify-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartTotalItems > 0 && (
                    <span className="bg-white text-amber-900 font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center">
                        {cartTotalItems}
                    </span>
                )}
            </button>

            {isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}
            
            <aside className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 flex justify-between items-center border-b border-orange-100">
                    <h2 className="text-xl font-bold text-amber-900">Tu Carrito</h2>
                    <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full">
                        ✕
                    </button>
                </div>
                <Cart products={Object.values(cartProducts || {})} quantities={quantities || {}} onRemove={remove}/>
            </aside>

            <div className="max-w-7xl mx-auto pt-16 px-8 pb-12">
                <main className="w-full">
                    <h1 className="text-4xl font-bold text-amber-900 pb-8">Desserts</h1>

                    <div className="flex flex-col md:flex-row gap-4 pb-8">
                        <SearchBar value={search} onChange={setSearch}/>
                        <CategoryFilter categories={categories ?? []} value={category} onChange={setCategory}/>
                    </div>

                    { isError ? (
                        <ErrorState onRetry={refetch} />
                    ) : isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-6">
                            { Array.from({ length: 5 }).map((_, i) => (
                                <DessertCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : productsList.length === 0 && page === 1 ? (
                        <EmptyState />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-6"> 
                                { productsList.map((data) => (
                                    <DessertCard 
                                        key={data.id} 
                                        data={data}
                                        quantity={quantities[data.id] ?? 0}
                                        onIncrease={() => increase(data)}
                                        onDecrease={() => decrease(data.id)}
                                    />
                                ))}
                            </div>
                            
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-6 mt-12 mb-4">
                                    <button 
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 border-2 border-amber-800 text-amber-900 font-semibold rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed">
                                        &larr; Anterior
                                    </button>
                                    
                                    <span className="text-amber-950 font-medium">
                                        Página <span className="font-bold">{page}</span> de <span className="font-bold">{totalPages}</span>
                                    </span>
                                    
                                    <button 
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                        className="px-4 py-2 border-2 border-amber-800 text-amber-900 font-semibold rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed">
                                        Siguiente &rarr;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>     
        </div>
    )
    
}

export default Desserts