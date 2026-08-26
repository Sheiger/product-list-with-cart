interface AddToCartButtonProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

function AddToCartButton({quantity, onIncrease, onDecrease}: AddToCartButtonProps) {
    if(quantity === 0) {
        return (
            <button onClick={onIncrease}
                    className="border-2 border-amber-600 rounded-full w-full max-w-40 h-10 text-sm bg-white hover:bg-amber-600 px-2 text-amber-900 font-semibold">
                Add to Cart
            </button>
        )
    }

    return (
        <div className="flex items-center justify-between w-full max-w-40 h-10 border-2 border-amber-600 rounded-full text-sm bg-amber-600 px-2 text-amber-900 font-semibold">
            <button onClick={onDecrease} className="font-bold size-6 border-2 border-white rounded-full text-white">-</button>
            <span className="font-medium">{quantity}</span>
            <button onClick={onIncrease} className="font-bold size-6 border-2 border-white rounded-full text-white">+</button>
        </div>
    )
}

export default AddToCartButton