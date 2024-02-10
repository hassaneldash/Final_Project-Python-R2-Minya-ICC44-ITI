import { combineReducers } from 'redux';
import favoritesReducer from './fav/favoritesReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
