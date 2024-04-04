import { createSelector } from 'reselect';

// Define a selector function to get the items from the store
const selectItems = state => state.products.items;

// Define the getItemById selector
export const getItemById = createSelector(
	[selectItems, (_, itemId) => itemId], // Pass the items and itemId as input selectors
	(items, itemId) => {
		// Find the item with the given itemId from the items array
		return items.find(item => item.id === itemId) || {};
	}
);
