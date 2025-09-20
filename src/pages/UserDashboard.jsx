import React, { useMemo, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Stack, Chip, Grid } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useCourses from "../hooks/useCourses";
import useTeachers from "../hooks/useTeachers";

/**
 * - Admin: يعرض الكورسات والمدرسين اللي أضافهم بنفسه (createdBy=email)
 * - Student: Placeholder للكورسات المسجل فيها (تتفعّل لاحقاً عبر enrolledIds)
 */
export default function UserDashboard() {
    const { auth } = useAuth();
    const { courses, seed } = useCourses();
    const { teachers } = useTeachers();

    // Seed courses on component mount
    useEffect(() => {
        seed();
    }, [seed]);

    const isAdmin = auth?.role === "admin";
    const email = auth?.email || "";

    const myCourses = useMemo(
        () => (isAdmin ? courses.filter((c) => c.createdBy === email) : []),
        [courses, email, isAdmin]
    );
    const myTeachers = useMemo(
        () => (isAdmin ? teachers.filter((t) => t.createdBy === email) : []),
        [teachers, email, isAdmin]
    );

    const enrolled = useMemo(() => (!isAdmin ? [] : []), [isAdmin]);

    return (
        <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
            <Box sx={{ height: { xs: 56, md: 72 } }} />
            <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
                {/* Header */}
                <Card sx={{ mb: 3, borderRadius: 3 }}>
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ width: 64, height: 64 }}>
                                {(auth?.name?.[0] || auth?.email?.[0] || "U").toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight={900}>{auth?.name || auth?.email || "User"}</Typography>
                                <Typography variant="body2" color="text.secondary">Role: {auth?.role || "guest"}</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {isAdmin ? (
                    <>
                        {/* My Teachers */}
                        <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                            My Teachers ({myTeachers.length})
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {myTeachers.map((t) => (
                                <Grid item xs={12} sm={6} md={4} key={t.id}>
                                    <Card sx={{ borderRadius: 3 }}>
                                        <CardContent>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Avatar src={t.image} alt={t.name} />
                                                <Box>
                                                    <Typography fontWeight={800}>{t.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {t.subject || "-"}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {!myTeachers.length && (
                                <Grid item xs={12}><Typography color="text.secondary">No teachers yet.</Typography></Grid>
                            )}
                        </Grid>

                        {/* My Courses */}
                        <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                            My Courses ({myCourses.length})
                        </Typography>
                        <Grid container spacing={2}>
                            {myCourses.map((c) => (
                                <Grid item xs={12} sm={6} md={4} key={c.id}>
                                    <Card sx={{ borderRadius: 3 }}>
                                        <CardContent>
                                            <Typography fontWeight={900}>{c.title}</Typography>
                                            <Stack direction="row" spacing={1} sx={{ mt: .5 }} flexWrap="wrap">
                                                {c.category && <Chip size="small" label={c.category} />}
                                                {c.price != null && <Chip size="small" label={`$${c.price}`} sx={{ bgcolor: "#FFF7DB" }} />}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {!myCourses.length && (
                                <Grid item xs={12}><Typography color="text.secondary">No courses yet.</Typography></Grid>
                            )}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                            Enrolled Courses ({enrolled.length})
                        </Typography>
                        {!enrolled.length ? (
                            <Typography color="text.secondary">You haven’t enrolled in any course yet.</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {enrolled.map((c) => (
                                    <Grid item xs={12} sm={6} md={4} key={c.id}>
                                        <Card sx={{ borderRadius: 3 }}>
                                            <CardContent>
                                                <Typography fontWeight={900}>{c.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{c.category || "-"}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}
