import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiShoppingBag,
    FiEye,
    FiPackage,
    FiTruck,
    FiClock,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOrders } from "../../../redux/slices/orderSlice";
import axiosInstance from "../../../utils/apiConnector";
import { useOrders } from "../../../hooks/useOrder";
import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../Constant";
import Loader from "../../../components/common/Loader";

function Orders() {
    const user = useSelector((state) => state.user.user);
    const orders = useOrders(user?._id);
    const dispatch = useDispatch();

    // Status Badge Component
    const StatusBadge = ({ status, type = "delivery" }) => {
        const getStatusStyle = (status) => {
            switch (status?.toLowerCase()) {
                case "delivered":
                    return {
                        color: "bg-green-50 text-green-700 border-green-200",
                        icon: <FiCheckCircle className="w-3 h-3" />,
                    };
                case "shipped":
                    return {
                        color: "bg-blue-50 text-blue-700 border-blue-200",
                        icon: <FiTruck className="w-3 h-3" />,
                    };
                case "pending":
                    return {
                        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
                        icon: <FiClock className="w-3 h-3" />,
                    };
                case "canceled":
                    return {
                        color: "bg-red-50 text-red-700 border-red-200",
                        icon: <FiXCircle className="w-3 h-3" />,
                    };
                case "paid":
                    return {
                        color: "bg-green-50 text-green-700 border-green-200",
                        icon: <FiCheckCircle className="w-3 h-3" />,
                    };
                default:
                    return {
                        color: "bg-gray-50 text-gray-700 border-gray-200",
                        icon: <FiPackage className="w-3 h-3" />,
                    };
            }
        };

        const statusStyle = getStatusStyle(status);
        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusStyle.color}`}
            >
                {statusStyle.icon}
                {status}
            </span>
        );
    };

    // Order Header Component
    const OrderHeader = ({ order }) => (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                {/* Order ID */}
                <div className="lg:col-span-2">
                    <p className="text-xs uppercase text-foreground font-semibold tracking-wider mb-1">
                        Order ID
                    </p>
                    <p className="text-sm font-bold text-foreground font-mono">
                        #{order?.razorpay_order_id || "N/A"}
                    </p>
                </div>

                {/* Date */}
                <div>
                    <p className="text-xs uppercase text-foreground font-semibold tracking-wider mb-1">
                        Order Date
                    </p>
                    <p className="text-sm text-foreground font-medium">
                        {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </p>
                </div>

                {/* Total */}
                <div>
                    <p className="text-xs uppercase text-foreground font-semibold tracking-wider mb-1">
                        Total Amount
                    </p>
                    <p className="text-lg font-bold text-foreground">
                        ₹{formatINR(order?.totalAmount)}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-xs uppercase text-foreground font-semibold tracking-wider mb-1">
                        Status
                    </p>
                    <StatusBadge status={order?.deliveryStatus} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                    <Link
                        to={`/account/orders/${order?._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-white text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors duration-200"
                    >
                        <FiEye className="w-4 h-4" />
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );

    // Price Breakdown Component
    const PriceBreakdown = ({ item }) => {
        const basePrice = item?.product?.price;
        const fallPicoPrice = item?.withFallPico ? FALLPICO_PRICE : 0;
        const tasselsPrice = item?.withTassels ? TASSELLS_PRICE : 0;
        const unitPrice = basePrice + fallPicoPrice + tasselsPrice;
        const totalPrice = unitPrice * item?.quantity;

        return (
            <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Base Price:</span>
                    <span className="font-medium text-foreground">
                        ₹{formatINR(basePrice)}
                    </span>
                </div>

                {item?.withFallPico && (
                    <div className="flex justify-between items-center">
                        <span className="text-foreground/70">+ Fall Pico:</span>
                        <span className="font-medium text-green-600">
                            ₹{FALLPICO_PRICE}
                        </span>
                    </div>
                )}

                {item?.withTassels && (
                    <div className="flex justify-between items-center">
                        <span className="text-foreground/70">+ Tassels:</span>
                        <span className="font-medium text-green-600">
                            ₹{TASSELLS_PRICE}
                        </span>
                    </div>
                )}

                <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                        <span className="text-foreground">Unit Price:</span>
                        <span className="text-foreground">
                            ₹{formatINR(unitPrice)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-foreground/70">
                        <span>Quantity:</span>
                        <span>×{item?.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg text-foreground">
                        <span>Subtotal:</span>
                        <span>₹{formatINR(totalPrice)}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Addon Tags Component
    const AddonTags = ({ item }) => {
        if (!item?.withFallPico && !item?.withTassels) return null;

        return (
            <div className="flex gap-2 mt-3">
                {item?.withFallPico && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Fall Pico (+₹{FALLPICO_PRICE})
                    </span>
                )}
                {item?.withTassels && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Tassels (+₹{TASSELLS_PRICE})
                    </span>
                )}
            </div>
        );
    };

    // Order Item Component
    const OrderItem = ({ item }) => {
        const navigate = useNavigate();
        return (
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 capitalize">
                <div className="flex-shrink-0 ">
                    <img
                        onClick={() =>
                            navigate(`/product/${item?.product?._id}`)
                        }
                        src={
                            item?.product?.images[0] ||
                            "/Product_Placeholder.webp"
                        }
                        alt={item.product?.name}
                        className="w-30 h-30 object-cover rounded-sm  border-gray-200 shadow-sm object-top cursor-pointer"
                    />
                </div>
                

                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-foreground mb-2">
                        {item?.product?.name}
                    </h4>

                    {/* <PriceBreakdown item={item} /> */}
                    <AddonTags item={item} />
                </div>
            </div>
        );
    };

    // Order Footer Component
    const OrderFooter = ({ order }) => (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FiPackage className="w-4 h-4" />
                        Shipping Address
                    </h5>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <p className="text-sm text-foreground leading-relaxed">
                            {order?.shippingAddress?.street ||
                                order?.shippingAddressSnapshot?.street}
                            <br />
                            {order?.shippingAddress?.city ||
                                order?.shippingAddressSnapshot?.city}
                            ,{" "}
                            {order?.shippingAddress?.state ||
                                order?.shippingAddressSnapshot?.state}
                            <br />
                            {order?.shippingAddress?.postalCode ||
                                order?.shippingAddressSnapshot?.postalCode}
                            ,{" "}
                            {order?.shippingAddress?.country ||
                                order?.shippingAddressSnapshot?.country}
                            <br />
                            <span className="font-medium">
                                Phone:{" "}
                                {order?.shippingAddress?.phone ||
                                    order?.shippingAddressSnapshot?.phone}
                            </span>
                        </p>
                    </div>
                </div>

                <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4" />
                        Payment Information
                    </h5>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="space-y-2 text-sm">
                            {order?.paymentMethod && (
                                <div className="flex justify-between">
                                    <span className="text-foreground/70">
                                        Method:
                                    </span>
                                    <span className="font-medium text-foreground capitalize">
                                        {order?.paymentMethod}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-foreground/70">
                                    Status:
                                </span>
                                <StatusBadge
                                    status={order?.paymentStatus}
                                    type="payment"
                                />
                            </div>
                            {order.paidAt && (
                                <div className="flex justify-between">
                                    <span className="text-foreground/70">
                                        Paid on:
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {new Date(
                                            order?.paidAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Empty State Component
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200"
        >
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <FiShoppingBag className="w-8 h-8 text-foreground/50" />
            </div>
            <p className="text-foreground text-lg font-medium mb-2">
                No orders found
            </p>
            <p className="text-foreground/70 text-sm">
                Start shopping to see your orders here.
            </p>
        </motion.div>
    );

    // Order Card Component
    const OrderCard = ({ order, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
            <OrderHeader order={order} />

            {/* Items Section */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FiPackage className="w-4 h-4 text-foreground" />
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Items ({order?.items?.length})
                    </h3>
                </div>
                <div className="space-y-4">
                    {order?.items?.map((item) => (
                        <OrderItem key={item._id} item={item} />
                    ))}
                </div>
            </div>

            <OrderFooter order={order} />
        </motion.div>
    );

    // Format INR
    const formatINR = (amount) =>
        (amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground">
                    <div className="p-2 bg-foreground/10 rounded-lg">
                        <FiShoppingBag className="w-6 h-6 text-foreground" />
                    </div>
                    Order History
                </h2>
                <div className="text-sm text-foreground/70 bg-foreground/5 px-3 py-1 rounded-full">
                    {orders?.length} {orders?.length === 1 ? "Order" : "Orders"}
                </div>
            </div>

            {/* Orders List */}

            {!orders ? (
                <div className="flex items-center justify-center py-24">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-foreground rounded-full animate-spin" />
                </div>
            ) : orders.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-6">
                    {orders?.map((order, index) => (
                        <OrderCard
                            key={order?._id}
                            order={order}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default Orders;
