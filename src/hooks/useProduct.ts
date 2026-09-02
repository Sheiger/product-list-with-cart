import { useState, useEffect, useCallback } from "react";
import { fetchProductById } from "../api/productById";
import type { Product } from "../interface/products";

export function useProduct(id?: number) {
    const [data, setData] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setIsError(false);
        try {
            const product = await fetchProductById(id);
            setData(product);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [id])

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct])

    return { data, isLoading, isError, refetch: fetchProduct}
}