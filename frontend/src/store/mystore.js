import { createStore } from 'redux';
import favoritesReducer from './reducers/favourite';

const mystore = createStore(favoritesReducer);

export default mystore;