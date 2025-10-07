// src/hooks/useTeachers.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
    
    // Ensure seed data is available when hook is first used
    useEffect(() => {
        dispatch(seedTeachersIfEmpty());
    }, [dispatch]);

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
