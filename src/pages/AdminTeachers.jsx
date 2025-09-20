// src/pages/AdminTeachers.jsx
import React, { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import TeacherForm from "../components/admin/TeacherForm.jsx";
import TeacherTable from "../components/admin/TeacherTable.jsx";
import ResponsivePage from "../components/common/ResponsivePage.jsx";

export default function AdminTeachers() {
    const [editing, setEditing] = useState(null);

    return (
        <ResponsivePage>
            <Box sx={(t) => t.mixins.toolbar} />
            <Stack spacing={2.5}>
                <Typography variant="h5" fontWeight={800}>Manage Teachers</Typography>
                <TeacherForm editing={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
                <TeacherTable onEdit={(t) => setEditing(t)} />
            </Stack>
        </ResponsivePage>
    );
}
