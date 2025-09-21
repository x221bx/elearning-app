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
import { useTheme, alpha } from '@mui/material/styles';
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
    const theme = useTheme();
    const {
        isInCart,
        isFavorite,
        isEnrolled,
        handleAddToCart,
        toggleFavorite
    } = useShoppingActions();
    const { showNotification } = useNotification();

    const inCart = isInCart(id);
    const favorite = isFavorite(id);
    const enrolled = isEnrolled(id);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent card navigation
        e.stopPropagation(); // Stop event bubbling
        toggleFavorite(id);
        showNotification(
            favorite ? 'Removed from favorites' : 'Added to favorites',
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
                boxShadow: theme.shadows[4],
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: theme.shadows[8],
                },
                backgroundColor: theme.palette.brand.soft,
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
                            bgcolor: alpha(theme.palette.background.paper, 0.85),
                            '&:hover': {
                                bgcolor: alpha(theme.palette.background.paper, 0.98),
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

                {/* Favorites Icon */}
                <Tooltip title={favorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <IconButton
                        onClick={handleFavoriteClick}
                        sx={{
                            bgcolor: alpha(theme.palette.background.paper, 0.85),
                            '&:hover': {
                                bgcolor: alpha(theme.palette.background.paper, 0.98),
                            },
                        }}
                    >
                        {favorite ? (
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
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" color="primary.main">
                            ${price}
                        </Typography>
                        {enrolled && (
                            <Chip
                                label="Enrolled"
                                size="small"
                                color="success"
                                sx={{ fontWeight: 'bold' }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.warning.main
                        }}
                    >
                        ⭐ {rating.toFixed(1)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}




