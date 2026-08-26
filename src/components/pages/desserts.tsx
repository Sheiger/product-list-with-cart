import DessertCard from "../cards/DessertCard"
import { products } from "../../data/products"
import { useState } from "react"

const Desserts = () => {

    const [quantities, setQuantities] = useState<Record<number, number>>({})

    const handleIncrease = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] ?? 0) + 1,
        }))
    }

    const handleDecrease = (id: number) => {
        setQuantities((prev) => {
            const newQty = (prev[id] ?? 0) - 1;
            if (newQty <= 0) {
            const { [id]: _, ...rest } = prev;
            return rest;
            }
            return { ...prev, [id]: newQty };
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-amber-900 pb-8 pt-6">Desserts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <main className="md:col-span-2">
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

                </aside>

            </div>     
        </div>
    )
    
}

export default Desserts