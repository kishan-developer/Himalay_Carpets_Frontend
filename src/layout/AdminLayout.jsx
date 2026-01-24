import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AdminAccountDashboard from "../pages/admin/AdminAccountDashboard";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
function AdminLayout() {
    const navigate = useNavigate();
    const token = useSelector((state) => state?.user?.token);
    const role = useSelector((state) => state?.user?.user?.role);

    useEffect(() => {
        if (!token || role !== "admin") {
            return navigate("/login");
        }
    }, [token]);

    if (!token || role !== "admin") return null;
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <Header />
            <main className="flex-grow p-6">
                <AdminAccountDashboard>
                    <Outlet />
                </AdminAccountDashboard>
            </main>
            <Footer />
        </div>
    );
}

export default AdminLayout;
