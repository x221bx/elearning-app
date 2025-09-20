import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Divider,
    Avatar,
    Container,
    Tab,
    Tabs,
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useEnrollment from '../hooks/useEnrollment';
import useCourses from '../hooks/useCourses';
import useAuth from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';
import ConfirmDialog from '../components/common/ConfirmDialog';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = React.useState(0);
    const { auth } = useAuth();
    const { enrolledCourses, toggleEnrollment } = useEnrollment();
    const { courses, seed } = useCourses();
    const { showNotification } = useNotification();

    // Seed courses on component mount
    useEffect(() => {
        seed();
    }, [seed]);

    const userEnrolledCourses = courses.filter(course =>
        enrolledCourses?.includes(course.id)
    );

    const [confirmDialog, setConfirmDialog] = React.useState({
        open: false,
        courseId: null
    });

    const handleUnenroll = (courseId) => {
        setConfirmDialog({
            open: true,
            courseId
        });
    };

    const confirmUnenroll = () => {
        if (confirmDialog.courseId) {
            toggleEnrollment(confirmDialog.courseId);
            showNotification('Successfully unenrolled from course', 'success');
            setConfirmDialog({ open: false, courseId: null });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar
                            sx={{ width: 120, height: 120 }}
                        >
                            {(auth?.name?.[0] || auth?.email?.[0] || "U").toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">
                                {auth?.name || 'User'}
                            </Typography>
                            <Typography variant="subtitle1">
                                {auth?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label="My Courses" />
                        <Tab label="Settings" />
                    </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                    {activeTab === 0 && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Enrolled Courses ({userEnrolledCourses.length})
                            </Typography>
                            <Grid container spacing={3}>
                                {userEnrolledCourses.map(course => (
                                    <Grid item xs={12} key={course.id}>
                                        <Card>
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    variant="rounded"
                                                    src={course.image}
                                                    sx={{ width: 80, height: 80 }}
                                                />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6">
                                                        {course.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {course.description}
                                                    </Typography>
                                                </Box>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleUnenroll(course.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                                {userEnrolledCourses.length === 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography color="text.secondary">
                                                You haven't enrolled in any courses yet.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </>
                    )}
                    {activeTab === 1 && (
                        <Box sx={{ py: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Account Settings
                            </Typography>
                            <Typography color="text.secondary">
                                Account settings and preferences will be available soon.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            <ConfirmDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, courseId: null })}
                onConfirm={confirmUnenroll}
                title="Confirm Unenroll"
                message="Are you sure you want to unenroll from this course? This action cannot be undone."
                confirmText="Unenroll"
                severity="warning"
            />
        </Container>
    );
}