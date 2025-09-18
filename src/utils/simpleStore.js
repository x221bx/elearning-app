// src/utils/simpleStore.js
import { courses as seedCourses } from "../api/courses";
import { teachers as seedTeachers } from "../api/teachers";

const K = {
    COURSES: "demo:courses",
    TEACHERS: "demo:teachers",
    ADMIN: "demo:isAdmin", // "true"/"false"
};

function seedOnce() {
    if (!localStorage.getItem(K.COURSES)) {
        localStorage.setItem(K.COURSES, JSON.stringify(seedCourses || []));
    }
    if (!localStorage.getItem(K.TEACHERS)) {
        localStorage.setItem(K.TEACHERS, JSON.stringify(seedTeachers || []));
    }
}

export function isAdmin() {
    return localStorage.getItem(K.ADMIN) === "true";
}
export function setAdmin(flag) {
    localStorage.setItem(K.ADMIN, flag ? "true" : "false");
}

export function getCourses() {
    seedOnce();
    return JSON.parse(localStorage.getItem(K.COURSES) || "[]");
}
export function setCourses(next) {
    localStorage.setItem(K.COURSES, JSON.stringify(next));
}
export function addCourse(c) {
    const list = getCourses();
    const id = c.id || `c_${Date.now()}`;
    setCourses([...list, { ...c, id }]);
}
export function removeCourse(id) {
    setCourses(getCourses().filter(x => x.id !== id));
}

export function getTeachers() {
    seedOnce();
    return JSON.parse(localStorage.getItem(K.TEACHERS) || "[]");
}
export function setTeachers(next) {
    localStorage.setItem(K.TEACHERS, JSON.stringify(next));
}
export function addTeacher(t) {
    const list = getTeachers();
    const id = t.id || `t_${Date.now()}`;
    setTeachers([...list, { ...t, id }]);
}
export function removeTeacher(id) {
    setTeachers(getTeachers().filter(x => x.id !== id));
}
