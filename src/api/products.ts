import { apiClient } from "./client"
import type { Product } from "../interface/products"

const ARTIFICIAL_DELAY = 1200;

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts(): Promise<Product[]> {
    const [response] = await Promise.all([
        apiClient.get<Product[]>("/products"),
        delay(ARTIFICIAL_DELAY),
    ])
    return response.data
}