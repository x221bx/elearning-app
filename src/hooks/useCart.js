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
    selectPaymentProcessing
} from "../redux/slices/cartSlice";
import { enrollCourse } from "../redux/slices/enrollmentSlice";

export default function useCart() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal) || 0;
    const isProcessing = useSelector(selectPaymentProcessing) || false;

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
    }, [auth?.userId, dispatch, userId]);

    const isInCart = (courseId) => cartItems.some(item => item.courseId === courseId);

    const addItemToCart = (course) => {
        const cartCourseId = course.courseId || course.id;
        if (!cartCourseId) return;
        if (isInCart(cartCourseId)) return;

        const cartItem = {
            courseId: cartCourseId,
            price: course.price
        };
        dispatch(addToCart(cartItem));
        const updatedItems = [...cartItems, cartItem];
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    const removeItemFromCart = (courseId) => {
        dispatch(removeFromCart(courseId));
        const updatedItems = cartItems.filter(item => item.courseId !== courseId);
        localStorage.setItem(`cart:${userId}`, JSON.stringify(updatedItems));
    };

    const handlePayment = async () => {
        const itemsToPurchase = [...cartItems];
        try {
            dispatch(setPaymentProcessing(true));

            await new Promise(resolve => setTimeout(resolve, 1500));

            itemsToPurchase.forEach(item => {
                dispatch(enrollCourse(item.courseId));
            });

            dispatch(clearCart());
            localStorage.setItem(`cart:${userId}`, JSON.stringify([]));

            return true;
        } catch (error) {
            console.error('Payment failed:', error);
            return false;
        } finally {
            dispatch(setPaymentProcessing(false));
        }
    };

    const clearAll = () => {
        dispatch(clearCart());
        localStorage.setItem(`cart:${userId}`, JSON.stringify([]));
    };

    return {
        cartItems,
        cartTotal,
        isInCart,
        isProcessing,
        addItemToCart,
        removeItemFromCart,
        handlePayment,
        clearAll,
    };
}
