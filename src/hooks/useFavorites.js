import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './useAuth';
import {
    addToFavorites,
    removeFromFavorites,
    setFavorites,
    selectFavorites
} from '../redux/slices/favoritesSlice';
import {
    addToWishlist,
    removeFromWishlist,
    setWishlistItems,
    selectWishlistItems,
    selectIsWishlistInitialized
} from '../redux/slices/wishlistSlice';
import { selectEnrolledCourses } from '../redux/slices/enrollmentSlice';

export default function useFavorites() {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const userId = auth?.userId || 'guest';

    const favorites = useSelector(selectFavorites);
    const wishlistItems = useSelector(selectWishlistItems);
    const wishlistInitialized = useSelector(selectIsWishlistInitialized);
    const enrolledCourses = useSelector(selectEnrolledCourses);

    const lastLoadedUserRef = useRef(null);

    useEffect(() => {
        if (lastLoadedUserRef.current === userId) {
            return;
        }
        lastLoadedUserRef.current = userId;

        try {
            const savedFavorites = localStorage.getItem(`favorites:${userId}`);
            const favoritesData = savedFavorites ? JSON.parse(savedFavorites) : [];
            if (Array.isArray(favoritesData)) {
                dispatch(setFavorites(favoritesData));
            } else {
                throw new Error('Invalid favorites data');
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
            dispatch(setFavorites([]));
        }

        try {
            const savedWishlist = localStorage.getItem(`wishlist:${userId}`);
            const wishlistData = savedWishlist ? JSON.parse(savedWishlist) : [];
            if (Array.isArray(wishlistData)) {
                dispatch(setWishlistItems(wishlistData));
            } else {
                throw new Error('Invalid wishlist data');
            }
        } catch (error) {
            console.error('Failed to load wishlist:', error);
            dispatch(setWishlistItems([]));
        }
    }, [dispatch, userId]);

    const persistFavorites = useCallback((items) => {
        localStorage.setItem(`favorites:${userId}`, JSON.stringify(items));
    }, [userId]);

    const persistWishlist = useCallback((items) => {
        localStorage.setItem(`wishlist:${userId}`, JSON.stringify(items));
    }, [userId]);

    const isFavorite = useCallback(
        (courseId) => favorites.includes(courseId),
        [favorites]
    );

    const addFavorite = useCallback((courseId) => {
        if (!courseId || favorites.includes(courseId)) return;

        const updatedFavorites = [...favorites, courseId];
        dispatch(addToFavorites(courseId));
        persistFavorites(updatedFavorites);

        if (!enrolledCourses.includes(courseId) && !wishlistItems.includes(courseId)) {
            const updatedWishlist = [...wishlistItems, courseId];
            dispatch(addToWishlist(courseId));
            persistWishlist(updatedWishlist);
        }
    }, [dispatch, favorites, enrolledCourses, wishlistItems, persistFavorites, persistWishlist]);

    const removeFavorite = useCallback((courseId) => {
        if (!courseId || !favorites.includes(courseId)) return;

        const updatedFavorites = favorites.filter(id => id !== courseId);
        dispatch(removeFromFavorites(courseId));
        persistFavorites(updatedFavorites);

        if (wishlistItems.includes(courseId)) {
            const updatedWishlist = wishlistItems.filter(id => id !== courseId);
            dispatch(removeFromWishlist(courseId));
            persistWishlist(updatedWishlist);
        }
    }, [dispatch, favorites, wishlistItems, persistFavorites, persistWishlist]);

    const toggleFavorite = useCallback((courseId) => {
        if (!courseId) return;
        if (isFavorite(courseId)) {
            removeFavorite(courseId);
        } else {
            addFavorite(courseId);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    useEffect(() => {
        if (!wishlistInitialized) {
            return;
        }
        const filteredWishlist = wishlistItems.filter(id => !enrolledCourses.includes(id));
        if (filteredWishlist.length !== wishlistItems.length) {
            dispatch(setWishlistItems(filteredWishlist));
            persistWishlist(filteredWishlist);
        }
    }, [dispatch, enrolledCourses, persistWishlist, wishlistInitialized, wishlistItems]);

    return {
        favorites,
        wishlistItems,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite
    };
}
