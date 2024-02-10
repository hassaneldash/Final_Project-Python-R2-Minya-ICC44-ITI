//imports the action types 
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './favoritesActions';

//This array will hold the list of favorite products
const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [...state, action.payload];
    case REMOVE_FROM_FAVORITES:
      return state.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
};

export default favoritesReducer;
