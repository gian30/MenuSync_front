import { FETCH_MENU_ITEMS_REQUEST, FETCH_MENU_ITEMS_SUCCESS, FETCH_MENU_ITEMS_FAILURE } from '../types';

export const fetchMenuItems = () => dispatch => {
	dispatch({ type: FETCH_MENU_ITEMS_REQUEST });

	fetch('https://menusync-back-82af2f8cc329.herokuapp.com/')
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: FETCH_MENU_ITEMS_SUCCESS,
				payload: data.data
			});
		})
		.catch(error => {
			dispatch({
				type: FETCH_MENU_ITEMS_FAILURE,
				payload: error.message
			});
		});
};
