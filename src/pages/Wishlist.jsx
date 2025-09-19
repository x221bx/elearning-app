import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import useCourses from '../hooks/useCourses';
import useCart from '../hooks/useCart';
import CourseCard from '../components/course/CourseCard';
import { useNotification } from '../contexts/NotificationContext';

export default function WishlistPage() {
    const navigate = useNavigate();
    const { wishlistItems, isInWishlist, toggleWishlist } = useWishlist();
    const { courses, isLoading: coursesLoading } = useCourses();
    const { addItemToCart } = useCart();
    const { showNotification } = useNotification();

    // Get full course objects for items in wishlist
    const wishlistCourses = courses.filter(course =>
        Array.isArray(wishlistItems) && wishlistItems.includes(course.id)
    );

    // Add state debugger
    const showDebug = process.env.NODE_ENV === 'development';

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
                mt: 8 // Add top margin to account for navbar
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
            backgroundColor: "#fdf7ff",
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

                <Grid container spacing={3}>
                    {wishlistCourses.map(course => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Box sx={{ height: '100%' }}>
                                <CourseCard {...course} />
                                <Card
                                    sx={{
                                        mt: 1,
                                        borderRadius: 3,
                                        bgcolor: '#fff9f0',
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
