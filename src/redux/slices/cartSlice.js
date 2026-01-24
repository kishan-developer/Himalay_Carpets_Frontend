import { createSlice } from "@reduxjs/toolkit";
const cartItems = [];
// Helper function to recalculate total items and subtotal
const recalculateTotals = (state) => {
    state.totalItems = state?.cartItems?.reduce(
        (sum, item) => sum + item?.quantity,
        0
    );
    state.subtotal = state?.cartItems?.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
    );
};
// Function to get initial totals
const getInitialTotals = (items) => ({
    totalItems: items?.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items?.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
    ),
});
const { totalItems, subtotal } = getInitialTotals(cartItems);
// Initial state for the cart
const initialState = {
    cartItems,
    totalItems,
    subtotal,
    stepCount: 1,
    discountPercentage: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            );
            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                state?.cartItems?.push({
                    ...item,
                    quantity: item.quantity || 1,
                });
            }

            recalculateTotals(state);
        },

        removeFromCart: (state, action) => {
            const { id, idx } = action.payload;
            state.cartItems = state.cartItems.filter(
                (item, index) => !(item._id == id && index == idx)
            );

            recalculateTotals(state);
        },

        updateQuantity: (state, action) => {
            const { id, quantity, idx } = action.payload;
            const item = state.cartItems.find(
                (cartItem, index) => cartItem._id === id && index === idx
            );

            if (item && quantity > 0) {
                item.quantity = quantity;
            } else if (item && quantity <= 0) {
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== id
                );
            }

            recalculateTotals(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalItems = 0;
            state.subtotal = 0;
        },

        setStepCount: (state, action) => {
            state.stepCount = action.payload;
        },
        setCart: (state, action) => {
            state.cartItems = action.payload;
            recalculateTotals(state);
        },
        setCouponDiscount: (state, action) => {
            state.discountPercentage = action.payload.discountPercentage;
        },
        removeCouponDiscount: (state) => {
            state.discountPercentage = 0;
        },
    },
});

// Export actions
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setStepCount,
    setCart,
    setCoupon,
    setCouponDiscount,
    removeCouponDiscount,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
