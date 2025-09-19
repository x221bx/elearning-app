// src/redux/slices/coursesSlice.js
import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import { courses as seedCourses } from "../../api/courses";

const initial = {
    items: [], // [{id,title,category,image,price,rating,teacherId,..., createdBy,createdAt}]
    seeded: false,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState: initial,
    reducers: {
        seedCoursesIfEmpty(state) {
            if (!state.seeded || state.items.length === 0) {
                state.items = seedCourses.map((c) => ({ ...c }));
                state.seeded = true;
            }
        },
        addCourse: {
            reducer(state, action) {
                state.items.unshift(action.payload);
            },
            prepare(data, currentUserEmail) {
                return {
                    payload: {
                        id: data.id || `c_${nanoid(6)}`,
                        title: data.title?.trim(),
                        category: data.category?.trim() || "General",
                        image: data.image?.trim() || "https://picsum.photos/seed/new/600/400",
                        price: Number(data.price || 0),
                        rating: Number(data.rating || 0),
                        teacherId: data.teacherId || "", // ممكن يبقى فاضي
                        lessonsCount: Number(data.lessonsCount || 0),
                        description: data.description || "",
                        createdBy: currentUserEmail || null,
                        createdAt: Date.now(),
                    },
                };
            },
        },
        updateCourse(state, action) {
            const idx = state.items.findIndex((x) => x.id === action.payload.id);
            if (idx >= 0) state.items[idx] = { ...state.items[idx], ...action.payload };
        },
        removeCourse(state, action) {
            state.items = state.items.filter((c) => c.id !== action.payload);
        },
    },
});

export const {
    seedCoursesIfEmpty,
    addCourse,
    updateCourse,
    removeCourse,
} = coursesSlice.actions;

export const selectCoursesState = (state) => state?.courses || initial;
export const selectCourses = createSelector(
    [selectCoursesState],
    (c) => c?.items || []
);
export const makeSelectCoursesByTeacher = (teacherId) =>
    createSelector(
        [selectCourses],
        (list) => (list || []).filter(
            (c) => c && String(c.teacherId) === String(teacherId)
        )
    );

export default coursesSlice.reducer;
