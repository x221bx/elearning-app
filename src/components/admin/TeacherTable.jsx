import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, Avatar, Box, IconButton, Typography, Chip } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useTeachers from "../../hooks/useTeachers";
import useCourses from "../../hooks/useCourses";
import CustomPagination from "../common/customPagination";

const th = { textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #eee", fontWeight: 700 };
const thRight = { ...th, textAlign: "right" };
const td = { padding: "10px 8px", borderBottom: "1px solid #f7f7f7", verticalAlign: "middle" };
const tdRight = { ...td, textAlign: "right" };

export default function TeacherTable({ onEdit }) {
    const { teachers, removeTeacher } = useTeachers();
    const { courses } = useCourses();

    const rows = useMemo(() => {
        const mapCount = new Map();
        courses.forEach((c) => {
            const key = String(c.teacherId || "");
            mapCount.set(key, (mapCount.get(key) || 0) + 1);
        });
        return teachers.map((t) => ({
            ...t,
            totalCourses: mapCount.get(String(t.id)) || 0,
        }));
    }, [teachers, courses]);

    const [page, setPage] = useState(1);
    const perPage = 10;
    const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
    const paginated = rows.slice((page - 1) * perPage, page * perPage);

    useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

    return (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={th}>Teacher</th>
                        <th style={th}>Subject</th>
                        <th style={th}>Rating</th>
                        <th style={th}>Experience</th>
                        <th style={th}>Language</th>
                        <th style={th}>Certification</th>
                        <th style={th}>Total Courses</th>
                        <th style={thRight}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((t) => (
                        <tr key={t.id}>
                            <td style={td}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                                    <Avatar src={t.image} alt={t.name} />
                                    <Box>
                                        <Typography variant="body2" fontWeight={800}>{t.name}</Typography>
                                        {!!t.bio && (
                                            <Typography variant="caption" color="text.secondary" noWrap title={t.bio}>
                                                {t.bio}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </td>
                            <td style={td}>{t.subject || "-"}</td>
                            <td style={td}>{Number(t.rating || 0).toFixed(1)}</td>
                            <td style={td}>{t.experienceYears ?? 0}</td>
                            <td style={td}>
                                {(Array.isArray(t.languages) ? t.languages : []).slice(0, 2).map((lng) => (
                                    <Chip key={lng} label={lng} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                ))}
                            </td>
                            <td style={td}>{t.certification || "-"}</td>
                            <td style={td}>{t.totalCourses}</td>
                            <td style={tdRight}>
                                <IconButton color="primary" onClick={() => onEdit && onEdit(t)} aria-label="Edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => removeTeacher(t.id)} aria-label="Delete">
                                    <DeleteOutline />
                                </IconButton>
                            </td>
                        </tr>
                    ))}

                    {!rows.length && (
                        <tr><td style={td} colSpan={8} align="center">No teachers yet.</td></tr>
                    )}
                    </tbody>
                </table>

                {rows.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <CustomPagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} colorHex="#FBC02D" hoverHex="#F9A825" />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
