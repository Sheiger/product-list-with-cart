import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type ProductFilters } from "../api/products";

export function useProducts(filters: ProductFilters = {}) {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => fetchProducts(filters)
    })
}