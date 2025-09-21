import { configureStore, createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
    name: "theme",
    initialState: "light",
    reducers: {
        toggleTheme: (state) => (state === "light" ? "dark" : "light")
    }
});


export const { toggleTheme } = themeSlice.actions;


const myStore = configureStore({
    reducer: {
        theme: themeSlice.reducer
    }
});

export default myStore;
