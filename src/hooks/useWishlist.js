import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import useAuth from './useAuth';
import {
    addToWishlist,
    removeFromWishlist,
    setWishlistItems,
    selectWishlistItems
} from '../redux/slices/wishlistSlice';

export default function useWishlist() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';
    const wishlistItems = useSelector(selectWishlistItems) || [];

    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem(`wishlist:${userId}`);
            const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : [];

            if (!Array.isArray(wishlistData)) {
                throw new Error('Invalid wishlist data format');
            }

            dispatch(setWishlistItems(wishlistData));
        } catch (e) {
            console.error('Failed to load wishlist:', e);
            dispatch(setWishlistItems([]));
        }
    }, [userId, dispatch]);

    const isInWishlist = useCallback(
        (courseId) => wishlistItems.includes(courseId),
        [wishlistItems]
    );

    const toggleWishlist = useCallback(
        (courseId) => {
            if (!courseId) return;

            try {
                if (isInWishlist(courseId)) {
                    dispatch(removeFromWishlist(courseId));
                    const newWishlist = wishlistItems.filter(id => id !== courseId);
                    localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
                } else {
                    dispatch(addToWishlist(courseId));
                    const newWishlist = [...wishlistItems, courseId];
                    localStorage.setItem(`wishlist:${userId}`, JSON.stringify(newWishlist));
                }
            } catch (e) {
                console.error('Failed to update wishlist:', e);
            }
        },
        [userId, wishlistItems, isInWishlist, dispatch]
    );

    return {
        wishlistItems,
        isInWishlist,
        toggleWishlist
    };
}