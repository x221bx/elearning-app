// src/pages/AdminCourses.jsx
import React from "react";
import { Stack, Typography } from "@mui/material";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import CourseForm from "../components/admin/CourseForm.jsx";
import CourseTable from "../components/admin/CourseTable.jsx";
export default function AdminCourses() {
    return (
        <AdminLayout>
            <Stack spacing={2} sx={{ maxWidth: 1200, mx: "auto" }}>
                <Typography variant="h5" fontWeight={800}>Manage Courses</Typography>
                <CourseForm />
                <CourseTable />
            </Stack>
        </AdminLayout>
    );
}
