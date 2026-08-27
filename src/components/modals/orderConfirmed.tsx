import type { Product } from "../../interface/products"

interface CartItem extends Product {
    quantity: number
}

interface OrderProps {
    cartItems: CartItem[]
    total: number
    onClose: () => void
}

function OrderConfirmedModal ({cartItems, total, onClose}: OrderProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
            <div className="bg-white w-full sm:max-w-md p-6 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
                <svg className="mb-4 text-green-600" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5015L34.5 18.621L21 32.121Z" fill="#1EA896"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM6.99998 24C6.99998 14.611 14.611 6.99998 24 6.99998C33.389 6.99998 41 14.611 41 24C41 33.389 33.389 41 24 41C14.611 41 6.99998 33.389 6.99998 24Z" fill="#1EA896"/>
                </svg>
                <h2 className="text-3xl font-bold mb-2 text-amber-950">Order Confirmed</h2>
                <p className="text-amber-950 mb-6">We hope you enjoy your food!</p>

                <div className="bg-gray-100 px-4 py-2 mb-6 rounded-lg">
                    <ul className="flex flex-col gap-2">
                        {cartItems.map((item) => (
                            <div key={item.id}>
                                <li className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img src={item.image} className="size-12 rounded-lg"></img>
                                        <div className="pt-2 pl-4">
                                            <span className="text-sm font-semibold py-2">{item.name}</span>
                                            <div className="flex py-2">
                                                <p className="text-sm text-amber-700 font-semibold pr-2">{item.quantity}x</p>
                                                <p className="text-sm text-gray-500 pr-2">@${(item.price).toFixed(2)}</p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <span className="text-lg font-semibold text-amber-950">${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            </div>
                        ))}
                    </ul>

                    <div className="pt-4 mb-4 flex justify-between items-center text-amber-950">
                        <p className="text-sm">Order Total:</p>
                        <span className="font-bold text-2xl">${total.toFixed(2)}</span>
                    </div>
                </div>
                
                <button onClick={onClose} className="bg-amber-800 text-white w-full rounded-4xl py-3">Start New Order</button>
            </div>
            
        </div>
    )
}

export default OrderConfirmedModal