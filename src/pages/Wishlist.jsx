import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import useCourses from '../hooks/useCourses';
import useCart from '../hooks/useCart';
import useEnrollment from '../hooks/useEnrollment';
import CourseCard from '../components/course/CourseCard';
import { useNotification } from '../contexts/NotificationContext';

export default function WishlistPage() {
    const navigate = useNavigate();
    const { wishlistItems } = useWishlist();
    const { courses, isLoading: coursesLoading, seed } = useCourses();
    const { enrolledCourses } = useEnrollment();

    // Seed courses on component mount
    useEffect(() => {
        seed();
    }, [seed]);
    const { addItemToCart } = useCart();
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

    if (wishlistCourses.length === 0) {
        return (
            <Box sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                py: 8,
                mt: 8
            }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Your wishlist is empty
                </Typography>
                <Typography color="text.secondary" textAlign="center">
                    Browse our courses and add some to your wishlist!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/courses"
                    sx={{ mt: 2 }}
                >
                    Browse Courses
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{
            backgroundColor: "var(--brand-soft)",
            minHeight: "100vh",
            py: 8,
        }}>
            <Box sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: { xs: 2, sm: 4 }
            }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 4 }}
                >
                    My Wishlist ({wishlistCourses.length})
                </Typography>

                {enrolledWishlistCount > 0 && (
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        {enrolledWishlistCount} {enrolledWishlistCount === 1 ? 'course has' : 'courses have'}
                        {' '}been moved to your favorites because you are already enrolled.
                    </Typography>
                )}

                <Grid container spacing={3}>
                    {wishlistCourses.map(course => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Box sx={{ height: '100%' }}>
                                <CourseCard {...course} />
                                <Card
                                    sx={{
                                        mt: 1,
                                        borderRadius: 3,
                                        bgcolor: 'var(--brand-soft)',
                                    }}
                                >
                                    <CardContent>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                addItemToCart({
                                                    courseId: course.id,
                                                    price: course.price
                                                });
                                                showNotification('Course added to cart', 'success');
                                                navigate('/cart');
                                            }}
                                        >
                                            Proceed to Enroll
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
