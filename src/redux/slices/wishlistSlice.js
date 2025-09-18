// src/redux/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [] },
    reducers: {
        addToWishlist(state, action) {
            if (!state.items.includes(action.payload)) state.items.push(action.payload);
        },
        removeFromWishlist(state, action) {
            state.items = state.items.filter((id) => id !== action.payload);
        },
    },
});
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
