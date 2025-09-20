import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import useAuth from './useAuth';
import {
    addToCart,
    removeFromCart,
    clearCart,
    setPaymentProcessing,
    setCartItems,
    selectCartItems,
    selectCartTotal,
    selectIsInCart,
    selectPaymentProcessing
} from "../redux/slices/cartSlice";
import { enrollCourse } from "../redux/slices/enrollmentSlice";

export default function useCart() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';
    const cartItems = useSelector(selectCartItems) || [];
    const cartTotal = useSelector(selectCartTotal) || 0;
    const isProcessing = useSelector(selectPaymentProcessing) || false;

    // Load user-specific cart on auth change
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(`cart:${userId}`);
            const items = savedCart ? JSON.parse(savedCart) : [];

            if (!Array.isArray(items)) {
                throw new Error('Invalid cart data format');
            }

            dispatch(setCartItems(items));
        } catch (e) {
            console.error('Failed to load cart:', e);
            dispatch(setCartItems([]));
        }
    }, [auth?.userId, dispatch]);

    const isInCart = (courseId) => (cartItems || []).some(item => item.courseId === courseId);

    const addItemToCart = (course) => {
        const userId = auth?.userId || 'guest';
        const cartItem = {
            courseId: course.courseId || course.id,
            price: course.price
        };
        dispatch(addToCart(cartItem));
        const updatedItems = [...cartItems, cartItem];
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    const removeItemFromCart = (courseId) => {
        const userId = auth?.userId || 'guest';
        dispatch(removeFromCart(courseId));
        const updatedItems = cartItems.filter(item => item.courseId !== courseId);
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    const handlePayment = async () => {
        try {
            dispatch(setPaymentProcessing(true));

            // Here you would typically make an API call to process payment
            // For demo purposes, we'll just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // After successful payment, enroll in all courses
            cartItems.forEach(item => {
                dispatch(enrollCourse(item.courseId));
            });

            // Clear the cart
            dispatch(clearCart());

            return true;
        } catch (error) {
            console.error('Payment failed:', error);
            return false;
        } finally {
            dispatch(setPaymentProcessing(false));
        }
    };

    return {
        cartItems,
        cartTotal,
        isInCart,
        isProcessing,
        addItemToCart,
        removeItemFromCart,
        handlePayment,
    };
}