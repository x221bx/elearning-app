import React, { useEffect } from "react";
import { Box } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/navbar";
import useCourses from "./hooks/useCourses";
import useTeachers from "./hooks/useTeachers";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
    const { seed: seedCourses } = useCourses();
    const { seed: seedTeachers } = useTeachers();

    useEffect(() => {
        seedTeachers();
        seedCourses();
    }, []);

    return (
        <NotificationProvider>
            <AuthProvider>
                <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
                    <Navbar />
                    <Box sx={{ height: 72 }} /> {/* Spacing for fixed navbar */}
                    <AppRoutes />
                </Box>
            </AuthProvider>
        </NotificationProvider>
    );
}
