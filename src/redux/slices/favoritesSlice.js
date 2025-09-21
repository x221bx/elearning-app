import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    initialized: false
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const courseId = action.payload;
            if (!state.items.includes(courseId)) {
                state.items.push(courseId);
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter(id => id !== action.payload);
        },
        setFavorites: (state, action) => {
            state.items = action.payload || [];
            state.initialized = true;
        },
        clearFavorites: (state) => {
            state.items = [];
        }
    }
});

export const {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
    clearFavorites
} = favoritesSlice.actions;

const getFavoritesState = state => state?.favorites || initialState;

export const selectFavorites = createSelector(
    [getFavoritesState],
    state => state?.items || []
);

// export const selectIsFavorite = courseId => createSelector(
//     [selectFavorites],
//     items => items.includes(courseId)
// );
//
// export const selectAreFavoritesInitialized = createSelector(
//     [getFavoritesState],
//     state => Boolean(state?.initialized)
// );

export default favoritesSlice.reducer;
