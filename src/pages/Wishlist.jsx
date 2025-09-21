import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import useWishlist from '../hooks/useWishlist';
import useCourses from '../hooks/useCourses';
import useEnrollment from '../hooks/useEnrollment';
import CourseCard from '../components/course/CourseCard';
import StateDebugger from '../components/common/StateDebugger';
import { useNotification } from '../contexts/NotificationContext';

export default function WishlistPage() {
    const theme = useTheme();
    const { wishlistItems } = useWishlist();
    const { courses, isLoading: coursesLoading, seed } = useCourses();
    const { enrolledCourses } = useEnrollment();

    // Seed courses on component mount
    useEffect(() => {
        seed();
    }, [seed]);
    const { showNotification } = useNotification();

    // Get full course objects for items in wishlist that are not yet enrolled
    const wishlistCourses = courses.filter(course =>
        Array.isArray(wishlistItems) &&
        wishlistItems.includes(course.id) &&
        !enrolledCourses.includes(course.id)
    );

    const enrolledWishlistCount = Array.isArray(wishlistItems)
        ? wishlistItems.filter(id => enrolledCourses.includes(id)).length
        : 0;

    // Add state debugger
    const showDebug = import.meta.env.MODE === 'development';

    if (coursesLoading) {
        return showDebug ? <StateDebugger /> : (
            <Box sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography>Loading your wishlist...</Typography>
            </Box>
        );
    }

    const isDark = theme.palette.mode === 'dark';
    const gradientStart = isDark
        ? alpha(theme.palette.secondary.dark, 0.28)
        : alpha(theme.palette.secondary.light, 0.36);

    if (wishlistCourses.length === 0) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: `linear-gradient(180deg, ${gradientStart} 0%, ${theme.palette.background.default} 65%)`,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Box sx={{ flex: 1, px: { xs: 2, sm: 4, md: 8 }, py: { xs: 5, md: 8 } }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        My Wishlist (0)
                    </Typography>
                    <Box sx={{
                        backgroundColor: alpha(theme.palette.secondary.light, isDark ? 0.18 : 0.28),
                        borderRadius: 3,
                        p: { xs: 3, md: 4 },
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
                        textAlign: 'center',
                        color: 'text.secondary',
                    }}>
                        Your wishlist is empty. Browse our courses and add some to your wishlist!
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `linear-gradient(180deg, ${gradientStart} 0%, ${theme.palette.background.default} 65%)`,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box sx={{ flex: 1, px: { xs: 2, sm: 4, md: 8 }, py: { xs: 5, md: 8 } }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                    My Wishlist ({wishlistCourses.length})
                </Typography>

                {enrolledWishlistCount > 0 && (
                    <Box sx={{
                        mb: 3,
                        backgroundColor: alpha(theme.palette.warning.main, 0.08),
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                        borderRadius: 2,
                        p: 2,
                        color: 'text.secondary'
                    }}>
                        {enrolledWishlistCount} {enrolledWishlistCount === 1 ? 'course has' : 'courses have'} been moved to your favorites because you are already enrolled.
                    </Box>
                )}

                <Box
                    sx={{
                        backgroundColor: isDark ? alpha(theme.palette.secondary.dark, 0.24) : alpha(theme.palette.secondary.light, 0.28),
                        borderRadius: 3,
                        p: { xs: 2.5, md: 3.5 },
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
                        boxShadow: theme.customShadows?.card,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: 3,
                        }}
                    >
                        {wishlistCourses.map(course => (
                            <CourseCard key={course.id} {...course} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
