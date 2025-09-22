import React, { useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useCourses from '../hooks/useCourses';
import { useNotification } from '../contexts/NotificationContext';
import ConfirmDialog from '../components/common/confirmDialog';
import { useTheme, alpha } from '@mui/material/styles';

export default function CartPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const { cartItems, cartTotal, removeItemFromCart, handlePayment, isProcessing, clearAll } = useCart();
    const { courses, seed } = useCourses();
    const { showNotification } = useNotification();

    // Seed courses on component mount
    useEffect(() => {
        seed();
    }, [seed]);

    const [confirmDialog, setConfirmDialog] = React.useState({
        open: false,
        courseId: null
    });
    const [clearDialogOpen, setClearDialogOpen] = React.useState(false);

    // Get full course objects for items in cart
    const cartCourses = cartItems.map(item => ({
        ...courses.find(c => c.id === item.courseId),
        cartPrice: item.price
    })).filter(Boolean);

    const isDark = theme.palette.mode === 'dark';
    const gradientStart = isDark
        ? alpha(theme.palette.secondary.dark, 0.28)
        : alpha(theme.palette.secondary.light, 0.36);

    if (cartCourses.length === 0) {
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
                <Box sx={{ flex: 1, px: { xs: 2, sm: 4, md: 8 }, py: { xs: 5, md: 8 }, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        Shopping Cart (0)
                    </Typography>
                    <Box sx={{
                        maxWidth: 640,
                        mx: 'auto',
                        backgroundColor: alpha(theme.palette.secondary.light, isDark ? 0.18 : 0.28),
                        borderRadius: 3,
                        p: { xs: 3, md: 4 },
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
                        color: 'text.secondary',
                    }}>
                        Your cart is empty. Browse our courses and add some to your cart!
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" component={Link} to="/courses">
                                Browse Courses
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    const onPaymentClick = async () => {
        try {
            const success = await handlePayment();
            if (success) {
                showNotification('Payment successful! You are now enrolled in these courses.', 'success');
                navigate('/profile');
            } else {
                showNotification('Payment failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Payment error:', error);
            showNotification('Payment failed. Please try again.', 'error');
        }
    };

    const handleRemoveItem = (courseId) => {
        setConfirmDialog({
            open: true,
            courseId
        });
    };

    const confirmRemoveItem = () => {
        if (confirmDialog.courseId) {
            removeItemFromCart(confirmDialog.courseId);
            showNotification('Item removed from cart', 'success');
            setConfirmDialog({ open: false, courseId: null });
        }
    };

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
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4, md: 8 }, py: { xs: 5, md: 8 } }}>
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
                                    backgroundColor: alpha(theme.palette.secondary.light, isDark ? 0.16 : 0.24),
                                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
                                }}
                            >
                                <CardContent sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}>
                                    <Box
                                        component="img"
                                        src={course.image || `https://picsum.photos/seed/course-${course.id}/600/400`}
                                        alt={course.title || 'Course'}
                                        onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/course-${course.id}/600/400`; }}
                                        sx={{
                                            width: 120,
                                            height: 80,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                        }}
                                    />

                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {course.title || 'Untitled Course'}
                                        </Typography>
                                        <Typography color="text.secondary" variant="body2">
                                            {course.category || 'General'}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        color="primary.main"
                                        sx={{ mx: 2 }}
                                    >
                                        ${`$${Number(course.cartPrice || 0)}`}
                                    </Typography>

                                    <IconButton
                                        onClick={() => handleRemoveItem(course.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        ))}
                        <Box sx={{ mt: 2 }}>
                            <Button variant="outlined" color="error" onClick={() => setClearDialogOpen(true)}>
                                Clear Cart
                            </Button>
                            <Button sx={{ ml: 1 }} variant="text" component={Link} to="/courses">
                                Continue Shopping
                            </Button>
                        </Box>
                    </Box>

                    {/* Order Summary */}
                    <Box sx={{ width: { xs: '100%', md: 300 } }}>
                        <Card sx={{
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.secondary.light, isDark ? 0.16 : 0.24),
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
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
                                    disabled={isProcessing || cartCourses.length === 0}
                                    sx={{
                                        py: 1.5,
                                        '&.Mui-disabled': {
                                            backgroundColor: (theme) => theme.palette.action.disabledBackground,
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

            <ConfirmDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, courseId: null })}
                onConfirm={confirmRemoveItem}
                title="Remove from Cart"
                message="Are you sure you want to remove this course from your cart?"
                confirmText="Remove"
                severity="warning"
            />
            <ConfirmDialog
                open={clearDialogOpen}
                onClose={() => setClearDialogOpen(false)}
                onConfirm={() => {
                    clearAll();
                    showNotification('Cart cleared', 'info');
                }}
                title="Clear Cart"
                message="This will remove all items from your cart. Continue?"
                confirmText="Clear All"
                severity="error"
            />
        </Box>
    );
}
