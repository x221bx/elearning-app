// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectCartItems, selectCartTotal } from '../redux/slices/cartSlice';
// import { selectWishlistItems } from '../redux/slices/wishlistSlice';
// import { selectEnrolledCourses } from '../redux/slices/enrollmentSlice';
// import { selectCourses } from '../redux/slices/coursesSlice';
//
// export function StateDebugger() {
//     // Get all states with safe fallbacks
//     const cartItems = useSelector(selectCartItems) || [];
//     const cartTotal = useSelector(selectCartTotal) || 0;
//     const wishlistItems = useSelector(selectWishlistItems) || [];
//     const enrolledCourses = useSelector(selectEnrolledCourses) || [];
//     const courses = useSelector(selectCourses) || [];
//
//     return (
//         <div style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
//             <h3>State Debug Info</h3>
//             <pre>
//                 {JSON.stringify(
//                     {
//                         cartItemsCount: cartItems.length,
//                         cartTotal,
//                         wishlistCount: wishlistItems.length,
//                         enrolledCount: enrolledCourses.length,
//                         coursesCount: courses.length,
//                     },
//                     null,
//                     2
//                 )}
//             </pre>
//         </div>
//     );
// }