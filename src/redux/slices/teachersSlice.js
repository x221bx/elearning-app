import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import { teachers as seedTeachers } from "../../api/teachers";

const initial = {
    items: [],
    seeded: false,
};

const teachersSlice = createSlice({
    name: "teachers",
    initialState: initial,
    reducers: {
        seedTeachersIfEmpty(state) {
            if (!state.seeded || state.items.length === 0) {
                state.items = (seedTeachers || []).map((t) => ({ ...t }));
                state.seeded = true;
            }
        },
        addTeacher: {
            reducer(state, action) {
                state.items.unshift(action.payload);
            },
            prepare(data, currentUserEmail) {
                return {
                    payload: {
                        id: data.id || `t_${nanoid(6)}`,
                        name: (data.name || "").trim(),
                        image: (data.image || "").trim(),
                        subject: (data.subject || "").trim(),
                        rating: Number(data.rating || 0),
                        bio: data.bio || "",
                        languages: Array.isArray(data.languages) && data.languages.length ? data.languages : ["Arabic", "English"],
                        socials: data.socials || {},
                        certification: (data.certification || "").trim(),
                        experienceYears: Number(data.experienceYears || 0),
                        createdBy: currentUserEmail || null,
                        createdAt: Date.now(),
                    },
                };
            },
        },
        updateTeacher(state, action) {
            const idx = state.items.findIndex((x) => x.id === action.payload.id);
            if (idx >= 0) {
                state.items[idx] = { ...state.items[idx], ...action.payload };
            }
        },
        removeTeacher(state, action) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
    },
});

export const { seedTeachersIfEmpty, addTeacher, updateTeacher, removeTeacher } = teachersSlice.actions;

export const selectTeachersState = (s) => s.teachers;
export const selectTeachers = createSelector([selectTeachersState], (t) => t.items);

export default teachersSlice.reducer;
