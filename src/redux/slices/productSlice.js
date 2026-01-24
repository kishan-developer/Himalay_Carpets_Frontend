import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    products: [],
    isLoaded: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, value) => {
            state.products = value.payload;
        },
        setIsProductLoaded: (state, value) => {
            state.isLoaded = value.payload;
        },
        clearProducts: (state, value) => {
            state.products = [];
            state.isLoaded = false;
        },
    },
});

// Export actions
export const { setProducts, setIsProductLoaded, clearProducts } =
    productSlice.actions;

// Export reducer
export default productSlice.reducer;
