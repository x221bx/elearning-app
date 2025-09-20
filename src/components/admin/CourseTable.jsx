import React, { useMemo, useState } from "react";
import {
    Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button, Chip, Tooltip, useMediaQuery
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";

import useCourses from "../../hooks/useCourses";
import useTeachers from "../../hooks/useTeachers";
import CustomPagination from "../common/customPagination";
import ConfirmDialog from "../common/ConfirmDialog";

import {
    palette, headerBarSx, tableContainerSx, tableHeadSx, tableRowSx,
    tagChipSx, actionsCellSx
} from "./tableUI";

export default function CourseTable({ onCreate }) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

    const { courses, removeCourse, updateCourse } = useCourses();
    const { teachers } = useTeachers();

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        courseId: null
    });
    const [page, setPage] = useState(1);
    const perPage = isMobile ? 6 : 8;
    const pageCount = Math.max(1, Math.ceil(courses.length / perPage));
    const paginated = useMemo(() => courses.slice((page - 1) * perPage, page * perPage), [courses, page, perPage]);

    // Edit state
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ id: "", title: "", category: "", price: "", rating: "", image: "", teacherId: "" });

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
        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden", border: `1px solid ${palette.border}` }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {/* Header */}
                <Box sx={headerBarSx}>
                    <Typography variant={isMobile ? "h6" : "h5"} fontWeight={800}>
                        Courses
                    </Typography>
                    <Tooltip title="Add New Course" arrow>
                        <IconButton
                            onClick={onCreate}
                            size={isMobile ? "small" : "medium"}
                            sx={{ border: `1px solid ${palette.headBottom}`, borderRadius: 2 }}
                            aria-label="Add Course"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Table */}
                <TableContainer sx={tableContainerSx}>
                    <Table size={isMobile ? "small" : "medium"}>
                        <TableHead>
                            <TableRow sx={tableHeadSx}>
                                <TableCell>Course</TableCell>
                                {!isMobile && <TableCell>Category</TableCell>}
                                {!isTablet && <TableCell>Teacher</TableCell>}
                                <TableCell>Price</TableCell>
                                {!isTablet && <TableCell>Rating</TableCell>}
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginated.map((c) => {
                                const t = teachers.find((x) => String(x.id) === String(c.teacherId));
                                return (
                                    <TableRow key={c.id} hover sx={tableRowSx}>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 160 }}>
                                                <img
                                                    src={c.image}
                                                    alt={c.title}
                                                    onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/course/160/100"; }}
                                                    style={{ width: 56, height: 36, objectFit: "cover", borderRadius: 6 }}
                                                />
                                                <span style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {c.title}
                                                </span>
                                            </Box>
                                        </TableCell>

                                        {!isMobile && (
                                            <TableCell>
                                                <Chip label={c.category || "-"} size="small" variant="outlined" sx={tagChipSx} />
                                            </TableCell>
                                        )}

                                        {!isTablet && (
                                            <TableCell>{t?.name || "-"}</TableCell>
                                        )}

                                        <TableCell>
                                            {typeof c.price === "number" ? `EGP ${c.price}` : "-"}
                                        </TableCell>

                                        {!isTablet && (
                                            <TableCell>{Number(c.rating || 0).toFixed(1)}</TableCell>
                                        )}

                                        <TableCell align="right" sx={actionsCellSx}>
                                            <Tooltip title="Edit" arrow>
                                                <IconButton onClick={() => onEdit(c)} size="small">
                                                    <EditOutlined fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => setConfirmDelete({ open: true, courseId: c.id })}
                                                    size="small"
                                                >
                                                    <DeleteOutline fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {!courses.length && (
                                <TableRow>
                                    <TableCell colSpan={isMobile ? 3 : isTablet ? 4 : 6} align="center" sx={{ py: 6 }}>
                                        <Typography variant="body1" sx={{ color: palette.caption }}>
                                            No courses found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {courses.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <CustomPagination
                            count={pageCount}
                            page={page}
                            onChange={(_, p) => setPage(p)}
                            colorHex="#1976d2"
                            hoverHex="#115293"
                        />
                    </Box>
                )}
            </CardContent>


            <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
                <DialogTitle>Edit course</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <Box sx={{ display: "grid", gap: 2 }}>
                        <TextField label="Title" name="title" value={form.title} onChange={onChange} fullWidth />
                        <TextField label="Category" name="category" value={form.category} onChange={onChange} fullWidth />
                        <TextField label="Price" name="price" type="number" value={form.price} onChange={onChange} fullWidth />
                        <TextField
                            label="Rating (0–5)"
                            name="rating"
                            type="number"
                            inputProps={{ step: "0.1", min: 0, max: 5 }}
                            value={form.rating}
                            onChange={onChange}
                            fullWidth
                        />
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

            <ConfirmDialog
                open={confirmDelete.open}
                onClose={() => setConfirmDelete({ open: false, courseId: null })}
                onConfirm={() => {
                    if (confirmDelete.courseId) {
                        removeCourse(confirmDelete.courseId);
                        setConfirmDelete({ open: false, courseId: null });
                    }
                }}
                title="Delete Course"
                message="Are you sure you want to delete this course? This action cannot be undone."
                confirmText="Delete"
                severity="error"
            />
        </Card>
    );
}
