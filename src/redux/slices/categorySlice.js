import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    categories: [],
    isLoaded: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, value) => {
            state.categories = value.payload;
        },
        setIsCategoriesLoaded: (state, value) => {
            state.isLoaded = value.payload;
        },
        clearCategory: (state, value) => {
            state.categories = [];
            state.isLoaded = false;
        },
    },
});

// Export actions
export const { setCategories, setIsCategoriesLoaded, clearCategory } =
    categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
