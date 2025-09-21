import React from "react";

import Navbar from "./components/common/navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
    return (
        <>
            <Navbar />
            <AppRoutes />
        </>
    );
}
