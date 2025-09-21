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
    Rating,
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
    const soft = theme.palette.brand?.soft || (theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.main, 0.1));
    const border = alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.4 : 0.25);
    const hoverBg = theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.main, 0.18);
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

    const r = Math.max(0, Math.min(5, Number(rating || 0)));

    return (
        <Card
            component={Link}
            to={`/courses/${id}`}
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 3,
                border: `1px solid ${border}`,
                background: theme.palette.mode === 'dark'
                    ? theme.palette.background.paper
                    : `linear-gradient(180deg, #FFFFFF 0%, ${soft} 100%)`,
                boxShadow: theme.customShadows?.card || '0 12px 32px rgba(15,23,42,0.12)',
                transition: 'transform .2s, box-shadow .2s, border-color .2s, background-color .2s',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 18px 38px rgba(15,23,42,0.18)',
                    borderColor: theme.palette.primary.main,
                    backgroundColor: hoverBg,
                },
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{ height: 160, objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
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

            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                <Box sx={{ mb: 1 }}>
                    <Chip
                        label={category}
                        size="small"
                        sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            color: 'text.primary',
                            width: 'max-content',
                        }}
                    />
                </Box>

                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontWeight: 900,
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Rating value={r} readOnly precision={0.5} max={5} sx={{ '& .MuiRating-iconFilled': { color: theme.palette.primary.main } }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.toFixed(1)}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}




