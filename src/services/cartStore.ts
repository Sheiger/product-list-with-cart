import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../interface/products";

interface CartState {
    quantities: Record<number, number>
    cartProducts: Record<number, Product>
    increase: (product: Product) => void
    decrease: (id: number) => void
    remove: (id: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            quantities: {},
            cartProducts: {},

            increase: (product) =>
                set((state) => ({
                    quantities: { ...state.quantities, [product.id]: (state.quantities[product.id] ?? 0) + 1 },
                    cartProducts: { ...state.cartProducts, [product.id]: product }
                })),

            decrease: (id) =>
                set((state) => {
                    const current = state.quantities[id] ?? 0
                    if (current <= 1) {
                        const { [id]: _, ...restQuantities } = state.quantities
                        const { [id]: __, ...restProducts } = state.cartProducts
                        return { quantities: restQuantities, cartProducts: restProducts}
                    }
                    return { quantities: { ...state.quantities, [id]: current - 1}}
                }),

            remove: (id) =>
                set((state) => {
                    const {[id]: _, ...restQuantities } = state.quantities
                    const { [id]: __, ...restProducts } = state.cartProducts
                    return { quantities: restQuantities, cartProducts: restProducts}
                }),
                
            clearCart: () => set({ quantities: {}, cartProducts: {} }),
        }),
        {
            name: 'cart-storage'
        }
    )
)