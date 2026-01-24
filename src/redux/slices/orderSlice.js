import { createSlice } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/handleAxiosError";

// Initial state
const initialState = {
    orders: [],
    isLoaded: false,
};

// Create the order slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // Set orders
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.isLoaded = true;
        },
        // Set loading state
        setIsLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        clearOrders: (state, value) => {
            state.orders = [];
            state.isLoaded = false;
        },
    },
});

// Export the basic actions
export const { setOrders, setIsLoaded, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
