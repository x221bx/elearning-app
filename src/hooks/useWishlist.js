import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import useAuth from './useAuth';
import {
    addToWishlist,
    removeFromWishlist,
    enrollCourse,
    unenrollCourse,
    setWishlistItems,
    selectWishlistItems,
    selectEnrolledCourses,
    makeSelectIsInWishlist,
    makeSelectIsEnrolled,
} from "../redux/slices/wishlistSlice";

export default function useWishlist() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const wishlistItems = useSelector(selectWishlistItems);
    const enrolledCourses = useSelector(selectEnrolledCourses);

    useEffect(() => {
        const userId = auth?.userId || 'guest';
        const savedWishlist = localStorage.getItem(`wishlist:${userId}`);
        if (savedWishlist) {
            try {
                const items = JSON.parse(savedWishlist);
                dispatch(setWishlistItems(items));
            } catch (e) {
                console.error('Failed to load wishlist:', e);
            }
        }
    }, [auth?.userId, dispatch]);

    const isInWishlist = (courseId) => wishlistItems.includes(courseId);
    const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

    const toggleWishlist = (courseId) => {
        const userId = auth?.userId || 'guest';
        if (isInWishlist(courseId)) {
            dispatch(removeFromWishlist(courseId));
            // Save to localStorage
            const newWishlist = wishlistItems.filter(id => id !== courseId);
            localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
        } else {
            dispatch(addToWishlist(courseId));
            // Save to localStorage
            const newWishlist = [...wishlistItems, courseId];
            localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
        }
    };

    const handleEnrollment = (courseId) => {
        const userId = auth?.userId || 'guest';
        if (!isEnrolled(courseId)) {
            dispatch(enrollCourse(courseId));
            // Save to localStorage
            const newEnrolled = [...enrolledCourses, courseId];
            localStorage.setItem(`enrolled:${userId}`, JSON.stringify(newEnrolled));
        } else {
            dispatch(unenrollCourse(courseId));
            // Save to localStorage
            const newEnrolled = enrolledCourses.filter(id => id !== courseId);
            localStorage.setItem(`enrolled:${userId}`, JSON.stringify(newEnrolled));
        }
    };

    return {
        wishlistItems,
        enrolledCourses,
        isInWishlist,
        isEnrolled,
        toggleWishlist,
        handleEnrollment,
    };
}
