type State = Record<number, number>

type Action = 
    | { type: "increase"; id: number}
    | { type: "decrease"; id: number}
    | { type: "remove"; id: number}

function quantitiesReducer(state: State, action: Action): State {
    switch (action.type) {
        case "increase":
            return { ...state, [action.id]: (state[action.id] ?? 0) + 1 }

        case "decrease": {
            const newQty = (state[action.id] ?? 0) - 1
            if (newQty <= 0) {
                const { [action.id]: _, ...rest } = state
                return rest
            }
            return { ...state, [action.id]: newQty}
        }
        
        case "remove": {
            const { [action.id]: _, ...rest } = state
            return rest 
        }

        default: return state
    }
}

export default quantitiesReducer