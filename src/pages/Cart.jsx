import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    Divider,
    CircularProgress,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useCourses from '../hooks/useCourses';

export default function CartPage() {
    const { cartItems, cartTotal, removeItemFromCart, handlePayment, isProcessing } = useCart();
    const { courses } = useCourses();

    // Get full course objects for items in cart
    const cartCourses = cartItems.map(item => ({
        ...courses.find(c => c.id === item.courseId),
        cartPrice: item.price
    })).filter(Boolean);

    if (cartCourses.length === 0) {
        return (
            <Box sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                py: 8,
            }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Your cart is empty
                </Typography>
                <Typography color="text.secondary" textAlign="center">
                    Browse our courses and add some to your cart!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/courses"
                    sx={{ mt: 2 }}
                >
                    Browse Courses
                </Button>
            </Box>
        );
    }

    const onPaymentClick = async () => {
        try {
            const success = await handlePayment();
            if (success) {
                // Show success message and redirect
                alert('Payment successful! You are now enrolled in these courses.');
                window.location.href = '/courses';
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        }
    };

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
                    Shopping Cart ({cartCourses.length})
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Cart Items */}
                    <Box sx={{ flex: 1 }}>
                        {cartCourses.map(course => (
                            <Card
                                key={course.id}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3,
                                    backgroundColor: '#fff9f0',
                                }}
                            >
                                <CardContent sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}>
                                    <Box
                                        component="img"
                                        src={course.image}
                                        alt={course.title}
                                        sx={{
                                            width: 120,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                        }}
                                    />

                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {course.title}
                                        </Typography>
                                        <Typography color="text.secondary" variant="body2">
                                            {course.category}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        color="primary.main"
                                        sx={{ mx: 2 }}
                                    >
                                        ${course.cartPrice}
                                    </Typography>

                                    <IconButton
                                        onClick={() => removeItemFromCart(course.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* Order Summary */}
                    <Box sx={{ width: { xs: '100%', md: 300 } }}>
                        <Card sx={{
                            borderRadius: 3,
                            backgroundColor: '#fff9f0',
                            position: 'sticky',
                            top: 100,
                        }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Order Summary
                                </Typography>

                                <Box sx={{ my: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Subtotal</Typography>
                                        <Typography>${cartTotal}</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Total
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        ${cartTotal}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={onPaymentClick}
                                    disabled={isProcessing}
                                    sx={{
                                        py: 1.5,
                                        '&.Mui-disabled': {
                                            backgroundColor: '#ccc',
                                        },
                                    }}
                                >
                                    {isProcessing ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Proceed to Payment'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
