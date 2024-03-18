import { combineReducers } from 'redux';
import favoritesReducer from './AddToFav';
import sidebarReducer from "../sidebarSlice";
import categoryReducer from "../categorySlice";
import productReducer from "../productSlice";
import cartReducer from "../cartSlice";
import searchReducer from "../searchSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    
});

export default rootReducer;
