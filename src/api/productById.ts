import { apiClient } from "./client";
import type { Product } from "../interface/products";

export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
}