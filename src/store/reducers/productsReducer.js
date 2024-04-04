import { FETCH_MENU_ITEMS_REQUEST, FETCH_MENU_ITEMS_SUCCESS, FETCH_MENU_ITEMS_FAILURE } from '../types';

const initialState = {
	items: [],
	loading: false,
	error: null
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MENU_ITEMS_REQUEST:
			return {
				...state,
				loading: true,
				error: null
			};
		case FETCH_MENU_ITEMS_SUCCESS:
			return {
				...state,
				items: action.payload,
				loading: false,
				error: null
			};
		case FETCH_MENU_ITEMS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default productsReducer;
