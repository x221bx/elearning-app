import React, { useMemo, useState, useEffect } from "react";
import {
    Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Box, Avatar, Chip, Tooltip, useMediaQuery, Paper
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";

import useTeachers from "../../hooks/useTeachers";
import useCourses from "../../hooks/useCourses";
import CustomPagination from "../common/customPagination";

import {
    adminPalette, tableRowSx, countChipSx, tagChipSx, actionsCellSx, ratingColor
} from "./tableUI";

export default function TeacherTable({ onEdit }) {
    const theme = useTheme();
    const palette = adminPalette(theme);

    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

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
            ratingSafe: Number(t.rating || 0),
        }));
    }, [teachers, courses]);

    const [page, setPage] = useState(1);
    const perPage = isMobile ? 6 : 10;
    const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
    const paginated = rows.slice((page - 1) * perPage, page * perPage);
    useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Teachers</Typography>

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
                            <TableCell>Teacher</TableCell>
                            {!isMobile && <TableCell>Subject</TableCell>}
                            <TableCell align="center">Rating</TableCell>
                            {!isTablet && <TableCell align="center">Experience</TableCell>}
                            {!isTablet && <TableCell>Languages</TableCell>}
                            {!isMobile && <TableCell align="center">Courses</TableCell>}
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginated.map((t) => (
                            <TableRow key={t.id} hover sx={tableRowSx}>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 180 }}>
                                        <Avatar src={t.image} alt={t.name} sx={{ width: 36, height: 36 }} />
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography variant="body2" fontWeight={800} noWrap title={t.name}>
                                                {t.name}
                                            </Typography>
                                            {!!t.bio && (
                                                <Typography variant="caption" sx={{ color: palette.caption }} noWrap title={t.bio}>
                                                    {t.bio}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>

                                {!isMobile && (
                                    <TableCell>
                                        <Chip label={t.subject || "N/A"} size="small" variant="outlined" sx={tagChipSx} />
                                    </TableCell>
                                )}

                                <TableCell align="center">
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                                        <StarIcon sx={{ fontSize: 16, color: ratingColor(theme, t.ratingSafe) }} />
                                        <Typography variant="body2" fontWeight={700} sx={{ color: ratingColor(theme, t.ratingSafe) }}>
                                            {t.ratingSafe.toFixed(1)}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                {!isTablet && (
                                    <TableCell align="center">
                                        <Typography variant="body2" fontWeight={600}>{t.experienceYears ?? 0} yrs</Typography>
                                    </TableCell>
                                )}

                                {!isTablet && (
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                                            {Array.isArray(t.languages) && t.languages.length
                                                ? t.languages.slice(0, 2).map((lang) => (
                                                    <Chip key={lang} label={lang} size="small" sx={tagChipSx} />
                                                ))
                                                : <Typography variant="caption" sx={{ color: palette.caption }}>-</Typography>}
                                        </Box>
                                    </TableCell>
                                )}

                                {!isMobile && (
                                    <TableCell align="center">
                                        <Chip label={t.totalCourses} size="small" sx={countChipSx} />
                                    </TableCell>
                                )}

                                <TableCell align="right" sx={actionsCellSx}>
                                    <Tooltip title="Edit" arrow>
                                        <IconButton onClick={() => onEdit?.(t)} size="small">
                                            <EditOutlined fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <IconButton color="error" onClick={() => removeTeacher(t.id)} size="small">
                                            <DeleteOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}

                        {!rows.length && (
                            <TableRow>
                                <TableCell colSpan={isMobile ? 4 : isTablet ? 5 : 7} align="center" sx={{ py: 6 }}>
                                    <Typography variant="body1" sx={{ color: palette.caption }}>
                                        No teachers found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {rows.length > 0 && (
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
        </Box>
    );
}
