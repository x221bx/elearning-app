// src/redux/slices/wishlistSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    initialized: false
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems(state, action) {
            state.items = action.payload || [];
            state.initialized = true;
        },
        addToWishlist(state, action) {
            const courseId = action.payload;
            if (!state.items.includes(courseId)) {
                state.items.push(courseId);
            }
        },
        removeFromWishlist(state, action) {
            state.items = state.items.filter(id => id !== action.payload);
        }
    }
});

export const {
    setWishlistItems,
    addToWishlist,
    removeFromWishlist
} = wishlistSlice.actions;

// Base selector with null safety
const getWishlistState = state => state?.wishlist || initialState;

// Memoized selectors with null safety
export const selectWishlistItems = createSelector(
    [getWishlistState],
    state => state?.items || []
);

export const selectIsWishlistInitialized = createSelector(
    [getWishlistState],
    state => Boolean(state?.initialized)
);

// Helper selector creator for checking if a specific course is in the wishlist
export const selectIsInWishlist = courseId =>
    createSelector(
        [selectWishlistItems],
        items => items.includes(courseId)
    );

export default wishlistSlice.reducer;