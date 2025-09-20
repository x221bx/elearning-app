// src/hooks/useEnrollment.js
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    enrollCourse,
    unenrollCourse,
    setEnrolledCourses,
    selectEnrolledCourses
} from '../redux/slices/enrollmentSlice';
import useAuth from './useAuth';

export default function useEnrollment() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';
    const enrolledCourses = useSelector(selectEnrolledCourses);
    const hasLoadedRef = useRef(null);

    useEffect(() => {
        if (hasLoadedRef.current === userId) {
            return;
        }
        hasLoadedRef.current = userId;

        try {
            const savedEnrollments = localStorage.getItem(`enrollments:${userId}`);
            const enrollmentData = savedEnrollments ? JSON.parse(savedEnrollments) : [];
            if (Array.isArray(enrollmentData)) {
                dispatch(setEnrolledCourses(enrollmentData));
            } else {
                throw new Error('Invalid enrollment data');
            }
        } catch (error) {
            console.error('Failed to load enrollments:', error);
            dispatch(setEnrolledCourses([]));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        localStorage.setItem(`enrollments:${userId}`, JSON.stringify(enrolledCourses));
    }, [userId, enrolledCourses]);

    const isEnrolled = useCallback(
        (courseId) => (enrolledCourses || []).includes(courseId),
        [enrolledCourses]
    );

    const handleEnroll = useCallback((courseId) => {
        if (!courseId || isEnrolled(courseId)) {
            return false;
        }
        dispatch(enrollCourse(courseId));
        return true;
    }, [dispatch, isEnrolled]);

    const handleUnenroll = useCallback((courseId) => {
        if (!courseId || !isEnrolled(courseId)) {
            return false;
        }
        dispatch(unenrollCourse(courseId));
        return true;
    }, [dispatch, isEnrolled]);

    const toggleEnrollment = useCallback((courseId) => {
        if (!courseId) return false;
        if (isEnrolled(courseId)) {
            return handleUnenroll(courseId);
        }
        return handleEnroll(courseId);
    }, [handleEnroll, handleUnenroll, isEnrolled]);

    return {
        enrolledCourses,
        isEnrolled,
        handleEnroll,
        handleUnenroll,
        toggleEnrollment,
    };
}
