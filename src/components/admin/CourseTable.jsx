import React, { useMemo, useState } from "react";
import {
    Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Button, Box
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import useCourses from "../../hooks/useCourses";
import useTeachers from "../../hooks/useTeachers";
import CustomPagination from "../common/customPagination";

const th = { textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #eee", fontWeight: 700 };
const thRight = { ...th, textAlign: "right" };
const td = { padding: "10px 8px", borderBottom: "1px solid #f7f7f7" };
const tdRight = { ...td, textAlign: "right" };

export default function CourseTable() {
    const { courses, removeCourse, updateCourse } = useCourses();
    const { teachers } = useTeachers();

    const [page, setPage] = useState(1);
    const perPage = 8;
    const pageCount = Math.max(1, Math.ceil(courses.length / perPage));
    const paginated = useMemo(
        () => courses.slice((page - 1) * perPage, page * perPage),
        [courses, page]
    );

    // Edit state
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        id: "",
        title: "",
        category: "",
        price: "",
        rating: "",
        image: "",
        teacherId: "",
    });

    const onEdit = (c) => {
        setEditing(c.id);
        setForm({
            id: c.id,
            title: c.title || "",
            category: c.category || "",
            price: String(c.price ?? ""),
            rating: String(c.rating ?? ""),
            image: c.image || "",
            teacherId: c.teacherId || "",
        });
    };

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onSave = () => {
        updateCourse({
            id: form.id,
            title: form.title.trim(),
            category: form.category.trim(),
            price: Number(form.price || 0),
            rating: Math.max(0, Math.min(5, Number(form.rating || 0))),
            image: form.image.trim(),
            teacherId: form.teacherId || "",
        });
        setEditing(null);
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, overflowX: "auto" }}>
            <CardContent>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={th}>Course</th>
                        <th style={th}>Category</th>
                        <th style={th}>Teacher</th>
                        <th style={th}>Price</th>
                        <th style={th}>Rating</th>
                        <th style={thRight}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((c) => {
                        const t = teachers.find((x) => String(x.id) === String(c.teacherId));
                        return (
                            <tr key={c.id}>
                                <td style={td}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                                        <img
                                            src={c.image}
                                            alt={c.title}
                                            onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/course/160/100"; }}
                                            style={{ width: 56, height: 36, objectFit: "cover", borderRadius: 6 }}
                                        />
                                        <span style={{ fontWeight: 600 }}>{c.title}</span>
                                    </Box>
                                </td>
                                <td style={td}>{c.category || "-"}</td>
                                <td style={td}>{t?.name || "-"}</td>
                                <td style={td}>{typeof c.price === "number" ? `EGP ${c.price}` : "-"}</td>
                                <td style={td}>{Number(c.rating || 0).toFixed(1)}</td>
                                <td style={tdRight}>
                                    <IconButton onClick={() => onEdit(c)} aria-label="Edit"><EditOutlined /></IconButton>
                                    <IconButton color="error" onClick={() => removeCourse(c.id)} aria-label="Delete"><DeleteOutline /></IconButton>
                                </td>
                            </tr>
                        );
                    })}
                    {!courses.length && (
                        <tr><td style={td} colSpan={6} align="center">No courses</td></tr>
                    )}
                    </tbody>
                </table>

                {courses.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <CustomPagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} colorHex="#FBC02D" hoverHex="#F9A825" />
                    </Box>
                )}
            </CardContent>

            {/* Edit Dialog */}
            <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
                <DialogTitle>Edit course</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <Box sx={{ display: "grid", gap: 2 }}>
                        <TextField label="Title" name="title" value={form.title} onChange={onChange} fullWidth />
                        <TextField label="Category" name="category" value={form.category} onChange={onChange} fullWidth />
                        <TextField label="Price" name="price" type="number" value={form.price} onChange={onChange} fullWidth />
                        <TextField label="Rating (0–5)" name="rating" type="number" inputProps={{ step: "0.1", min: 0, max: 5 }} value={form.rating} onChange={onChange} fullWidth />
                        <TextField label="Image URL" name="image" value={form.image} onChange={onChange} fullWidth />
                        <TextField select label="Teacher" name="teacherId" value={form.teacherId} onChange={onChange} fullWidth>
                            <MenuItem value="">(None)</MenuItem>
                            {teachers.map((t) => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setEditing(null)}>Cancel</Button>
                    <Button variant="contained" onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
