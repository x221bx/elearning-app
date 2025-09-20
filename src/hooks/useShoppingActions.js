import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart, removeFromCart, selectCartItems } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectWishlistItems } from '../redux/slices/wishlistSlice';
import { selectEnrolledCourses } from '../redux/slices/enrollmentSlice';
import useAuth from './useAuth';

export default function useShoppingActions() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const cartItems = useSelector(selectCartItems) || [];
    const wishlistItems = useSelector(selectWishlistItems) || [];
    const enrolledCourses = useSelector(selectEnrolledCourses) || [];

    // Initialize from localStorage
    useEffect(() => {
        const userId = auth?.userId || 'guest';
        // Load wishlist
        const savedWishlist = localStorage.getItem(`wishlist:${userId}`);
        if (savedWishlist) {
            try {
                const wishlistData = JSON.parse(savedWishlist);
                if (Array.isArray(wishlistData)) {
                    // Dispatch each item to wishlist
                    wishlistData.forEach(courseId => {
                        dispatch(addToWishlist(courseId));
                    });
                }
            } catch (e) {
                console.error('Failed to load wishlist:', e);
            }
        }
    }, [auth?.userId, dispatch]);

    // Check if a course is in cart
    const isInCart = (courseId) => cartItems.some(item => item.courseId === courseId);

    // Check if a course is in wishlist
    const isFavorite = (courseId) => wishlistItems.includes(courseId);

    // Check if a course is enrolled
    const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

    // Add to cart
    const handleAddToCart = (course) => {
        if (!isInCart(course.id)) {
            dispatch(addToCart({
                courseId: course.id,
                price: course.price
            }));
            // Also save to localStorage
            const userId = auth?.userId || 'guest';
            const updatedItems = [...cartItems, { courseId: course.id, price: course.price }];
            localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
        }
    };

    // Remove from cart
    const handleRemoveFromCart = (courseId) => {
        dispatch(removeFromCart(courseId));
        // Also update localStorage
        const userId = auth?.userId || 'guest';
        const updatedItems = cartItems.filter(item => item.courseId !== courseId);
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    // Toggle wishlist
    const toggleFavorite = (courseId) => {
        const userId = auth?.userId || 'guest';
        if (isFavorite(courseId)) {
            dispatch(removeFromWishlist(courseId));
            const newWishlist = wishlistItems.filter(id => id !== courseId);
            localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
        } else {
            dispatch(addToWishlist(courseId));
            const newWishlist = [...wishlistItems, courseId];
            localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
        }
    };

    return {
        cartItems,
        wishlistItems,
        enrolledCourses,
        isInCart,
        isFavorite,
        isEnrolled,
        handleAddToCart,
        handleRemoveFromCart,
        toggleFavorite
    };
}