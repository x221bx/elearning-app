import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
    try {
        const savedState = localStorage.getItem('favorites');
        return savedState ? {
            items: JSON.parse(savedState),
            loading: false,
            error: null
        } : {
            items: [],
            loading: false,
            error: null
        };
    } catch (e) {
        console.error('Failed to load favorites:', e);
        return {
            items: [],
            loading: false,
            error: null
        };
    }
};

const initialState = loadInitialState();

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
                // Save to localStorage
                localStorage.setItem('favorites', JSON.stringify(state.items));
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter(id => id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
        setFavorites: (state, action) => {
            state.items = action.payload;
            localStorage.setItem('favorites', JSON.stringify(action.payload));
        },
        initializeFavorites: (state) => {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                state.items = JSON.parse(savedFavorites);
            }
        }
    }
});

export const {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
    initializeFavorites
} = favoritesSlice.actions;

// Selectors
export const selectFavorites = state => state.favorites.items;
export const selectIsFavorite = (state, courseId) => state.favorites.items.includes(courseId);

export default favoritesSlice.reducer;