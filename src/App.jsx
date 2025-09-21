import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/common/navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

function AppContent() {
    const theme = useSelector((state) => state.theme);

    useEffect(() => {
        document.body.className = theme === "light" ? "light-theme" : "dark-theme";
    }, [theme]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </>
    );
}

export default AppContent;
