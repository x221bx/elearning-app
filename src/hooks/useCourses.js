// src/hooks/useCourses.js
import { useDispatch, useSelector } from "react-redux";
import {
    selectCourses,
    addCourse,
    removeCourse,
    updateCourse,
    seedCoursesIfEmpty,
} from "../redux/slices/coursesSlice";

export default function useCourses() {
    const dispatch = useDispatch();
    const courses = useSelector(selectCourses);

    return {
        courses,
        seed: () => dispatch(seedCoursesIfEmpty()),
        addCourse: (data, email) => dispatch(addCourse(data, email)),
        updateCourse: (data) => dispatch(updateCourse(data)),
        removeCourse: (id) => dispatch(removeCourse(id)),
    };
}
