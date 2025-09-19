// src/hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    removeFromCart,
    clearCart,
    setPaymentProcessing,
    selectCartItems,
    selectCartTotal,
    selectIsInCart,
    selectPaymentProcessing
} from "../redux/slices/cartSlice";
import { enrollCourse } from "../redux/slices/wishlistSlice";

export default function useCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const isProcessing = useSelector(selectPaymentProcessing);

    const isInCart = (courseId) => cartItems.some(item => item.courseId === courseId);

    const addItemToCart = (course) => {
        dispatch(addToCart(course));
    };

    const removeItemFromCart = (courseId) => {
        dispatch(removeFromCart(courseId));
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