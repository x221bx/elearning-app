import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Courses from "../pages/Courses.jsx";
import CourseDetail from "../pages/CourseDetail.jsx";
import Teachers from "../pages/Teachers.jsx";
import TeacherDetail from "../pages/TeacherDetail.jsx";

import AdminLayout from "../components/admin/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminCourses from "../pages/AdminCourses.jsx";
import AdminTeachers from "../pages/AdminTeachers.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="teachers" element={<AdminTeachers />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
