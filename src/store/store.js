import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers'; // Assuming you have a rootReducer combining all reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
