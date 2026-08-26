interface AddToCartButtonProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

function AddToCartButton({quantity, onIncrease, onDecrease}: AddToCartButtonProps) {
    if(quantity === 0) {
        return (
            <button onClick={onIncrease}
                    className="w-36 h-10 flex items-center justify-center gap-2 border-2 border-amber-600 rounded-full text-sm bg-white hover:bg-amber-600 text-amber-900 font-semibold">
                Add to Cart
            </button>
        )
    }

    return (
        <div className="w-36 h-10 flex items-center justify-between border-2 border-amber-600 rounded-full text-sm bg-amber-600 px-3 text-amber-900 font-semibold">
            <button onClick={onDecrease} className="font-bold size-6 border-2 border-white rounded-full text-white">-</button>
            <span className="font-medium">{quantity}</span>
            <button onClick={onIncrease} className="font-bold size-6 border-2 border-white rounded-full text-white">+</button>
        </div>
    )
}

export default AddToCartButton