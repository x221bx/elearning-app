//src/routs/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Teachers from "../pages/Teachers.jsx";
import TeacherDetail from "../pages/TeacherDetail.jsx";
import Home from "../pages/Home.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/teacher" element={<Navigate to="/teachers" replace />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
}
