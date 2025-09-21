import React, { useMemo, useState, useEffect } from "react";
import {
    Card, CardContent, Avatar, Box, IconButton, Typography, Chip,
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useTeachers from "../../hooks/useTeachers";
import useCourses from "../../hooks/useCourses";
import CustomPagination from "../common/customPagination";
import { tableSx } from "./tableStyles";

export default function TeacherTable({ onEdit }) {
    const { teachers, removeTeacher } = useTeachers();
    const { courses } = useCourses();

    const rows = useMemo(() => {
        const mapCount = new Map();
        courses.forEach((c) => {
            const key = String(c.teacherId || "");
            mapCount.set(key, (mapCount.get(key) || 0) + 1);
        });
        return teachers.map((t) => ({ ...t, totalCourses: mapCount.get(String(t.id)) || 0 }));
    }, [teachers, courses]);

    const [page, setPage] = useState(1);
    const perPage = 10;
    const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
    const paginated = rows.slice((page - 1) * perPage, page * perPage);
    useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

    return (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
                <TableContainer sx={{ overflowX: "auto" }}>
                    <Table size="small" stickyHeader sx={tableSx}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Teacher</TableCell>
                                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Subject</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Experience</TableCell>
                                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Language</TableCell>
                                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Certification</TableCell>
                                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Total Courses</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginated.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 200 }}>
                                            <Avatar src={t.image} alt={t.name} sx={{ width: 34, height: 34 }} />
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="body2" fontWeight={800} noWrap title={t.name}>
                                                    {t.name}
                                                </Typography>
                                                {!!t.bio && (
                                                    <Typography variant="caption" color="text.secondary" noWrap title={t.bio}>
                                                        {t.bio}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{t.subject || "-"}</TableCell>
                                    <TableCell>{Number(t.rating || 0).toFixed(1)}</TableCell>
                                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{t.experienceYears ?? 0}</TableCell>
                                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                                        {(Array.isArray(t.languages) ? t.languages : []).slice(0, 2).map((lng) => (
                                            <Chip key={lng} label={lng} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                        ))}
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>{t.certification || "-"}</TableCell>
                                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{t.totalCourses}</TableCell>
                                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                                        <IconButton color="primary" onClick={() => onEdit?.(t)} aria-label="Edit" size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => removeTeacher(t.id)} aria-label="Delete" size="small">
                                            <DeleteOutline fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!rows.length && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No teachers yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {rows.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <CustomPagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} colorHex="var(--primary-btn-bg)" hoverHex="var(--primary-btn-hover)" />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
