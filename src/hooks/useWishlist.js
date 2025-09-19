// src/hooks/useWishlist.js
import { useDispatch, useSelector } from "react-redux";
import {
    addToWishlist,
    removeFromWishlist,
    enrollCourse,
    unenrollCourse,
    selectWishlistItems,
    selectEnrolledCourses,
    makeSelectIsInWishlist,
    makeSelectIsEnrolled,
} from "../redux/slices/wishlistSlice";

export default function useWishlist() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(selectWishlistItems);
    const enrolledCourses = useSelector(selectEnrolledCourses);

    const isInWishlist = (courseId) => wishlistItems.includes(courseId);
    const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

    const toggleWishlist = (courseId) => {
        if (isInWishlist(courseId)) {
            dispatch(removeFromWishlist(courseId));
        } else {
            dispatch(addToWishlist(courseId));
        }
    };

    const handleEnrollment = (courseId) => {
        if (!isEnrolled(courseId)) {
            dispatch(enrollCourse(courseId));
        } else {
            dispatch(unenrollCourse(courseId));
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
