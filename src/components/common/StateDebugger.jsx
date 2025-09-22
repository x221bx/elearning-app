import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/slices/cartSlice';
import { selectWishlistItems } from '../../redux/slices/wishlistSlice';
import { selectEnrolledCourses } from '../../redux/slices/enrollmentSlice';
import { selectCourses } from '../../redux/slices/coursesSlice';

export default function StateDebugger() {
    try {
        const cartItems = useSelector(selectCartItems) || [];
        const wishlistItems = useSelector(selectWishlistItems) || [];
        const enrolledCourses = useSelector(selectEnrolledCourses) || [];
        const courses = useSelector(selectCourses) || [];

        return (
            <div style={{ padding: 16, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 8, fontSize: 12 }}>
                <strong>State Debug</strong>
                <pre style={{ margin: 0 }}>
                    {JSON.stringify(
                        {
                            cartItemsCount: cartItems.length,
                            wishlistCount: wishlistItems.length,
                            enrolledCount: enrolledCourses.length,
                            coursesCount: courses.length,
                        },
                        null,
                        2
                    )}
                </pre>
            </div>
        );
    } catch {
        return null;
    }
}
