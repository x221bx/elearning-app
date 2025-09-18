// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initial = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initial,
    reducers: {
        setCredentials(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;

        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (s) => s.auth.user;
export const selectIsAdmin = (s) => s.auth.user?.role === "admin";

export default authSlice.reducer;
