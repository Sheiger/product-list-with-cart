import { apiClient } from "./client"
import type { Product } from "../interface/products"

//const ARTIFICIAL_DELAY = 1200;
const PER_PAGE = 5;

//const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductFilters {
    search?: string
    category?: string
    page?: number
}

export interface ProductsPage {
    products: Product[]
    totalPages: number
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<ProductsPage> {
    const { search, category, page = 1 } = filters;

    const params: Record<string, string | number> = {
        _page: page,
        _limit: PER_PAGE,
    };
    if (search) params.name_like = search;
    if (category) params.category = category;

    const [response] = await Promise.all([
        apiClient.get("/products", { params }),
        //delay(ARTIFICIAL_DELAY),
    ]);

    const totalCountHeader = response.headers['x-total-count'];
    const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : response.data.length;

    return {
        products: response.data,
        totalPages: Math.max(1, Math.ceil(totalItems / PER_PAGE))
    };
}