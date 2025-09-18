import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import AdminLayout from "src/components/admin/AdminLayout.jsx";
import CourseForm from "src/components/admin/CourseForm";
import CourseTable from "src/components/admin/CourseTable";

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
