import type { Product } from "../../data/products";

interface CartProps {
    products: Product[]
    quantities: Record<number, number>
}

const Cart = ({ products, quantities }: CartProps) => {
    const cartItems = products
        .filter((p) => (quantities[p.id] ?? 0) > 0)
        .map((p) => ({ ...p, quantity: quantities[p.id]}))

    const total = cartItems.reduce (
        (sum, item) => sum + item.price * item.quantity, 0
    )

    return (
        <div className="bg-white p-4">
            <h2 className="text-2xl font-bold text-amber-800"> You Cart ({cartItems.length})</h2>
        
            { cartItems.length === 0 ? (
                <div className="flex flex-col items-center">
                    <img src="https://images.vexels.com/media/users/3/322018/isolated/preview/90edee33f22270e889e6bb4fe2dc7962-gran-pastel-de-cumpleanos-dibujos-animados-retro.png" alt="Carrito vacio"></img>
                    <span className="font-semibold text-gray-400">Your added items will appear here</span>
                </div>
            ) : (
                <ul className="flex flex-col gap-2">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

            )}

            {cartItems.length > 0 && (
                <div className="pt-4 font-bold text-right">
                    Total: ${total.toFixed(2)}
                </div>
            )}
        </div>
    )
}

export default Cart