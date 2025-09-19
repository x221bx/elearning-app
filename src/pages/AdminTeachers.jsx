import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import TeacherForm from "../components/admin/TeacherForm.jsx";
import TeacherTable from "../components/admin/TeacherTable.jsx";
import ResponsivePage from "../components/common/ResponsivePage.jsx";

export default function AdminTeachers() {
    const [editing, setEditing] = useState(null);

    return (
        <ResponsivePage>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={900}>Manage Teachers</Typography>
                <TeacherForm editing={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
                <TeacherTable onEdit={(t) => setEditing(t)} />
            </Stack>
        </ResponsivePage>
    );
}
