import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import wishlistReducer from "./slices/wishListSlice";
import addressReducer from "./slices/addressSlice";
import fabricReducer from "./slices/fabricSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        product: productReducer,
        category: categoryReducer,
        wishlist: wishlistReducer,
        addresses: addressReducer,
        fabrics: fabricReducer,
    },
});
