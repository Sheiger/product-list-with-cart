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
        <div className="min-h-screen bg-orange-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-16">
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
                    <div className="bg-white p-4">
                        <h2 className="text-2xl font-bold text-amber-600">You Cart (0)</h2>
                        <div className="flex flex-col items-center">
                            <img src="https://images.vexels.com/media/users/3/322018/isolated/preview/90edee33f22270e889e6bb4fe2dc7962-gran-pastel-de-cumpleanos-dibujos-animados-retro.png" alt="Carrito vacio"></img>
                            <span className="font-semibold text-gray-400">Your added items will appear here</span>
                        </div>
                        
                    </div>
                </aside>

            </div>     
        </div>
    )
    
}

export default Desserts