import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FiShoppingBag, FiMapPin, FiCreditCard } from "react-icons/fi";
import { useEffect } from "react";
import { setOrders } from "../../../redux/slices/orderSlice";
import axiosInstance from "../../../utils/apiConnector";
import { useOrders } from "../../../hooks/useOrder";

export default function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user) || {};
    const orders = useOrders(user?._id);

    // derive dashboard stats from orders
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const savedAddresses = (user.shippingAddress || []).length;

    // get two most recent by createdAt
    const recent = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* Welcome */}
            <div className="bg-foreground text-white p-6 shadow-lg rounded-md">
                <h2 className="text-2xl font-semibold uppercase tracking-wide">
                    Welcome, {user.firstName} {user.lastName}!
                </h2>
                <p className="text-gray-200 mt-2">
                    Member since {formatDate(user.createdAt)}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm uppercase text-foreground tracking-wide">
                        Total Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                        {totalOrders}
                    </p>
                </div>
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm uppercase text-foreground tracking-wide">
                        Total Spent
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                        ₹
                        {totalSpent.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <div className="p-4 border border-gray-200 bg-white rounded-md shadow-sm">
                    <p className="text-sm uppercase text-foreground tracking-wide">
                        Saved Addresses
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                        {savedAddresses}
                    </p>
                </div>
            </div>

            {/* Recent Orders */}
            {/* <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-semibold uppercase text-foreground tracking-wide">
                    <FiShoppingBag size={20} /> Recent Orders
                </h3>
                {recent.length === 0 ? (
                    <p className="text-foreground text-sm">No recent orders.</p>
                ) : (
                    <div className="space-y-3">
                        {recent.map((o) => (
                            <motion.div
                                key={o._id}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 border border-foreground/20 bg-white rounded-md shadow-sm"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                                    <div>
                                        <p className="text-xs uppercase text-foreground/70">
                                            Order ID
                                        </p>
                                        <p className="text-sm text-foreground mt-1">
                                            {o.razorpay_order_id ||
                                                o._id.slice(-6)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-foreground/70">
                                            Date
                                        </p>
                                        <p className="text-sm text-foreground mt-1">
                                            {formatDate(o.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-foreground/70">
                                            Total
                                        </p>
                                        <p className="text-sm text-foreground mt-1">
                                            ₹
                                            {o.totalAmount.toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-foreground/70">
                                            Status
                                        </p>
                                        <p
                                            className={`text-sm mt-1 capitalize ${
                                                o.deliveryStatus === "Delivered"
                                                    ? "text-green-600"
                                                    : o.deliveryStatus ===
                                                      "Shipped"
                                                    ? "text-blue-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            {o.deliveryStatus}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-foreground mt-2">
                                    Items:{" "}
                                    {o.items
                                        .map((it) => it.product?.name)
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div> */}
        </motion.div>
    );
}
