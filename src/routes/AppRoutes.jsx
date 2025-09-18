// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Teachers from "../pages/Teachers.jsx";
import TeacherDetail from "../pages/TeacherDetail.jsx";
import Home from "../pages/Home.jsx";
import Courses from "../pages/Courses.jsx";
import CourseDetail from "../pages/CourseDetail.jsx";

// Admin pages
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminCourses from "../pages/AdminCourses.jsx";
import AdminTeachers from "../pages/AdminTeachers.jsx";

import useAuth from "../hooks/useAuth";

function AdminOnly({ children }) {
    const { isAdmin } = useAuth();
    return isAdmin ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
            <Route path="/admin/courses" element={<AdminOnly><AdminCourses /></AdminOnly>} />
            <Route path="/admin/teachers" element={<AdminOnly><AdminTeachers /></AdminOnly>} />

            {/* 404 */}
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
}
