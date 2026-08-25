import Dessert from "../cards/Dessert"
import { products } from "../../data/products"

const Desserts = () => (
    <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold pb-8">Desserts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <main className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 gap-y-8"> 
                    { products.map((data) => (
                        <Dessert key={data.id} data={data} />
                    ))}
                </div>
            </main>

            <aside className="md:col-span-1">

            </aside>

        </div>     
    </div>
)

export default Desserts