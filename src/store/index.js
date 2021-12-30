
import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './reducers/products/ProductsSlice';
import CartReducer from './reducers/carts/CartSlice';
import UserReducer from './reducers/users/UserSlice';
import loadingSlice from './reducers/global/loading';
import OrderReducer from './reducers/orders/OrderSlice';
const store = configureStore({
    reducer: {
        ProductsReducer,
        CartReducer,
        UserReducer,
        loading: loadingSlice,
        OrderReducer
    }
})
export default store;