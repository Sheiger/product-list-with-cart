import type { Product } from "../../data/products"
import AddToCartButton from "../buttons/AddToCartButton";

interface DessertProps {
  data: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function DessertCard({data, quantity, onIncrease, onDecrease}: DessertProps) {
    const isInCart = quantity > 0

    return (
        <article className="">
            <div className="relative">
                <img src={data.image} alt={data.name}
                className={`rounded-lg w-full aspect-square object-cover
                ${isInCart ? "border-2 border-amber-700" : "border-2 border-transparent"}`} 
                ></img>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <AddToCartButton quantity={quantity} onIncrease={onIncrease} onDecrease={onDecrease}/>
                </div>
            </div>
            <div className="flex flex-col pt-8">
                <span className="text-yellow-700">{data.category}</span>
                <span className="text-lg text-amber-900 font-semibold">{data.name}</span>
                <span className="text-lg text-amber-600 font-semibold">${(data.price).toFixed(2)}</span>
            </div>
        </article>
    )
}



export default DessertCard