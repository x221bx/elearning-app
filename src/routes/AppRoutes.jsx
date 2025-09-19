import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Courses from "../pages/Courses.jsx";
import CourseDetail from "../pages/CourseDetail.jsx";
import Teachers from "../pages/Teachers.jsx";
import TeacherDetail from "../pages/TeacherDetail.jsx";
import ProfilePage from "../pages/Profile.jsx";
import AdminProfile from "../pages/AdminProfile.jsx";

import AdminLayout from "../components/admin/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminCourses from "../pages/AdminCourses.jsx";
import AdminTeachers from "../pages/AdminTeachers.jsx";
import WishlistPage from "../pages/Wishlist.jsx";
import CartPage from "../pages/Cart.jsx";

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
                path="/wishlist"
                element={
                    <ProtectedRoute>
                        <WishlistPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute requireAdmin={true}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="profile" element={<AdminProfile />} />

                <Route index element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="teachers" element={<AdminTeachers />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
