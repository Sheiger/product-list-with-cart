import { useState } from "react";
import { useCartStore } from "../../services/cartStore";
import type { Product } from "../../interface/products";
import OrderConfirmedModal from "../modals/orderConfirmed";

interface CartProps {
    products: Product[]
    quantities: Record<number, number>
    onRemove: (id: number) => void
}

const Cart = ({ products, quantities, onRemove }: CartProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const clearCart = useCartStore((state) => state.clearCart)

    const cartItems = products
        .filter((p) => (quantities[p.id] ?? 0) > 0)
        .map((p) => ({ ...p, quantity: quantities[p.id]}))

    const total = cartItems.reduce (
        (sum, item) => sum + item.price * item.quantity, 0
    )

    const cant = cartItems.reduce (
        (sum, item) => sum + item.quantity, 0
    )

    const handleStartNewOrder = () => {
        setIsModalOpen(false)
        clearCart();
    }

    return (
        <div className="bg-white p-4">
            <h2 className="text-2xl font-bold text-amber-800"> You Cart ({cant})</h2>
        
            { cartItems.length === 0 ? (
                <div className="flex flex-col items-center">
                    <img src="https://images.vexels.com/media/users/3/322018/isolated/preview/90edee33f22270e889e6bb4fe2dc7962-gran-pastel-de-cumpleanos-dibujos-animados-retro.png" alt="Carrito vacio"></img>
                    <span className="font-semibold text-gray-400">Your added items will appear here</span>
                </div>
            ) : (
                <ul className="flex flex-col gap-2">
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <li className="flex justify-between items-center">
                                <div className="pt-2">
                                    <span className="text-sm font-semibold py-2">{item.name}</span>
                                    <div className="flex py-2">
                                        <p className="text-sm text-amber-700 font-semibold pr-2">{item.quantity}x</p>
                                        <p className="text-sm text-gray-400 pr-2">@${(item.price).toFixed(2)}</p>
                                        <span className="text-sm font-semibold text-amber-950">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={() => onRemove(item.id)} 
                                className="rounded-full border border-gray-400 size-4 flex items-center justify-center text-gray-400">
                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M1 1L9 9M9 1L1 9"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <hr className="border border-gray-200 w-full"/>
                        </div>
                    ))}
                </ul>

            )}

            {cartItems.length > 0 && (
                <div>
                    <div className="pt-4 font-bold text-right mb-4 flex justify-between">
                        <p>Cost Total:</p>
                        ${total.toFixed(2)}
                    </div>
                    <div className="flex justify-center py-3 mb-4 bg-gray-100 rounded-xl text-sm">
                        <p>This is a <b>carbon-neutral</b> delivery</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-amber-800 text-white w-full rounded-4xl py-3">Confirm Order</button>
                </div>
            )}

            {isModalOpen && (<OrderConfirmedModal cartItems={cartItems} total={total} onClose={handleStartNewOrder} />)}
        </div>
        
    )
}

export default Cart