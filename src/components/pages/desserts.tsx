import DessertCard from "../cards/DessertCard"
import { products } from "../../interface/products"
import { useReducer } from "react"
import Cart from "../cart/Cart"
import quantitiesReducer from "../../hooks/cartReducer"

const Desserts = () => {

    const [quantities, dispatch] = useReducer(quantitiesReducer, {})
    
    const handleIncrease = (id: number) => dispatch({ type: "increase", id})
    const handleDecrease = (id: number) => dispatch({ type: "decrease", id})
    const handleRemove = (id: number) => dispatch({ type: "remove", id})

    return (
        <div className="min-h-screen bg-orange-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-16 px-8">
                <main className="md:col-span-2">
                    <h1 className="text-4xl font-bold text-amber-900 pb-8">Desserts</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8"> 
                        { products.map((data) => (
                            <DessertCard key={data.id} 
                                data={data}
                                quantity={quantities[data.id] ?? 0}
                                onIncrease={() => handleIncrease(data.id)}
                                onDecrease={() => handleDecrease(data.id)}/>
                        ))}
                    </div>
                </main>

                <aside className="md:col-span-1">
                    <Cart products={products} quantities={quantities} onRemove={handleRemove}/>
                </aside>

            </div>     
        </div>
    )
    
}

export default Desserts