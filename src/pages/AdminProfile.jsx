import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TablePagination,
    Tabs,
    Tab,
    Divider,
    Avatar
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import useCourses from '../hooks/useCourses';
import { useNotification } from '../contexts/NotificationContext';

export default function AdminProfile() {
    const { auth } = useAuth();
    const { courses } = useCourses();
    const { showNotification } = useNotification();
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const myCreatedCourses = courses.filter(
        course => course.createdBy === auth?.userId
    );

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar
                            sx={{ width: 120, height: 120 }}
                        >
                            {(auth?.name?.[0] || auth?.email?.[0] || "A").toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                {auth?.name || 'Admin'}
                            </Typography>
                            <Typography variant="subtitle1">
                                {auth?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Tabs
                    value={tab}
                    onChange={(_, newValue) => setTab(newValue)}
                    sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
                >
                    <Tab label="My Created Courses" />
                    <Tab label="Analytics" />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {tab === 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Courses Created ({myCreatedCourses.length})
                            </Typography>
                            <Grid container spacing={3}>
                                {myCreatedCourses
                                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                    .map(course => (
                                        <Grid item xs={12} key={course.id}>
                                            <Card>
                                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Box
                                                        component="img"
                                                        src={course.image}
                                                        alt={course.title}
                                                        sx={{
                                                            width: 120,
                                                            height: 80,
                                                            objectFit: 'cover',
                                                            borderRadius: 1
                                                        }}
                                                    />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="h6">
                                                            {course.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Created: {new Date(course.createdAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                            </Grid>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <TablePagination
                                    component="div"
                                    count={myCreatedCourses.length}
                                    page={page}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    rowsPerPageOptions={[5, 10, 25]}
                                />
                            </Box>
                        </>
                    )}
                    {tab === 1 && (
                        <Box sx={{ p: 3 }}>
                            <Typography color="text.secondary">
                                Analytics features coming soon
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
}