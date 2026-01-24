import { createSlice } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/handleAxiosError";

// Initial state
const initialState = {
    addresses: [],
    isLoaded: false,
};

// Create the order slice
const addressSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        // Set orders
        setAddress: (state, action) => {
            state.addresses = action.payload;
            state.isLoaded = true;
        },
        // Set loading state
        setIsLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        clearAddress: (state, value) => {
            state.addresses = [];
            state.isLoaded = false;
        },
    },
});

// Export the basic actions
export const { setAddress, setIsLoaded, clearAddress } = addressSlice.actions;

export default addressSlice.reducer;
