// src/hooks/useTeachers.js
import { useDispatch, useSelector } from "react-redux";
import {
    selectTeachers,
    addTeacher,
    removeTeacher,
    updateTeacher,
    seedTeachersIfEmpty,
} from "../redux/slices/teachersSlice";
import { selectCourses } from "../redux/slices/coursesSlice";

export default function useTeachers() {
    const dispatch = useDispatch();
    const teachers = useSelector(selectTeachers);
    const courses = useSelector(selectCourses);

    const teachersWithCounts = teachers.map((t) => ({
        ...t,
        coursesCount: courses.filter((c) => String(c.teacherId) === String(t.id)).length,
    }));

    return {
        teachers: teachersWithCounts,
        seed: () => dispatch(seedTeachersIfEmpty()),
        addTeacher: (data, email) => dispatch(addTeacher(data, email)),
        updateTeacher: (data) => dispatch(updateTeacher(data)),
        removeTeacher: (id) => dispatch(removeTeacher(id)),
    };
}
