import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

const PaymentMethodSelector = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const paymentMethod = watch("paymentMethod");

    const methods = [
        { value: "credit-card", label: "Credit Card" },
        { value: "paypal", label: "PayPal" },
        { value: "bank-transfer", label: "Bank Transfer" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold uppercase text-foreground mb-4">
                Payment Method
            </h2>
            <div className="space-y-3">
                {methods.map((method) => (
                    <motion.label
                        key={method.value}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 p-3 border-[2px] border-foreground/50 cursor-pointer transition-all duration-200 ${
                            paymentMethod === method.value
                                ? "border-foreground bg-foreground/5"
                                : "hover:bg-foreground/5"
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            {...register("paymentMethod", {
                                required: "Payment method is required",
                            })}
                            className="hidden"
                        />
                        <span
                            className={`w-5 h-5 border-[2px] border-gray-400 flex items-center justify-center transition-all duration-200 ${
                                paymentMethod === method.value
                                    ? "border-foreground bg-foreground"
                                    : ""
                            }`}
                        >
                            {paymentMethod === method.value && (
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </span>
                        <span className="text-sm text-foreground">
                            {method.label}
                        </span>
                    </motion.label>
                ))}
            </div>
            {errors.paymentMethod && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.paymentMethod.message}
                </p>
            )}
        </div>
    );
};

export default PaymentMethodSelector;
