// src/hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectIsAdmin, setCredentials, logout } from "../redux/slices/authSlice";

export default function useAuth() {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const isAdmin = useSelector(selectIsAdmin);

    return {
        auth,
        isAdmin,
        setCredentials: (u) => dispatch(setCredentials(u)),
        logout: () => dispatch(logout()),
    };
}
