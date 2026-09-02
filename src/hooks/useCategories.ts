import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../api/products"
import type { Product } from "../interface/products"

export function useCategories() {
    return useQuery({
        queryKey: ["products", "all"],
        queryFn: () => fetchProducts(),
        select: (data) => {
            const productsList = data.products || [];
            return Array.from(new Set(productsList.map((p: Product) => p.category)))
        }
    })
}