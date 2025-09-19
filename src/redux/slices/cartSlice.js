// src/redux/slices/cartSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Array of { courseId, price }
        paymentProcessing: false,
    },
    reducers: {
        addToCart(state, action) {
            const { courseId, price } = action.payload;
            if (!state.items.find(item => item.courseId === courseId)) {
                state.items.push({ courseId, price });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.courseId !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
        setCartItems(state, action) {
            state.items = action.payload;
        },
        setPaymentProcessing(state, action) {
            state.paymentProcessing = action.payload;
        }
    },
});

export const { addToCart, removeFromCart, clearCart, setCartItems, setPaymentProcessing } = cartSlice.actions;

// Selectors
export const selectCartState = (state) => state.cart;
export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.items
);
export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.price, 0)
);
export const selectIsInCart = courseId =>
    createSelector(
        [selectCartItems],
        (items) => items.some(item => item.courseId === courseId)
    );
export const selectPaymentProcessing = createSelector(
    [selectCartState],
    (cart) => cart.paymentProcessing
);

export default cartSlice.reducer;