import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import TeacherForm from "../components/admin/TeacherForm.jsx";
import TeacherTable from "../components/admin/TeacherTable.jsx";

export default function AdminTeachers() {
    const [editing, setEditing] = useState(null); // teacher object or null

    return (
        <AdminLayout>
            <Stack spacing={2} sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
                <Typography variant="h5" fontWeight={900}>Manage Teachers</Typography>
                <TeacherForm editing={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
                <TeacherTable onEdit={(t) => setEditing(t)} />
            </Stack>
        </AdminLayout>
    );
}
