import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
    quantities: Record<number, number>
    increase: (id: number) => void
    decrease: (id: number) => void
    remove: (id: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            quantities: {},
            increase: (id) =>
                set((state) => ({
                    quantities: { ...state.quantities, [id]: (state.quantities[id] ?? 0) + 1 }
                })),
            decrease: (id) =>
                set((state) => {
                    const current = state.quantities[id] ?? 0
                    if (current <= 1) {
                        const { [id]: _, ...rest } = state.quantities
                        return { quantities: rest}
                    }
                    return { quantities: { ...state.quantities, [id]: current - 1}}
                }),
            remove: (id) =>
                set((state) => {
                    const {[id]: _, ...rest } = state.quantities
                    return { quantities: rest}
                }),
            clearCart: () => set({ quantities: {} }),
        }),
        {
            name: 'cart-storage'
        }
    )
)