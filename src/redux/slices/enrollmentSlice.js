// src/redux/slices/enrollmentSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    initialized: false
};

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
        setEnrolledCourses(state, action) {
            state.items = action.payload || [];
            state.initialized = true;
        },
        enrollCourse(state, action) {
            const courseId = action.payload;
            if (!state.items.includes(courseId)) {
                state.items.push(courseId);
            }
        },
        unenrollCourse(state, action) {
            state.items = state.items.filter(id => id !== action.payload);
        }
    }
});

export const {
    setEnrolledCourses,
    enrollCourse,
    unenrollCourse
} = enrollmentSlice.actions;

// Base selector with null safety
const getEnrollmentState = state => state?.enrollment || initialState;

// Memoized selectors with null safety
export const selectEnrolledCourses = createSelector(
    [getEnrollmentState],
    state => state?.items || []
);

export const selectIsEnrolled = (courseId) =>
    createSelector(
        [selectEnrolledCourses],
        items => Boolean(items?.includes(courseId))
    );

export const selectIsEnrollmentInitialized = createSelector(
    [getEnrollmentState],
    state => Boolean(state?.initialized)
);

export default enrollmentSlice.reducer;