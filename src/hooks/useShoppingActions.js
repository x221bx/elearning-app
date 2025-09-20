import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../redux/slices/cartSlice';
import { selectWishlistItems } from '../redux/slices/wishlistSlice';
import { selectEnrolledCourses } from '../redux/slices/enrollmentSlice';
import useAuth from './useAuth';
import useFavorites from './useFavorites';

export default function useShoppingActions() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';

    const cartItems = useSelector(selectCartItems);
    const wishlistItems = useSelector(selectWishlistItems);
    const enrolledCourses = useSelector(selectEnrolledCourses);
    const { isFavorite, toggleFavorite } = useFavorites();

    const isInCart = (courseId) => cartItems.some(item => item.courseId === courseId);

    const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

    const handleAddToCart = (course) => {
        if (!course) return;
        const courseId = course.id ?? course.courseId;
        if (!courseId || isInCart(courseId)) return;

        const cartItem = {
            courseId,
            price: course.price
        };

        dispatch(addToCart(cartItem));
        const updatedItems = [...cartItems, cartItem];
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    const handleRemoveFromCart = (courseId) => {
        if (!courseId) return;
        dispatch(removeFromCart(courseId));
        const updatedItems = cartItems.filter(item => item.courseId !== courseId);
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
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
