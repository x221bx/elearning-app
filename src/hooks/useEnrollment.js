// src/hooks/useEnrollment.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    enrollCourse,
    unenrollCourse,
    setEnrolledCourses,
    selectEnrolledCourses
} from '../redux/slices/enrollmentSlice';
import useWishlist from './useWishlist';

export default function useEnrollment() {
    const dispatch = useDispatch();
    const { isEnrolled } = useWishlist();

    const handleEnroll = useCallback((courseId) => {
        if (!isEnrolled(courseId)) {
            // Enroll in the course
            dispatch(enrollCourse(courseId));
            // Here you could also add API calls, payment processing, etc.
            return true;
        }
        return false;
    }, [dispatch, isEnrolled]);

    const handleUnenroll = useCallback((courseId) => {
        if (isEnrolled(courseId)) {
            // Unenroll from the course
            dispatch(unenrollCourse(courseId));
            // Here you could also add API calls for unenrollment
            return true;
        }
        return false;
    }, [dispatch, isEnrolled]);

    return {
        handleEnroll,
        handleUnenroll,
    };
}