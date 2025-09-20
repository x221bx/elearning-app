// src/pages/AdminCourses.jsx
import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import CourseForm from "../components/admin/CourseForm.jsx";
import CourseTable from "../components/admin/CourseTable.jsx";
import ResponsivePage from "../components/common/ResponsivePage.jsx";

export default function AdminCourses() {
    return (
        <ResponsivePage>
            <Box sx={(t) => t.mixins.toolbar} />
            <Stack spacing={2.5}>
                <Typography variant="h5" fontWeight={800}>Manage Courses</Typography>
                <CourseForm />
                <CourseTable />
            </Stack>
        </ResponsivePage>
    );
}
