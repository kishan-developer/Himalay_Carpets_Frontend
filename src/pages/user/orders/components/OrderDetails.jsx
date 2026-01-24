// import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../../Constant";
// import ReceiptPreview from "../../../../components/common/ReceiptPreview";

// const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//         opacity: 1,
//         y: 0,
//         transition: { delay: i * 0.2, duration: 0.4 },
//     }),
// };

// const StatusBadge = ({ status, type = "default" }) => {
//     const color = status?.toLowerCase();
//     const getColor = () => {
//         if (type === "payment") {
//             if (color === "paid")
//                 return "bg-emerald-50 text-emerald-700 border-emerald-200";
//             if (color === "failed" || color === "pending")
//                 return "bg-red-50 text-red-700 border-red-200";
//             return "bg-gray-50 text-gray-700 border-gray-200";
//         }
//         if (color === "delivered")
//             return "bg-emerald-50 text-emerald-700 border-emerald-200";
//         if (color === "shipped" || color === "out for delivery")
//             return "bg-blue-50 text-blue-700 border-blue-200";
//         if (color === "pending")
//             return "bg-amber-50 text-amber-700 border-amber-200";
//         if (color === "canceled")
//             return "bg-red-50 text-red-700 border-red-200";
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     };
//     return (
//         <span
//             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getColor()}`}
//         >
//             {status}
//         </span>
//     );
// };

// const OrderHeader = ({ order }) => (
//     <motion.div
//         custom={0}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
//     >
//         <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
//                 Order Details
//             </h1>
//             <p className="text-sm text-gray-600">
//                 Order ID:{" "}
//                 <span className="font-mono font-medium">
//                     {order.razorpay_order_id}
//                 </span>
//             </p>
//         </div>
//         <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
//             <Link
//                 to="/account/orders"
//                 className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
//             >
//                 <FiArrowLeft size={16} /> Back to Orders
//             </Link>
//         </motion.div>
//     </motion.div>
// );

// const OrderOverview = ({ order, formatINR }) => (
//     <motion.div
//         custom={1}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6"
//     >
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {/* Order Date */}
//             <div className="space-y-1">
//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                     Order Date
//                 </p>
//                 <p className="text-sm font-medium text-foreground">
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                     })}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                     {new Date(order.createdAt).toLocaleTimeString("en-IN", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                     })}
//                 </p>
//             </div>

//             {/* Total & Coupon */}
//             <div className="space-y-1">
//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                     Total Amount
//                 </p>
//                 <p className="text-xl font-bold text-foreground">
//                     ₹{formatINR(order.totalAmount)}
//                 </p>
//                 {order.discount > 0 && (
//                     <p className="text-sm font-semibold text-red-600">
//                         Coupon Discount: - ₹{formatINR(order.discount)}
//                     </p>
//                 )}
//             </div>

//             {/* Payment Status */}
//             <div className="space-y-1">
//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                     Payment Status
//                 </p>
//                 <StatusBadge status={order.paymentStatus} type="payment" />
//             </div>

//             {/* Delivery Status */}
//             <div className="space-y-1">
//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                     Delivery Status
//                 </p>
//                 <StatusBadge status={order.deliveryStatus} />
//             </div>
//         </div>
//     </motion.div>
// );

// const ProductItem = ({ item, index, formatINR, order }) => {
//     const navigate = useNavigate();
//     const basePrice = item.product?.price;
//     const offerPct = order?.offer || 0;
//     const isOffer = item.product?.isOfferAplied;
//     const offerDiscount = isOffer ? (basePrice * offerPct) / 100 : 0;
//     const priceAfterOffer = basePrice - offerDiscount;
//     const addons =
//         (item.withFallPico ? FALLPICO_PRICE : 0) +
//         (item.withTassels ? TASSELLS_PRICE : 0);
//     const finalUnit = priceAfterOffer + addons;
//     const grossTotal = finalUnit * item.quantity;

//     return (
//         <motion.div
//             key={index}
//             whileHover={{ scale: 1.01 }}
//             transition={{ duration: 0.2 }}
//             className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md"
//         >
//             <div className="flex flex-col sm:flex-row gap-6">
//                 <div className="flex-shrink-0">
//                     <img
//                         // onClick={() => navigate(`/product/${item?.product?._id}`)}
//                         src={
//                             item?.product?.images[0] ||
//                             "/Product_Placeholder.webp"
//                         }
//                         alt={item?.product?.name}
//                         className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm cursor-pointer"
//                     />
//                 </div>
//                 <div className="flex-1 space-y-4 text-sm text-gray-700">
//                     <div>
//                         <h4 className="text-lg font-semibold text-gray-800 capitalize">
//                             {item?.product?.name}
//                         </h4>
//                         <div className="flex gap-4 mt-1 text-xs text-gray-500">
//                             <span>
//                                 Product ID: <code>{item?.product?._id}</code>
//                             </span>
//                             <span>
//                                 Qty: <strong>{item?.quantity}</strong>
//                             </span>
//                         </div>
//                     </div>

//                     <div className="bg-gray-50 rounded-lg p-4 space-y-4">
//                         <h5 className="text-sm font-bold text-gray-900">
//                             🧾 Price Summary
//                         </h5>
//                         <div className="space-y-1">
//                             <p className="font-semibold text-gray-700">
//                                 Base Price
//                             </p>
//                             <div className="flex justify-between">
//                                 <span>Price per unit</span>
//                                 <span>₹{formatINR(basePrice)}</span>
//                             </div>
//                             {isOffer ? (
//                                 <>
//                                     <div className="flex justify-between text-green-600">
//                                         <span>
//                                             Offer Discount ({offerPct}%)
//                                         </span>
//                                         <span>
//                                             - ₹{formatINR(offerDiscount)}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between font-medium">
//                                         <span>Price After Offer</span>
//                                         <span>
//                                             ₹{formatINR(priceAfterOffer)}
//                                         </span>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="flex justify-between font-medium text-gray-600">
//                                     <span>No Offer</span>
//                                     <span>₹{formatINR(priceAfterOffer)}</span>
//                                 </div>
//                             )}
//                         </div>

//                         {(item?.withFallPico || item?.withTassels) && (
//                             <div className="space-y-1 pt-2">
//                                 <p className="font-semibold text-gray-700">
//                                     Add-ons
//                                 </p>
//                                 {item?.withFallPico && (
//                                     <div className="flex justify-between">
//                                         <span>+ Fall Pico</span>
//                                         <span>+ ₹{FALLPICO_PRICE}</span>
//                                     </div>
//                                 )}
//                                 {item?.withTassels && (
//                                     <div className="flex justify-between">
//                                         <span>+ Tassels</span>
//                                         <span>+ ₹{TASSELLS_PRICE}</span>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         <div className="border-t pt-2 space-y-1">
//                             <p className="font-semibold text-gray-700">
//                                 Final Unit Price
//                             </p>
//                             <div className="flex justify-between font-medium">
//                                 <span>Final Price</span>
//                                 <span>₹{formatINR(finalUnit)}</span>
//                             </div>
//                         </div>
//                         <div className="border-t pt-2 space-y-1">
//                             <p className="font-semibold text-gray-700">
//                                 Gross Total
//                             </p>
//                             <div className="flex justify-between font-bold text-gray-800">
//                                 <span>
//                                     {item?.quantity} × ₹{formatINR(finalUnit)}
//                                 </span>
//                                 <span>₹{formatINR(grossTotal)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// const ShippingInfo = ({ order }) => (
//     <motion.div
//         custom={3}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="space-y-4"
//     >
//         <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
//             <FiTruck size={20} /> Shipping Information
//         </h3>
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//             <div className="space-y-4">
//                 <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                         Delivery Address
//                     </p>
//                     <div className="text-sm text-foreground space-y-1">
//                         <p className="leading-relaxed">
//                             {order?.shippingAddress?.street ||
//                                 order?.shippingAddressSnapshot?.street}
//                             <br />
//                             {order?.shippingAddress?.city ||
//                                 order?.shippingAddressSnapshot?.city}
//                             ,{" "}
//                             {order?.shippingAddress?.state ||
//                                 order?.shippingAddressSnapshot?.state}
//                             <br />
//                             {order?.shippingAddress?.postalCode ||
//                                 order?.shippingAddressSnapshot?.postalCode}
//                             ,{" "}
//                             {order?.shippingAddress?.country ||
//                                 order?.shippingAddressSnapshot?.country}
//                             <br />
//                             <span className="font-medium">
//                                 Phone:{" "}
//                                 {order?.shippingAddress?.phone ||
//                                     order?.shippingAddressSnapshot?.phone}
//                             </span>
//                         </p>
//                     </div>
//                 </div>
//                 {order?.deliveredAt && (
//                     <div className="pt-4 border-t">
//                         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                             Delivered At
//                         </p>
//                         <p className="text-sm font-medium text-foreground">
//                             {new Date(order.deliveredAt).toLocaleString(
//                                 "en-IN"
//                             )}
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </motion.div>
// );

// const PaymentInfo = ({ order }) => (
//     <motion.div
//         custom={4}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="space-y-4"
//     >
//         <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
//             <FiCreditCard size={20} /> Payment Information
//         </h3>
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                         Payment Method
//                     </p>
//                     <p className="text-sm font-medium text-foreground capitalize">
//                         {order?.paymentMethod}
//                     </p>
//                 </div>
//                 <div>
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                         Payment Status
//                     </p>
//                     <StatusBadge status={order?.paymentStatus} type="payment" />
//                 </div>
//                 {order.paidAt && (
//                     <div className="sm:col-span-2 pt-4 border-t">
//                         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
//                             Payment Date
//                         </p>
//                         <p className="text-sm font-medium text-foreground">
//                             {new Date(order.paidAt).toLocaleString("en-IN")}
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </motion.div>
// );

// function OrderDetails() {
//     const { orderId } = useParams();
//     const myOrders = useSelector((state) => state.order.orders) || [];
//     const order = myOrders.find((o) => o._id === orderId);

//     const formatINR = (amount) =>
//         (amount || 0).toLocaleString("en-IN", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         });

//     if (!order) {
//         return (
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-center py-16"
//             >
//                 <div className="max-w-md mx-auto">
//                     <FiPackage
//                         size={48}
//                         className="mx-auto text-gray-400 mb-4"
//                     />
//                     <h2 className="text-xl font-semibold text-foreground mb-2">
//                         Order Not Found
//                     </h2>
//                     <p className="text-gray-600 mb-6">
//                         The order you're looking for doesn't exist or may have
//                         been removed.
//                     </p>
//                     <motion.div
//                         whileHover={{ x: -5 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <Link
//                             to="/account/orders"
//                             className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                         >
//                             <FiArrowLeft size={16} /> Back to Orders
//                         </Link>
//                     </motion.div>
//                 </div>
//             </motion.div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-8"
//                 >
//                     <OrderHeader order={order} />
//                     <OrderOverview order={order} formatINR={formatINR} />

//                     <motion.div
//                         custom={2}
//                         initial="hidden"
//                         animate="visible"
//                         variants={sectionVariants}
//                         className="space-y-4"
//                     >
//                         <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
//                             <FiPackage size={20} /> Products (
//                             {order.items.length})
//                         </h3>
//                         <div className="space-y-4">
//                             {order.items.map((item, idx) => (
//                                 <ProductItem
//                                     key={idx}
//                                     item={item}
//                                     index={idx}
//                                     order={order}
//                                     formatINR={formatINR}
//                                 />
//                             ))}
//                         </div>
//                     </motion.div>

//                     <ShippingInfo order={order} />
//                     <PaymentInfo order={order} />
//                     <ReceiptPreview imageUrl={order?.delhiveryReceipt} />
//                 </motion.div>
//             </div>
//         </div>
//     );
// }

// export default OrderDetails;



// 2 Aug


// import { useParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../../Constant";
// import ReceiptPreview from "../../../../components/common/ReceiptPreview";

// const sectionVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//         opacity: 1,
//         y: 0,
//         transition: { delay: i * 0.2, duration: 0.4 },
//     }),
// };

// const StatusBadge = ({ status, type = "default" }) => {
//     const clr = (status || "").toLowerCase();
//     let cls = "bg-gray-50 text-gray-700 border-gray-200";
//     if (type === "payment") {
//         cls =
//             clr === "paid"
//                 ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                 : ["failed", "pending"].includes(clr)
//                 ? "bg-red-50 text-red-700 border-red-200"
//                 : cls;
//     } else {
//         cls =
//             clr === "delivered"
//                 ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                 : ["shipped", "out for delivery"].includes(clr)
//                 ? "bg-blue-50 text-blue-700 border-blue-200"
//                 : clr === "pending"
//                 ? "bg-amber-50 text-amber-700 border-amber-200"
//                 : clr === "canceled"
//                 ? "bg-red-50 text-red-700 border-red-200"
//                 : cls;
//     }
//     return (
//         <span
//             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${cls}`}
//         >
//             {status || "N/A"}
//         </span>
//     );
// };

// const OrderHeader = ({ order }) => (
//     <motion.div
//         custom={0}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4"
//     >
//         <div className="text-center sm:text-left">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
//                 Order Details
//             </h1>
//             <p className="text-sm text-gray-600">
//                 Order ID:{" "}
//                 <span className="font-mono">
//                     {order?.razorpay_order_id || "N/A"}
//                 </span>
//             </p>
//         </div>
//         <Link
//             to="/account/orders"
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:underline"
//         >
//             <FiArrowLeft size={16} /> Back to Orders
//         </Link>
//     </motion.div>
// );

// const OrderOverview = ({ order, formatINR }) => (
//     <motion.div
//         custom={1}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mx-4"
//     >
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//             <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">
//                     Order Date
//                 </p>
//                 <p className="text-sm font-medium text-gray-800">
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                     })}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                     {new Date(order.createdAt).toLocaleTimeString("en-IN", {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                     })}
//                 </p>
//             </div>
//             <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">
//                     Total Amount
//                 </p>
//                 <p className="text-xl font-bold text-gray-800">
//                     ₹{formatINR(order.totalAmount)}
//                 </p>
//                 {order.discount > 0 && (
//                     <p className="text-sm font-semibold text-red-600">
//                         Coupon Discount: - ₹{formatINR(order.discount)}
//                     </p>
//                 )}
//             </div>
//             <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">
//                     Payment Status
//                 </p>
//                 <StatusBadge status={order.paymentStatus} type="payment" />
//             </div>
//             <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">
//                     Delivery Status
//                 </p>
//                 <StatusBadge status={order.deliveryStatus} />
//             </div>
//         </div>
//     </motion.div>
// );

// const ProductItem = ({ item, formatINR }) => {
//     const basePrice = item.product?.price || 0;
//     const isOffer = item.product?.isOfferAplied;
//     const pct = isOffer ? item.product?.offerDiscount || 0 : 0;
//     const offerAmt = isOffer ? (basePrice * pct) / 100 : 0;
//     const priceAfter = basePrice - offerAmt;
//     const addons =
//         (item.withFallPico ? FALLPICO_PRICE : 0) +
//         (item.withTassels ? TASSELLS_PRICE : 0);
//     const unitPrice = priceAfter + addons;
//     const qty = item.quantity || 0;
//     const gross = unitPrice * qty;

//     return (
//         <motion.div
//             whileHover={{ scale: 1.01 }}
//             transition={{ duration: 0.2 }}
//             className="bg-white border border-gray-200 rounded-xl p-2 sm:p-6 mx-4"
//         >
//             <div className="flex flex-col sm:flex-row gap-4">
//                 <Link to={`/product/${item.product?._id}`} className="shrink-0">
//                     <img
//                         src={
//                             item.product?.images?.[0] ||
//                             "/Product_Placeholder.webp"
//                         }
//                         alt={item.product?.name || "Product image"}
//                         className="w-full h-36 sm:w-28 sm:h-28 object-cover rounded-md"
//                     />
//                 </Link>
//                 <div className="flex-1 space-y-2 text-sm text-gray-700">
//                     <h4 className="text-lg font-semibold text-gray-800 capitalize">
//                         {item.product?.name || "Unnamed Product"}
//                     </h4>
//                     <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
//                         <span>
//                             Qty: <strong>{qty}</strong>
//                         </span>
//                         <span>
//                             ID: <code>{item.product?._id || "N/A"}</code>
//                         </span>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                         <p className="font-semibold">
//                             Base Price: ₹{formatINR(basePrice)}
//                         </p>
//                         {isOffer && pct > 0 ? (
//                             <>
//                                 <p className="text-green-600">
//                                     Offer {pct}% → -₹{formatINR(offerAmt)}
//                                 </p>
//                                 <p>After Offer: ₹{formatINR(priceAfter)}</p>
//                             </>
//                         ) : (
//                             <p className="text-gray-600">
//                                 No Offer → ₹{formatINR(priceAfter)}
//                             </p>
//                         )}
//                         {addons > 0 && <p>Add‑ons: +₹{formatINR(addons)}</p>}
//                         <p className="font-bold">
//                             Unit Price: ₹{formatINR(unitPrice)}
//                         </p>
//                         <p>
//                             Total: {qty} × ₹{formatINR(unitPrice)} = ₹
//                             {formatINR(gross)}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// const ShippingInfo = ({ order }) => (
//     <motion.div
//         custom={3}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="space-y-4 px-4"
//     >
//         <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
//             <FiTruck size={20} /> Shipping Information
//         </h3>
//         <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm space-y-2">
//             <p>
//                 {order.shippingAddress?.street ||
//                     order.shippingAddressSnapshot?.street}
//             </p>
//             <p>
//                 {order.shippingAddress?.city ||
//                     order.shippingAddressSnapshot?.city}
//                 ,{" "}
//                 {order.shippingAddress?.state ||
//                     order.shippingAddressSnapshot?.state}
//             </p>
//             <p>
//                 {order.shippingAddress?.postalCode ||
//                     order.shippingAddressSnapshot?.postalCode}
//                 ,{" "}
//                 {order.shippingAddress?.country ||
//                     order.shippingAddressSnapshot?.country}
//             </p>
//             <p>
//                 Phone:{" "}
//                 {order.shippingAddress?.phone ||
//                     order.shippingAddressSnapshot?.phone}
//             </p>
//             {order.deliveredAt && (
//                 <p className="text-sm text-gray-600">
//                     Delivered At:{" "}
//                     {new Date(order.deliveredAt).toLocaleString("en-IN")}
//                 </p>
//             )}
//         </div>
//     </motion.div>
// );

// const PaymentInfo = ({ order }) => (
//     <motion.div
//         custom={4}
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         className="space-y-4 px-4"
//     >
//         <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
//             <FiCreditCard size={20} /> Payment Information
//         </h3>
//         <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm space-y-2">
//             <p>Method: {order.paymentMethod || "N/A"}</p>
//             <p>
//                 Status:{" "}
//                 <StatusBadge status={order.paymentStatus} type="payment" />
//             </p>
//             {order.paidAt && (
//                 <p className="text-sm text-gray-600">
//                     Paid At: {new Date(order.paidAt).toLocaleString("en-IN")}
//                 </p>
//             )}
//         </div>
//     </motion.div>
// );

// export default function OrderDetails() {
//     const { orderId } = useParams();
//     const order = useSelector((state) => state.order.orders || []).find(
//         (o) => o._id === orderId
//     );
//     const formatINR = (amt) =>
//         (amt || 0).toLocaleString("en-IN", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         });

//     if (!order) {
//         return (
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-center py-16"
//             >
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                     Order Not Found
//                 </h2>
//                 <Link
//                     to="/account/orders"
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                     <FiArrowLeft size={16} /> Back to Orders
//                 </Link>
//             </motion.div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-4xl mx-auto space-y-8">
//                 <OrderHeader order={order} />
//                 <OrderOverview order={order} formatINR={formatINR} />
//                 <motion.div
//                     custom={2}
//                     initial="hidden"
//                     animate="visible"
//                     variants={sectionVariants}
//                     className="space-y-4 px-0"
//                 >
//                     <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
//                         <FiPackage size={20} /> Products (
//                         {order.items?.length || 0})
//                     </h3>
//                     <div className="space-y-4">
//                         {order.items.map((item, idx) => (
//                             <ProductItem
//                                 key={idx}
//                                 item={item}
//                                 formatINR={formatINR}
//                             />
//                         ))}
//                     </div>
//                 </motion.div>
//                 <ShippingInfo order={order} />
//                 <PaymentInfo order={order} />
//                 <div className="px-4">
//                     <ReceiptPreview imageUrl={order.delhiveryReceipt} />
//                 </div>
//             </div>
//         </div>
//     );
// }




/// 4 Aug

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage, FiTruck, FiCreditCard } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../../Constant";
import ReceiptPreview from "../../../../components/common/ReceiptPreview";

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.4 },
    }),
};

const StatusBadge = ({ status, type = "default" }) => {
    const clr = (status || "").toLowerCase();
    let cls = "bg-gray-50 text-gray-700 border-gray-200";
    if (type === "payment") {
        cls =
            clr === "paid"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : ["failed", "pending"].includes(clr)
                ? "bg-red-50 text-red-700 border-red-200"
                : cls;
    } else {
        cls =
            clr === "delivered"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : ["shipped", "out for delivery"].includes(clr)
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : clr === "pending"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : clr === "canceled"
                ? "bg-red-50 text-red-700 border-red-200"
                : cls;
    }
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${cls}`}
        >
            {status || "N/A"}
        </span>
    );
};

const OrderHeader = ({ order }) => (
    <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4"
    >
        <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                Order Details
            </h1>
            <p className="text-sm text-gray-600">
                Order ID:{" "}
                <span className="font-mono">
                    {order?.razorpay_order_id || "N/A"}
                </span>
            </p>
        </div>
        <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:underline"
        >
            <FiArrowLeft size={16} /> Back to Orders
        </Link>
    </motion.div>
);

const OrderOverview = ({ order, formatINR }) => (
    <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mx-4"
    >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                    Order Date
                </p>
                <p className="text-sm font-medium text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
                <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                    Total Amount
                </p>
                <p className="text-xl font-bold text-gray-800">
                    ₹{formatINR(order.totalAmount)}
                </p>
                {order.discount > 0 && (
                    <p className="text-sm font-semibold text-red-600">
                        Coupon Discount: - ₹{formatINR(order.discount)}
                    </p>
                )}
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                    Payment Status
                </p>
                <StatusBadge status={order.paymentStatus} type="payment" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                    Delivery Status
                </p>
                <StatusBadge status={order.deliveryStatus} />
            </div>
        </div>
    </motion.div>
);

const ProductItem = ({ item, formatINR }) => {
    const basePrice = item.product?.price || 0;
    const isOffer = item.product?.isOfferAplied;
    const pct = isOffer ? item.product?.offerDiscount || 0 : 0;
    const offerAmt = isOffer ? (basePrice * pct) / 100 : 0;
    const priceAfter = basePrice - offerAmt;
    const addons =
        (item.withFallPico ? FALLPICO_PRICE : 0) +
        (item.withTassels ? TASSELLS_PRICE : 0);
    const unitPrice = priceAfter + addons;
    const qty = item.quantity || 0;
    const gross = unitPrice * qty;


    
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-2 sm:p-6 mx-4"
        >
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/product/${item.product?._id}`} className="shrink-0">
                    <img
                        src={
                            item.product?.images?.[0] ||
                            "/Product_Placeholder.webp"
                        }
                        alt={item.product?.name || "Product image"}
                        className="w-full h-36 sm:w-28 sm:h-28 object-cover rounded-md"
                    />
                </Link>
                <div className="flex-1 space-y-2 text-sm text-gray-700">
                    <h4 className="text-lg font-semibold text-gray-800 capitalize">
                        {item.product?.name || "Unnamed Product"}
                    </h4>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                        <span>
                            Qty: <strong>{qty}</strong>
                        </span>
                        <span>
                            ID: <code>{item.product?._id || "N/A"}</code>
                        </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p className="font-semibold">
                            Base Price: ₹{formatINR(basePrice)}
                        </p>
                        {isOffer && pct > 0 ? (
                            <>
                                <p className="text-green-600">
                                    Offer {pct}% → -₹{formatINR(offerAmt)}
                                </p>
                                <p>After Offer: ₹{formatINR(priceAfter)}</p>
                            </>
                        ) : (
                            <p className="text-gray-600">
                                No Offer → ₹{formatINR(priceAfter)}
                            </p>
                        )}
                        {addons > 0 && <p>Add‑ons: +₹{formatINR(addons)}</p>}
                        <p className="font-bold">
                            Unit Price: ₹{formatINR(unitPrice)}
                        </p>
                        <p>
                            Total: {qty} × ₹{formatINR(unitPrice)} = ₹
                            {formatINR(gross)}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ShippingInfo = ({ order }) => (
    <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4 px-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <FiTruck size={20} /> Shipping Information
        </h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm space-y-2">
            <p>
                {order.shippingAddress?.street ||
                    order.shippingAddressSnapshot?.street}
            </p>
            <p>
                {order.shippingAddress?.city ||
                    order.shippingAddressSnapshot?.city}
                ,{" "}
                {order.shippingAddress?.state ||
                    order.shippingAddressSnapshot?.state}
            </p>
            <p>
                {order.shippingAddress?.postalCode ||
                    order.shippingAddressSnapshot?.postalCode}
                ,{" "}
                {order.shippingAddress?.country ||
                    order.shippingAddressSnapshot?.country}
            </p>
            <p>
                Phone:{" "}
                {order.shippingAddress?.phone ||
                    order.shippingAddressSnapshot?.phone}
            </p>
            {order.deliveredAt && (
                <p className="text-sm text-gray-600">
                    Delivered At:{" "}
                    {new Date(order.deliveredAt).toLocaleString("en-IN")}
                </p>
            )}
        </div>
    </motion.div>
);

const PaymentInfo = ({ order }) => (
    <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="space-y-4 px-4"
    >
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <FiCreditCard size={20} /> Payment Information
        </h3>
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm space-y-2">
            <p>Method: {order.paymentMethod || "N/A"}</p>
            <p>
                Status:{" "}
                <StatusBadge status={order.paymentStatus} type="payment" />
            </p>
            {order.paidAt && (
                <p className="text-sm text-gray-600">
                    Paid At: {new Date(order.paidAt).toLocaleString("en-IN")}
                </p>
            )}
        </div>
    </motion.div>
);

export default function OrderDetails() {
    const { orderId } = useParams();
    const order = useSelector((state) => state.order.orders || []).find(
        (o) => o._id === orderId
    );
    const formatINR = (amt) =>
        (amt || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    if (!order) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Order Not Found
                </h2>
                <Link
                    to="/account/orders"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <FiArrowLeft size={16} /> Back to Orders
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <OrderHeader order={order} />
                <OrderOverview order={order} formatINR={formatINR} />
                <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    className="space-y-4 px-0"
                >
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                        <FiPackage size={20} /> Products (
                        {order.items?.length || 0})
                    </h3>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <ProductItem
                                key={idx}
                                item={item}
                                formatINR={formatINR}
                            />
                        ))}
                    </div>
                </motion.div>
                <ShippingInfo order={order} />
                <PaymentInfo order={order} />
                <div className="px-4">
                    <ReceiptPreview
                        imageUrl={order.delhiveryReceipt}
                        trackingId={order?.trackingId}
                        parcelWeight={order?.parcelWeight}
                        deliveryPartner={order?.deliveryPartner}
                    />
                </div>
            </div>
        </div>
    );
}
