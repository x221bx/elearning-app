// src/redux/slices/wishlistSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [], // Array of course IDs in wishlist
        enrolled: [], // Array of enrolled course IDs
    },
    reducers: {
        addToWishlist(state, action) {
            const courseId = action.payload;
            // Only add to wishlist if not enrolled
            if (!state.enrolled.includes(courseId) && !state.items.includes(courseId)) {
                state.items.push(courseId);
            }
        },
        removeFromWishlist(state, action) {
            state.items = state.items.filter((id) => id !== action.payload);
        },
        enrollCourse(state, action) {
            const courseId = action.payload;
            // Add to enrolled courses
            if (!state.enrolled.includes(courseId)) {
                state.enrolled.push(courseId);
                // Remove from wishlist if present
                state.items = state.items.filter((id) => id !== courseId);
            }
        },
        unenrollCourse(state, action) {
            const courseId = action.payload;
            state.enrolled = state.enrolled.filter((id) => id !== courseId);
        },
    },
});

export const { addToWishlist, removeFromWishlist, enrollCourse, unenrollCourse } = wishlistSlice.actions;

// Selectors
export const selectWishlistState = (state) => state.wishlist;
export const selectWishlistItems = createSelector(
    [selectWishlistState],
    (wishlist) => wishlist.items
);
export const selectEnrolledCourses = createSelector(
    [selectWishlistState],
    (wishlist) => wishlist.enrolled
);
export const makeSelectIsInWishlist = () =>
    createSelector(
        [selectWishlistItems, (_, courseId) => courseId],
        (items, courseId) => items.includes(courseId)
    );
export const makeSelectIsEnrolled = () =>
    createSelector(
        [selectEnrolledCourses, (_, courseId) => courseId],
        (enrolled, courseId) => enrolled.includes(courseId)
    );

export default wishlistSlice.reducer;
