import {
    FiShoppingCart,
    FiArrowUp,
    FiArrowDown,
    FiSearch,
    FiFilter,
    FiX,
    FiCalendar,
    FiDollarSign,
    FiUser,
    FiPackage,
    FiCreditCard,
    FiTruck,
} from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Status Badge Component
const StatusBadge = ({ status, type = "delivery" }) => {
    const getStatusConfig = (status, type) => {
        const statusLower = status?.toLowerCase();

        if (type === "payment") {
            switch (statusLower) {
                case "paid":
                    return {
                        bg: "bg-emerald-50",
                        text: "text-emerald-700",
                        border: "border-emerald-200",
                        icon: "✓",
                    };
                case "pending":
                    return {
                        bg: "bg-amber-50",
                        text: "text-amber-700",
                        border: "border-amber-200",
                        icon: "⏳",
                    };
                case "failed":
                    return {
                        bg: "bg-red-50",
                        text: "text-red-700",
                        border: "border-red-200",
                        icon: "✗",
                    };
                default:
                    return {
                        bg: "bg-gray-50",
                        text: "text-gray-700",
                        border: "border-gray-200",
                        icon: "?",
                    };
            }
        }

        // Delivery status
        switch (statusLower) {
            case "delivered":
                return {
                    bg: "bg-emerald-50",
                    text: "text-emerald-700",
                    border: "border-emerald-200",
                    icon: "📦",
                };
            case "shipped":
                return {
                    bg: "bg-blue-50",
                    text: "text-blue-700",
                    border: "border-blue-200",
                    icon: "🚚",
                };
            case "out for delivery":
                return {
                    bg: "bg-purple-50",
                    text: "text-purple-700",
                    border: "border-purple-200",
                    icon: "🏃",
                };
            case "pending":
                return {
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    border: "border-amber-200",
                    icon: "⏳",
                };
            case "canceled":
                return {
                    bg: "bg-red-50",
                    text: "text-red-700",
                    border: "border-red-200",
                    icon: "❌",
                };
            default:
                return {
                    bg: "bg-gray-50",
                    text: "text-gray-700",
                    border: "border-gray-200",
                    icon: "?",
                };
        }
    };

    const config = getStatusConfig(status, type);

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
        >
            <span className="text-xs">{config.icon}</span>
            <span className="capitalize">{status}</span>
        </span>
    );
};

// Admin Orders Header Component
const AdminOrdersHeader = ({ totalOrders, filteredCount }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6"
    >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
                <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <FiShoppingCart size={24} className="text-blue-600" />
                    </div>
                    Orders Management
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                    Manage and track all customer orders from one place
                </p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                    {filteredCount}
                </div>
                <div className="text-sm text-gray-600">
                    {filteredCount === totalOrders
                        ? "Total Orders"
                        : `of ${totalOrders} orders`}
                </div>
            </div>
        </div>
    </motion.div>
);

// Order Filters Component
const OrderFilters = ({
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    toggleSort,
    deliveryFilter,
    setDeliveryFilter,
    paymentFilter,
    setPaymentFilter,
    hasActiveFilters,
    clearFilters,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
    >
        <div className="flex items-center gap-2 mb-4">
            <FiFilter size={18} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
                Filters & Search
            </h3>
            {hasActiveFilters && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="ml-auto flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                    <FiX size={14} />
                    Clear All
                </motion.button>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <div className="lg:col-span-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Search Orders
                </label>
                <div className="relative">
                    <FiSearch
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                    />
                    <input
                        type="text"
                        placeholder="Name, email, order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Sort Buttons */}
            <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Sort By
                </label>
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSort("totalAmount")}
                        className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                            sortField === "totalAmount"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <FiDollarSign size={14} />
                        Amount
                        {sortField === "totalAmount" &&
                            (sortOrder === "asc" ? (
                                <FiArrowUp size={12} />
                            ) : (
                                <FiArrowDown size={12} />
                            ))}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSort("createdAt")}
                        className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                            sortField === "createdAt"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <FiCalendar size={14} />
                        Date
                        {sortField === "createdAt" &&
                            (sortOrder === "asc" ? (
                                <FiArrowUp size={12} />
                            ) : (
                                <FiArrowDown size={12} />
                            ))}
                    </motion.button>
                </div>
            </div>

            {/* Delivery Filter */}
            <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Delivery Status
                </label>
                <select
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            {/* Payment Filter */}
            <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Payment Status
                </label>
                <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                    <option value="all">All Payments</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
        </div>
    </motion.div>
);

// Order Card Component
const OrderCard = ({
    order,
    onDeliveryUpdate,
    onPaymentUpdate,
    onNavigate,
}) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
        {/* Card Header - Clickable */}
        <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onNavigate(`/admin/orders/order/${order._id}`)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiPackage size={18} className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                            #{order.razorpay_order_id.slice(5, 10)}...
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">
                            ID: {order._id.slice(-8)}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                        ₹{order.totalAmount}
                    </div>
                    <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                        })}
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-2 mb-4">
                <FiUser size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700 capitalize">
                    {order.user?.firstName} {order.user?.lastName}
                </span>
            </div>

            {/* Current Status Display */}
            <div className="flex items-center justify-between">
                <StatusBadge status={order.deliveryStatus} type="delivery" />
                <StatusBadge status={order.paymentStatus} type="payment" />
            </div>
        </div>

        {/* Card Footer - Admin Controls */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="space-y-3">
                {/* Delivery Status Update */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        <FiTruck size={12} className="inline mr-1" />
                        Update Delivery
                    </label>
                    <select
                        value={order.deliveryStatus}
                        onChange={(e) =>
                            onDeliveryUpdate(order._id, e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">
                            Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                {/* Payment Status Update */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        <FiCreditCard size={12} className="inline mr-1" />
                        Update Payment
                    </label>
                    <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                            onPaymentUpdate(order._id, e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>
            </div>
        </div>
    </motion.div>
);

// Orders Grid Component
const OrdersGrid = ({
    orders,
    onDeliveryUpdate,
    onPaymentUpdate,
    navigate,
}) => {
    if (orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
            >
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiShoppingCart size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No Orders Found
                    </h3>
                    <p className="text-gray-600">
                        No orders match your current filters. Try adjusting your
                        search criteria.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
            {orders.map((order) => (
                <OrderCard
                    key={order._id}
                    order={order}
                    onDeliveryUpdate={onDeliveryUpdate}
                    onPaymentUpdate={onPaymentUpdate}
                    onNavigate={navigate}
                />
            ))}
        </motion.div>
    );
};

// Main Admin Orders Component
export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [deliveryFilter, setDeliveryFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch orders once
    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get("/admin/orders/all-orders")
            .then((res) => {
                setOrders(res.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                setLoading(false);
            });
    }, []);

    // Derive displayedOrders
    const displayedOrders = useMemo(() => {
        let result = [...orders];

        // 1) Search by name / email / razorpay_order_id
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            result = result.filter((o) => {
                const name = `${o.user?.firstName || ""} ${
                    o.user?.lastName || ""
                }`.toLowerCase();
                const email = (o.user?.email || "").toLowerCase();
                const razId = (o.razorpay_order_id || "").toLowerCase();
                return (
                    name.includes(term) ||
                    email.includes(term) ||
                    razId.includes(term)
                );
            });
        }

        // 2) Delivery filter
        if (deliveryFilter !== "all") {
            result = result.filter(
                (o) => o.deliveryStatus?.toLowerCase() === deliveryFilter
            );
        }

        // 3) Payment filter
        if (paymentFilter !== "all") {
            result = result.filter(
                (o) => o.paymentStatus?.toLowerCase() === paymentFilter
            );
        }

        // 4) Sorting
        if (sortField) {
            result.sort((a, b) => {
                const aVal = a[sortField];
                const bVal = b[sortField];
                if (aVal == null || bVal == null) return 0;
                if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
                else return aVal < bVal ? 1 : -1;
            });
        }

        return result;
    }, [
        orders,
        searchTerm,
        deliveryFilter,
        paymentFilter,
        sortField,
        sortOrder,
    ]);

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleDeliveryUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/admin/orders/order/${id}/status`, {
                status: newStatus,
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === id ? { ...o, deliveryStatus: newStatus } : o
                )
            );
        } catch (err) {
            console.error("Error updating delivery status:", err);
        }
    };

    const handlePaymentUpdate = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/payment/${id}/payment-status`, {
                paymentStatus: newStatus,
            });
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === id ? { ...o, paymentStatus: newStatus } : o
                )
            );
        } catch (err) {
            console.error("Error updating payment status:", err);
        }
    };

    const hasActiveFilters =
        deliveryFilter !== "all" ||
        paymentFilter !== "all" ||
        searchTerm.trim();

    const clearFilters = () => {
        setDeliveryFilter("all");
        setPaymentFilter("all");
        setSearchTerm("");
        setSortField(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-80 bg-gray-200 rounded-xl"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <AdminOrdersHeader
                        totalOrders={orders.length}
                        filteredCount={displayedOrders.length}
                    />

                    <OrderFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        toggleSort={toggleSort}
                        deliveryFilter={deliveryFilter}
                        setDeliveryFilter={setDeliveryFilter}
                        paymentFilter={paymentFilter}
                        setPaymentFilter={setPaymentFilter}
                        hasActiveFilters={hasActiveFilters}
                        clearFilters={clearFilters}
                    />

                    <OrdersGrid
                        orders={displayedOrders}
                        onDeliveryUpdate={handleDeliveryUpdate}
                        onPaymentUpdate={handlePaymentUpdate}
                        navigate={navigate}
                    />
                </motion.div>
            </div>
        </div>
    );
}
