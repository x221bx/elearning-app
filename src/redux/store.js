// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice";
import teachersReducer from "./slices/teachersSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";

// حفظ/قراءة من localStorage
const PERSIST_KEY = "edudu:state:v1";

function loadState() {
    try {
        const raw = localStorage.getItem(PERSIST_KEY);
        return raw ? JSON.parse(raw) : undefined;
    } catch {
        return undefined;
    }
}
function saveState(state) {
    try {
        const toSave = {
            auth: state.auth,
            courses: state.courses,
            teachers: state.teachers,
            wishlist: state.wishlist,
        };
        localStorage.setItem(PERSIST_KEY, JSON.stringify(toSave));
    } catch { }
}

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        courses: coursesReducer,
        teachers: teachersReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
    preloadedState: loadState(),
    devTools: import.meta.env.MODE !== "production",
});

store.subscribe(() => saveState(store.getState()));

export default store;
