// src/pages/AdminCourses.jsx
import React, { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import CourseForm from "../components/admin/CourseForm.jsx";
import CourseTable from "../components/admin/CourseTable.jsx";
import useCourses from "../hooks/useCourses";

export default function AdminCourses() {
    const { updateCourse } = useCourses();
    const [editing, setEditing] = useState(null);

    return (
        <>
            <Stack spacing={2.5}>
                <Box>
                    <Typography variant="h5" fontWeight={800}>Manage Courses</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Create and manage courses. Title and Category are required. You can optionally set price, rating, image and assign a teacher.
                    </Typography>
                </Box>

                {/* Create */}
                {!editing && <CourseForm mode="create" />}

                {/* Edit inline (unified with Teachers) */}
                {editing && (
                    <CourseForm
                        mode="edit"
                        initialValues={editing}
                        onSubmit={(payload) => { updateCourse({ id: editing.id, ...payload }); setEditing(null); }}
                    />
                )}

                <CourseTable onCreate={(c) => setEditing(c)} />
            </Stack>
        </>
    );
}
