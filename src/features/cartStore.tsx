const ADD_NEW = "ADD_NEW";
const DELETE = "DELETE";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const SET_QUANTITY = "SET_QUANTITY";
const IGNORED = "IGNORED";
const CLEAR_CART = "CLEAR_CART";


type ShoppingItem = {
    id: number;
    name: string;
    price: {
        main: number;
        fractional: number;
    };
    quantity: number;
};

type CartState = {
    items: ShoppingItem[];
    totalQuantity: number;
};

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
};


function isValidId(id: unknown): id is number {
    return typeof id === "number" && !isNaN(id) && id >= 0;
}

export function clearCart() {
    return { type: CLEAR_CART };
}

export function addToCart(item: ShoppingItem) {
    if (!item || !isValidId(item.id)) {
        console.warn("addToCart: nieprawidłowy produkt", item);
        return { type: IGNORED, payload: null };
    }
    return {
        type: ADD_NEW,
        payload: item,
    };
}

export function deleteItem(id: number) {
    if (!isValidId(id)) {
        console.warn("deleteItem: nieprawidłowy ID", id);
        return { type: IGNORED, payload: null };
    }
    return {
        type: DELETE,
        payload: id,
    };
}

export function increaseQuantity(id: number) {
    if (!isValidId(id)) {
        console.warn("increaseQuantity: nieprawidłowy ID", id);
        return { type: IGNORED, payload: null };
    }

    return {
        type: INCREASE_QUANTITY,
        payload: id,
    };
}

export function decreaseQuantity(id: number) {
    if (!isValidId(id)) {
        console.warn("decreaseQuantity: nieprawidłowy ID", id);
        return { type: IGNORED, payload: null };
    }

    return {
        type: DECREASE_QUANTITY,
        payload: id,
    };
}

export function setQuantity(id: number, quantity: number) {
    if (!isValidId(id) || typeof quantity !== "number" || quantity < 1) {
        console.warn("setQuantity: nieprawidłowe dane", { id, quantity });
        return { type: IGNORED, payload: null };
    }

    return {
        type: SET_QUANTITY,
        payload: { id, quantity },
    };
}



const findItem = (state: CartState, id: number): ShoppingItem | undefined => {
    return state.items.find(item => item.id === id);
};

const cartReducer = (state: CartState = initialState, action: any): CartState => {
    switch (action.type) {
        case ADD_NEW: {
            const item = action.payload as ShoppingItem;
            if (!item || typeof item.id !== "number") return state;

            const exists = findItem(state, item.id);

            if (exists) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                    totalQuantity: state.totalQuantity + 1,
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...item, quantity: 1 }],
                    totalQuantity: state.totalQuantity + 1,
                };
            }
        }

        case DELETE: {
            const id = action.payload;
            const exists = findItem(state, id);
            if (!exists) {
                console.warn("inDelete: brak produktu w koszyku o id:", id);
                return state;
            }
            return {
                ...state,
                items: state.items.filter(item => item.id !== id),
                totalQuantity: state.totalQuantity - exists.quantity,
            };
        }

        case INCREASE_QUANTITY: {
            const id = action.payload;
            const exists = findItem(state, id);
            if (!exists) {
                console.warn("inIncreaseQuantity: brak produktu w koszyku o id:", id);
                return state;
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                totalQuantity: state.totalQuantity + 1,
            };
        }

        case DECREASE_QUANTITY: {
            const id = action.payload;
            const exists = findItem(state, id);
            if (!exists) {
                console.warn("inDecreaseQuantity: brak produktu w koszyku o id:", id);
                return state;
            }
            if (exists.quantity <= 1) {
                console.warn("inDecreaseQuantity: ilość już minimalna dla id:", id);
                return state;
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
                totalQuantity: state.totalQuantity - 1,
            };
        }

        case SET_QUANTITY: {
            const { id, quantity } = action.payload;
            if (!Number.isInteger(quantity) || quantity < 1) {
                console.warn("SET_QUANTITY: nieprawidłowa ilość", quantity);
                return state;
            }
            const exists = findItem(state, id);
            if (!exists) {
                console.warn("inSetQuantity: brak produktu w koszyku o id:", id);
                return state;
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                ),
                totalQuantity: state.totalQuantity - exists.quantity + quantity,
            };
        }
        case CLEAR_CART:
            return {
                items: [],
                totalQuantity: 0,
            };

        default:
            return state;
    }
};

export default cartReducer;
