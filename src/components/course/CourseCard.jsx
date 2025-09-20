import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
    Chip,
    Button,
    Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SchoolIcon from '@mui/icons-material/School';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useShoppingActions from '../../hooks/useShoppingActions';
import { useNotification } from '../../contexts/NotificationContext';

export default function CourseCard({
    id,
    title,
    description,
    image,
    price,
    rating,
    category
}) {
    const {
        isInCart,
        isFavorite,
        isEnrolled,
        handleAddToCart,
        toggleFavorite
    } = useShoppingActions();
    const { showNotification } = useNotification();

    const inCart = isInCart(id);
    const inWishlist = isFavorite(id);
    const enrolled = isEnrolled(id);

    const handleWishlistClick = (e) => {
        e.preventDefault(); // Prevent card navigation
        e.stopPropagation(); // Stop event bubbling
        toggleFavorite(id);
        showNotification(
            inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
            'success'
        );
    };

    const handleCartClick = (e) => {
        e.preventDefault(); // Prevent card navigation
        e.stopPropagation(); // Stop event bubbling
        if (!inCart) {
            handleAddToCart({ courseId: id, price });
            showNotification('Added to cart', 'success');
        }
    };

    return (
        <Card
            component={Link}
            to={`/courses/${id}`}
            sx={{
                position: 'relative',
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                },
                backgroundColor: "#fff9f0",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                height: '100%',
            }}
        >
            <CardMedia
                component="img"
                height="160"
                image={image}
                alt={title}
            />

            {/* Action Icons */}
            <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1
            }}>
                {/* Cart Icon */}
                <Tooltip title={inCart ? "Remove from Cart" : "Add to Cart"}>
                    <IconButton
                        onClick={handleCartClick}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.9)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,1)',
                            },
                        }}
                        disabled={enrolled || inCart}
                    >
                        {inCart ? (
                            <ShoppingCartIcon color="primary" />
                        ) : enrolled ? (
                            <SchoolIcon color="success" />
                        ) : (
                            <AddShoppingCartIcon />
                        )}
                    </IconButton>
                </Tooltip>

                {/* Wishlist/Enrolled Icon */}
                <Tooltip title={enrolled ? "Enrolled" : inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                    <IconButton
                        onClick={handleWishlistClick}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.9)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,1)',
                            },
                        }}
                        disabled={enrolled}
                    >
                        {enrolled ? (
                            <SchoolIcon color="primary" />
                        ) : inWishlist ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>

            <CardContent>
                <Box sx={{ mb: 1 }}>
                    <Chip
                        label={category}
                        size="small"
                        sx={{
                            bgcolor: '#ba68c8',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    />
                </Box>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {description}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto'
                    }}
                >
                    <Typography variant="h6" color="primary.main">
                        ${price}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#f4b400'
                        }}
                    >
                        ⭐ {rating.toFixed(1)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
