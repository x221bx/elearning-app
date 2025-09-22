// src/redux/slices/coursesSlice.js
import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import { courses as seedCourses } from "../../api/courses";

const initial = {
    items: [], // [{id,title,category,image,price,rating,teacherId,..., createdBy,createdAt}]
    seeded: false,
};

const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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
                        slug: data.slug?.trim?.() || slugify(data.title || ""),
                        category: data.category?.trim() || "General",
                        image: data.image?.trim() || "https://picsum.photos/seed/new/600/400",
                        price: Number(data.price || 0),
                        currency: data.currency || "USD",
                        discountPrice: Number(data.discountPrice || 0),
                        free: Boolean(data.free),
                        rating: Number(data.rating || 0),
                        teacherId: data.teacherId || "",
                        lessonsCount: Number(data.lessonsCount || 0),
                        durationHours: Number(data.durationHours || 0),
                        shortDescription: data.shortDescription || "",
                        description: data.description || "",
                        language: data.language || "English",
                        level: data.level || "Beginner",
                        ageGroup: data.ageGroup || "9-12",
                        tags: Array.isArray(data.tags) ? data.tags : [],
                        enrollmentLimit: Number(data.enrollmentLimit || 0),
                        featured: Boolean(data.featured),
                        status: data.status || "published",
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
// export const makeSelectCoursesByTeacher = (teacherId) =>
//     createSelector(
//         [selectCourses],
//         (list) => (list || []).filter(
//             (c) => c && String(c.teacherId) === String(teacherId)
//         )
//     );

export default coursesSlice.reducer;
