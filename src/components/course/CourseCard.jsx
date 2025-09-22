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

    // Safe fallbacks to keep card rendering consistent
    const courseTitle = title?.trim() || 'Untitled Course';
    const courseDesc = (description || '').toString();
    const courseCategory = category?.toString() || 'General';
    const colorForCategory = (name) => {
        const p = theme.palette;
        const map = {
            Programming: p.secondary.main,
            Science: p.success.main,
            Health: p.error.main,
            Languages: (p.info && p.info.main) || p.secondary.light,
            History: p.warning.main,
            Music: p.primary.dark,
            Art: p.secondary.dark,
            Writing: p.primary.main,
            Math: p.success.dark,
            Culinary: p.error.dark,
            Photography: (p.info && p.info.dark) || p.secondary.main,
            General: p.primary.light,
        };
        return map[name] || p.primary.main;
    };
    const coverFallback = `https://picsum.photos/seed/course-${id || 'fallback'}/600/400`;
    const cover = image || coverFallback;
    const r = Math.max(0, Math.min(5, Number(isNaN(Number(rating)) ? 0 : Number(rating))));

    return (
        <Card
            component={Link}
            to={`/courses/${id}`}
            sx={{
                position: 'relative',
                height: '100%',
                minHeight: 300,
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
                image={cover}
                alt={courseTitle}
                onError={(e) => { e.currentTarget.src = coverFallback; }}
                sx={{ height: 160, objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
            />

            {/* Action Icons */}
            <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1,
                zIndex: 2,
            }}>
                {/* Cart Icon */}
                <Tooltip title={inCart ? "In Cart" : "Add to Cart"}>
                    <IconButton
                        onClick={handleCartClick}
                        aria-label={inCart ? 'in cart' : 'add to cart'}
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 6px 16px rgba(15,23,42,0.12)',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.background.paper, 0.95),
                                borderColor: theme.palette.primary.main,
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
                        aria-pressed={favorite}
                        aria-label={favorite ? 'remove from favorites' : 'add to favorites'}
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.background.paper, 0.8),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 6px 16px rgba(15,23,42,0.12)',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.background.paper, 0.95),
                                borderColor: theme.palette.primary.main,
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
                        label={courseCategory}
                        size="small"
                        sx={() => {
                            const c = colorForCategory(courseCategory);
                            return {
                                bgcolor: alpha(c, 0.14),
                                border: `1px solid ${alpha(c, 0.35)}`,
                                color: 'text.primary',
                                width: 'max-content',
                            };
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
                    {courseTitle}
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
                    {courseDesc}
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




