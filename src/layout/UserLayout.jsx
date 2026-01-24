import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserAccountDashboard from "../pages/user/UserAccountDashboard";
import getCookieByName from "../utils/getCookie";
import authApis from "../services/api/auth/auth.apis";
import { handleAxiosError } from "../utils/handleAxiosError";

function UserLayout() {
    const navigate = useNavigate();
    const token = useSelector((state) => state?.user?.token);
    const role = useSelector((state) => state?.user?.user?.role);
    useEffect(() => {
        if (!token || role !== "user") {
            return navigate("/login");
        }
    }, [token]);

    if (!token || role !== "user") return null;
    // fetch All Others Data For Show In Of User
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />

            <main className="flex-1 overflow-x-hidden  place-content-center  overflow-y-auto ">
                <UserAccountDashboard>
                    <Outlet />
                </UserAccountDashboard>
            </main>

            <Footer />
        </div>
    );
}

export default UserLayout;
