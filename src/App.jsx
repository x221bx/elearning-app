// src/App.jsx
import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/navbar";
import useCourses from "./hooks/useCourses";
import useTeachers from "./hooks/useTeachers";

export default function App() {
    const { seed: seedCourses } = useCourses();
    const { seed: seedTeachers } = useTeachers();

    useEffect(() => {
         seedTeachers();
        seedCourses();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ height: 72 }} />
            <AppRoutes />
        </>
    );
}
