import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart, removeFromCart, selectCartItems } from '../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../redux/slices/favoritesSlice';
import { selectEnrolledCourses } from '../redux/slices/enrollmentSlice';
import useAuth from './useAuth';

export default function useShoppingActions() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const cartItems = useSelector(selectCartItems) || [];
    const favorites = useSelector(selectFavorites) || [];
    const enrolledCourses = useSelector(selectEnrolledCourses) || [];

    // Initialize from localStorage
    useEffect(() => {
        const userId = auth?.userId || 'guest';
        // Load favorites
        const savedFavorites = localStorage.getItem(`favorites:${userId}`);
        if (savedFavorites) {
            try {
                dispatch(setFavorites(JSON.parse(savedFavorites)));
            } catch (e) {
                console.error('Failed to load favorites:', e);
            }
        }
    }, [auth?.userId, dispatch]);

    // Check if a course is in cart
    const isInCart = (courseId) => cartItems.some(item => item.courseId === courseId);

    // Check if a course is in favorites
    const isFavorite = (courseId) => favorites.includes(courseId);

    // Check if a course is enrolled
    const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

    // Add to cart
    const handleAddToCart = (course) => {
        if (!isInCart(course.id)) {
            dispatch(addToCart({
                courseId: course.id,
                price: course.price
            }));
        }
    };

    // Remove from cart
    const handleRemoveFromCart = (courseId) => {
        dispatch(removeFromCart(courseId));
    };

    // Toggle favorite
    const toggleFavorite = (courseId) => {
        if (isFavorite(courseId)) {
            dispatch(removeFromFavorites(courseId));
        } else {
            dispatch(addToFavorites(courseId));
        }
    };

    return {
        cartItems,
        favorites,
        enrolledCourses,
        isInCart,
        isFavorite,
        isEnrolled,
        handleAddToCart,
        handleRemoveFromCart,
        toggleFavorite
    };
}