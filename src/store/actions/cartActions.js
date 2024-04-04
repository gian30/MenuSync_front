import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY } from '../types';

export const addToCart = (item) => ({
	type: ADD_TO_CART,
	payload: item
});

export const updateCartItemQuantity = (itemId, quantity) => ({
	type: UPDATE_CART_ITEM_QUANTITY,
	payload: { itemId, quantity }
});
