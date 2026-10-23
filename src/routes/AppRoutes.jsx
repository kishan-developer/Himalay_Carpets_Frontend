import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // <-- use Navigate
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";

function AppRoutes() {
    const token = useSelector((s) => s.user?.token);
    const isLoading = useSelector((state) => state.user.isLoading);

    if (token && isLoading) {
        return <Loader />;
    }

    return (
        <Routes>
            {PublicRoutes}

            {/* User Routes */}
            {UserRoutes}

            {/* Admin Routes */}
            {AdminRoutes}

            {/* Fallbacks */}
            <Route path="/unauthorized" element={<h1>🚫 Unauthorized</h1>} />

            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;
