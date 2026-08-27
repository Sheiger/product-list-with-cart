import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../api/products"

export function useCategories() {
    return useQuery({
        queryKey: ["products", "all"],
        queryFn: () => fetchProducts(),
        select: (products) => Array.from(new Set(products.map((p) => p.category)))
    })
}