import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from '../types';

const initialState = {
    items: [] // Array to store items in the cart
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
			console.log(action.payload)
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case UPDATE_CART_ITEM_QUANTITY:
            const updatedItems = state.items.map(item =>
                item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item
            );
            // Filter out items with quantity 0
            const filteredItems = updatedItems.filter(item => item.quantity > 0);
            return {
                ...state,
                items: filteredItems
            };
        default:
            return state;
    }
};

export default cartReducer;
