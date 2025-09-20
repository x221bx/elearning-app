import React, { useMemo, useEffect } from "react";
import { Typography, Card, CardContent, Box, Grid, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import useTeachers from "../hooks/useTeachers";

function StatCard({ title, value, hint }) {
    return (
        <Card sx={(theme) => ({ borderRadius: 3, backgroundColor: theme.palette.brand.soft })}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
                <Typography variant="h5" fontWeight={900}>{value}</Typography>
                {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
            </CardContent>
        </Card>
    );
}

function ListCard({ title, rows, linkPrefix }) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 1 }}>{title}</Typography>
                <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                    <Box component="tbody">
                        {rows.map((r) => (
                            <Box
                                component="tr"
                                key={r.id}
                                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                            >
                                <Box component="td" sx={{ py: 1.25, pr: 1.5 }}>
                                    <MuiLink
                                        component={RouterLink}
                                        to={`${linkPrefix}/${r.id}`}
                                        underline="hover"
                                        color="text.primary"
                                        fontWeight={700}
                                        sx={{ display: "inline-block" }}
                                    >
                                        {r.title}
                                    </MuiLink>
                                </Box>
                                <Box component="td" sx={{ py: 1.25, color: "text.secondary" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {r.meta}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {!rows.length && (
                            <Box component="tr">
                                <Box component="td" colSpan={2} sx={{ py: 2, color: "text.secondary" }}>
                                    <Typography variant="body2" color="text.secondary">No data</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const { courses, seed } = useCourses();
    const { teachers } = useTeachers();

    useEffect(() => {
        seed();
    }, [seed]);

    const totalCourses = courses.length;
    const totalTeachers = teachers.length;

    const avgPrice = useMemo(() => {
        const priced = courses.filter((c) => typeof c.price === "number");
        if (!priced.length) return 0;
        const sum = priced.reduce((s, c) => s + (c.price || 0), 0);
        return Math.round((sum / priced.length) * 100) / 100;
    }, [courses]);

    const recentCourses = useMemo(
        () => courses.slice(-6).reverse().map((c) => ({ id: c.id, title: c.title, meta: c.category || "-" })),
        [courses]
    );

    const recentTeachers = useMemo(
        () => teachers.slice(-6).reverse().map((t) => ({ id: t.id, title: t.name, meta: t.subject || "-" })),
        [teachers]
    );

    return (
        <>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
                Dashboard
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <StatCard title="Total Courses" value={totalCourses} hint="All courses in system" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Total Teachers" value={totalTeachers} hint="Active teachers" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Avg Course Price" value={`$${avgPrice}`} hint="Across priced courses" />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <ListCard title="Recent Courses" rows={recentCourses} linkPrefix="/courses" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListCard title="Recent Teachers" rows={recentTeachers} linkPrefix="/teachers" />
                </Grid>
            </Grid>
        </>
    );
}
