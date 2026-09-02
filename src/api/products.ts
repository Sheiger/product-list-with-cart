//import { apiClient } from "./client"
import axios from "axios"
import type { Product } from "../interface/products"

const ARTIFICIAL_DELAY = 1200;
const PER_PAGE = 5;

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

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
        _per_page: PER_PAGE,
        _limit: PER_PAGE,
    };
    if (search) params.name_like = search;
    if (category) params.category = category;

    const [response] = await Promise.all([
        //apiClient.get("/products", { params }),
        axios.get("/data.json", { params }),
        delay(ARTIFICIAL_DELAY),
    ]);

    let productsList = response.data;

    const totalCountHeader = response.headers['x-total-count'];
    const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : productsList.length;

    if (productsList.length > PER_PAGE) {
        const startIndex = (page - 1) * PER_PAGE;
        const endIndex = startIndex + PER_PAGE;
        productsList = productsList.slice(startIndex, endIndex);
    }
    
    return {
        products: response.data,
        totalPages: Math.max(1, Math.ceil(totalItems / PER_PAGE))
    };
}