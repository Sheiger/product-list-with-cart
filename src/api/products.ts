import { apiClient } from "./client"
import type { Product } from "../interface/products"

const ARTIFICIAL_DELAY = 1200;

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductFilters {
    search?: string
    category?: string
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
    const params: Record<string, string> = {};
    if (filters.search) params.name_like = filters.search;
    if (filters.category) params.category = filters.category;

    const [response] = await Promise.all([
        apiClient.get<Product[]>("/products", {params}),
        delay(ARTIFICIAL_DELAY),
    ])
    return response.data
}