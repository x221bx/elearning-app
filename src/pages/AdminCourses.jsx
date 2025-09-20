import React from "react";
import { Stack, Typography } from "@mui/material";
import CourseForm from "../components/admin/CourseForm.jsx";
import CourseTable from "../components/admin/CourseTable.jsx";
import ResponsivePage from "../components/common/ResponsivePage.jsx";

export default function AdminCourses() {
    return (
        <ResponsivePage>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={800}>Manage Courses</Typography>
                <CourseForm />
                <CourseTable />
            </Stack>
        </ResponsivePage>
    );
}
