// src/redux/slices/cartSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    paymentProcessing: false,
    initialized: false
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.courseId !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
        setCartItems(state, action) {
            state.items = action.payload || [];
            state.initialized = true;
        },
        setPaymentProcessing(state, action) {
            state.paymentProcessing = action.payload;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    setCartItems,
    setPaymentProcessing
} = cartSlice.actions;

// Base selector with null safety
const getCartState = state => state?.cart || initialState;

// Memoized selectors with null safety
export const selectCartItems = createSelector(
    [getCartState],
    state => state.items || []
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    items => items.reduce((total, item) => total + (parseFloat(item.price) || 0), 0)
);

export const selectIsInCart = courseId =>
    createSelector(
        [selectCartItems],
        items => items.some(item => item.courseId === courseId)
    );

export const selectPaymentProcessing = createSelector(
    [getCartState],
    state => Boolean(state.paymentProcessing)
);

export default cartSlice.reducer;