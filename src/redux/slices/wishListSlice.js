import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishList: (state, action) => {
            const product = action.payload;

            // Check if product already exists in wishlist
            const exists = state.find((item) => item._id === product._id);
            if (!exists) {
                state.push(product);
            }
        },
        removeFromWishList: (state, action) => {
            const productId = action.payload;
            return state.filter((item) => item._id !== productId);
        },
        setWishList: (state, action) => {
            return action.payload;
        },
        clearWishlist: (state, value) => {
            return [];
        },
    },
});

export const { addToWishList, removeFromWishList, setWishList, clearWishlist } =
    wishListSlice.actions;
export default wishListSlice.reducer;
