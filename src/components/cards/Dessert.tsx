import type { Product } from "../../data/products"

interface DessertProps {
  data: Product;
}

function Dessert({data}: DessertProps) {
    return (
        <article>
            <div className="">
                <img className="rounded-lg size-56" src={data.image} alt={data.name}></img>
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-gray-500">{data.name}</span>
                <span className="text-lg font-semibold">{data.description}</span>
                <span className="text-lg text-amber-600">${data.price}</span>
            </div>
        </article>
    )
}



export default Dessert