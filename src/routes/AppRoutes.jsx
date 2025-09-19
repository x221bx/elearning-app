import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Teachers from "../pages/Teachers.jsx";
import TeacherDetail from "../pages/TeacherDetail.jsx";
import Home from "../pages/Home.jsx";  
import Courses from "../pages/Courses.jsx";   
import CourseDetail from "../pages/CourseDetail.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/teachers/:id" element={<TeacherDetail />} />
      <Route path="/courses" element={<Courses />} />   
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
