import { useParams, Link } from "react-router-dom"
import { useProduct } from "../../hooks/useProduct"
import ErrorState from "../states/ErrorState"
import NotFound from "./notFound"

const ProductDetail = () => {

    const {id} = useParams<{ id: string }>()
    const { data: product, isLoading, isError, refetch } = useProduct(id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center">
                <span className="text-amber-900 font-semibold text-lg">Loading...</span>
            </div>
        )
    }

    if (isError) {
        return <ErrorState onRetry={refetch} />
    }

    if (!product) {
        return <NotFound />
    }

    return (
        <div className="min-h-screen bg-orange-50 mx-auto pt-16 px-8">
            <Link to="/" className="text-sm underline font-semibold">
                    &larr; Volver
            </Link>
            <div className="flex justify-center w-full">
                <div className="mt-4 grid gap-6 md:grid-cols-2 max-w-4xl">
                <img src={product.image} alt={product.name} className="rounded-2xl w-full" />
                <div>
                    <p className="text-sm text-yellow-700">{product.category}</p>
                    <h1 className="text-2xl text-amber-900 font-bold">{product.name}</h1>
                    <p className="text-xl text-amber-600 mt-2">${product.price.toFixed(2)}</p>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default ProductDetail