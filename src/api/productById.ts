import axios from "axios";
import type { Product } from "../interface/products";

export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await axios.get<Product[]>("/data.json")
    const product = response.data.find((p) => p.id === Number(id))

    if (!product) {
        throw new Error("Producto no encontrado");
    }
    
    return product;
}
/*
import { apiClient } from "./client";
import type { Product } from "../interface/products";

export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
}*/