import React, { useMemo, useState } from "react";
import {
    Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Box, Chip, Tooltip, useMediaQuery, Paper
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useTheme } from "@mui/material/styles";
// inline edit is handled at the page level (AdminCourses) similar to TeacherTable

import useCourses from "../../hooks/useCourses";
import useTeachers from "../../hooks/useTeachers";
import CustomPagination from "../common/customPagination";
import ConfirmDialog from "../common/confirmDialog";

import {
    adminPalette, tableRowSx, tagChipSx, actionsCellSx
} from "./tableUI";

export default function CourseTable({ onCreate }) {
    const theme = useTheme();
    const palette = adminPalette(theme);

    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

    const { courses, removeCourse } = useCourses();
    const { teachers } = useTeachers();

    const [confirmDelete, setConfirmDelete] = useState({ open: false, courseId: null });
    const [page, setPage] = useState(1);
    const perPage = isMobile ? 6 : 8;
    const pageCount = Math.max(1, Math.ceil(courses.length / perPage));
    const paginated = useMemo(
        () => courses.slice((page - 1) * perPage, page * perPage),
        [courses, page, perPage]
    );

    const onEdit = (c) => onCreate?.(c); // delegate to parent to open edit form

    // Scroll remains enabled because editing happens inline on the page

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                <Typography variant="h5" fontWeight={800}>Courses</Typography>
                {onCreate && (
                    <Tooltip title="Add New Course" arrow>
                        <IconButton onClick={onCreate} size={isMobile ? "small" : "medium"}>
                            <EditOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 0,
                    overflow: "visible",
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Table size={isMobile ? "small" : "medium"}>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: theme.palette.action.hover,
                                "& .MuiTableCell-head": {
                                    fontWeight: 700,
                                    borderBottom: `2px solid ${theme.palette.divider}`,
                                    whiteSpace: "nowrap",
                                    lineHeight: 1.4,
                                    height: 52,
                                },
                            }}
                        >
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
                                                style={{ width: 56, height: 36, objectFit: "cover" }}
                                            />
                                            <span style={{
                                                fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                            }}>
                                                {c.title}
                                            </span>
                                        </Box>
                                    </TableCell>

                                    {!isMobile && (
                                        <TableCell>
                                            <Chip label={c.category || "-"} size="small" variant="outlined" sx={tagChipSx} />
                                        </TableCell>
                                    )}

                                    {!isTablet && (<TableCell>{t?.name || "-"}</TableCell>)}
                                    <TableCell>{typeof c.price === "number" ? `EGP ${c.price}` : "-"}</TableCell>
                                    {!isTablet && (<TableCell>{Number(c.rating || 0).toFixed(1)}</TableCell>)}

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

                {courses.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                        <CustomPagination
                            count={pageCount}
                            page={page}
                            onChange={(_, p) => setPage(p)}
                            colorHex="#1976d2"
                            hoverHex="#115293"
                        />
                    </Box>
                )}
            </TableContainer>

            {/* Editing is handled by parent page via onCreate callback (used as onEdit) */}

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
        </Box>
    );
}
