import React, { useMemo } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import useCourses from "../hooks/useCourses";
import useTeachers from "../hooks/useTeachers";

function StatCard({ title, value, hint }) {
    return (
        <Card sx={{ borderRadius: 3, backgroundColor: "#FFF9F0" }}>
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
                <Box sx={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                        {rows.map((r) => (
                            <tr key={r.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                                <td style={{ padding: "10px 6px", fontWeight: 700 }}>
                                    <Link to={`${linkPrefix}/${r.id}`} style={{ textDecoration: "none", color: "#111" }}>
                                        {r.title}
                                    </Link>
                                </td>
                                <td style={{ padding: "10px 6px", color: "#666" }}>{r.meta}</td>
                            </tr>
                        ))}
                        {!rows.length && <tr><td style={{ padding: 10, color: "#888" }}>No data</td></tr>}
                        </tbody>
                    </table>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const { courses } = useCourses();
    const { teachers } = useTeachers();

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
        <AdminLayout>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>Dashboard</Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard title="Total Courses" value={totalCourses} hint="All courses in system" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard title="Total Teachers" value={totalTeachers} hint="Active teachers" />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <StatCard title="Avg Course Price" value={`$${avgPrice}`} hint="Across priced courses" />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ListCard title="Recent Courses" rows={recentCourses} linkPrefix="/courses" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ListCard title="Recent Teachers" rows={recentTeachers} linkPrefix="/teachers" />
                </Grid>
            </Grid>
        </AdminLayout>
    );
}
