import React from "react";
import { motion } from "framer-motion";
import { FALLPICO_PRICE, TASSELLS_PRICE } from "../../../../Constant";
import { useSelector } from "react-redux";

const OrderSummary = React.memo(function OrderSummary({
    cartItems,
    subtotal,
    gst,
    total,
}) {
    const discountPercentage = useSelector(
        (state) => state?.cart?.discountPercentage
    );
    const discount = (subtotal * discountPercentage) / 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 p-3 sm:p-4 md:p-6 border shadow-sm"
        >
            <h2 className="text-xs sm:text-sm md:text-base font-medium uppercase text-foreground mb-3 sm:mb-4">
                Order Summary
            </h2>
            <div className="space-y-4 text-xs sm:text-sm md:text-base">
                {/* Itemized Breakdown */}
                <div>
                    <h3 className="font-medium mb-2">Your Cart</h3>
                    {cartItems.map((item, index) => {
                        const basePrice =
                            item.finalPrice -
                            (item.addons.withFallPico ? FALLPICO_PRICE : 0) -
                            (item.addons.withTassels ? TASSELLS_PRICE : 0);
                        const itemTotal = item.finalPrice * item.quantity;

                        return (
                            <div
                                key={index}
                                className="mb-3 border-b pb-2 capitalize "
                            >
                                <p className="font-medium line-clamp-2">
                                    {item.name}
                                </p>
                                <p>
                                    Base Price: ₹{basePrice.toFixed(2)} ×{" "}
                                    {item.quantity} = ₹
                                    {(basePrice * item.quantity).toFixed(2)}
                                </p>
                                {item.addons.withFallPico && (
                                    <p>
                                        With Fall Pico: +₹{FALLPICO_PRICE} ×{" "}
                                        {item.quantity} = ₹
                                        {(
                                            FALLPICO_PRICE * item.quantity
                                        ).toFixed(2)}
                                    </p>
                                )}
                                {item.addons.withTassels && (
                                    <p>
                                        With Tassels: +₹{TASSELLS_PRICE} ×{" "}
                                        {item.quantity} = ₹
                                        {(
                                            TASSELLS_PRICE * item.quantity
                                        ).toFixed(2)}
                                    </p>
                                )}
                                <p className="font-medium">
                                    Item Total: ₹{itemTotal.toFixed(2)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Subtotal / GST / Total */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center font-medium">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {}
                    {discount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-between text-green-600"
                        >
                            <span>Discount</span>....
                            <span>-₹{discount.toFixed(2)}</span>
                        </motion.div>
                    )}

                    <div className="flex justify-between items-center">
                        <span className="text-sm">
                            Including ₹{gst} in taxes (5% GST)
                        </span>
                    </div>

                    <div className="border-t border-foreground/50 pt-2 sm:pt-3 mt-2 sm:mt-3">
                        <div className="flex justify-between text-sm sm:text-base md:text-lg font-semibold text-foreground">
                            <span>Total</span>
                            <motion.span
                                key={total}
                                initial={{ scale: 1.2, color: "#533e2d" }}
                                animate={{ scale: 1, color: "#533e2d" }}
                                transition={{ duration: 0.3 }}
                            >
                                ₹{total.toFixed(2)}
                            </motion.span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export default OrderSummary;
