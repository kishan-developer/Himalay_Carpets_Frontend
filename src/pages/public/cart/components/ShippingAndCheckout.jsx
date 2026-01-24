import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../../../utils/apiConnector";
import toast from "react-hot-toast";

import { useForm, FormProvider } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShippingForm from "./ShippingForm";

import OrderSummary from "./OrderSummary";
import { useOffer } from "../../../../hooks/useOffer";

function ShippingAndCheckout({ cartItems, setStepCount }) {
    const [addresses, setAddresses] = useState([]); // this will be  shared  to shippingForm
    // const cartItems = useSelector((state) => state?.cart?.cartItems);
    const user = useSelector((state) => state?.user?.user);
    const discountPercentage = useSelector(
        (state) => state?.cart?.discountPercentage
    );
    const offer = useOffer();
    const methods = useForm();

    // Compute subtotal, gst and total
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
    );
    const gst = +(subtotal * 0.05).toFixed(2); // 5% GST
    const discount = (subtotal * discountPercentage) / 100;
    const total = discount ? subtotal - discount : subtotal;

    const onSubmit = async (data) => {
        console.log(
            "Order That I Have  Created While Making Payment",

            cartItems
        );
        let isNewAddress = false;
        if (data.addressId === "new") {
            const {
                data: { address: newAddress },
            } = await axiosInstance.post("/user/address/add", data);
            setAddresses((prev) => [...prev, newAddress]);
            isNewAddress = newAddress._id;
        }

        const {
            data: { key },
        } = await axiosInstance.get("/payment/get-razorpay-key");
        const { data: order } = await axiosInstance.post("/payment/checkout", {
            amount: total,
            userId: user?._id,
            items: cartItems,
            discount,
            offer,
            addressId: isNewAddress ? isNewAddress : data.addressId,
        });

        // console.log("Razor Pay Order ->", order);
        const razorpay = new window.Razorpay({
            key,
            amount: order.amount,
            currency: "INR",
            name: "Himalaya Carpets Fabs",
            description: "",
            image: "LOGO.avif",
            order_id: order.id,
            callback_url: `${import.meta.env.VITE_BACKEND_URL
                }payment/verify-payment`,
            prefill: {
                name: user?.name || "",
                email: user?.email || "",
                contact: user?.phone || "",
            },
            notes: { address: "Razorpay Corporate Office" },
            theme: { color: "#3399cc" },
        });

        razorpay.on("payment.failed", (resp) => {
            const slug = slugify(resp.error?.reason || "payment_failed", {
                lower: true,
                strict: true,
            });
            window.location.href = `paymentFailed?reason=${slug}`;
        });

        razorpay.open();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-full py-8 bg-white px-4 md:px-8"
        >
            <FormProvider {...methods}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <ShippingForm
                                addresses={addresses}
                                setAddresses={setAddresses}
                            />
                            <div className="block md:hidden">
                                <OrderSummary
                                    cartItems={cartItems}
                                    subtotal={subtotal}
                                    gst={gst}
                                    total={total}
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex flex-col md:flex-row justify-between mt-8 gap-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={() => setStepCount(1)}
                                    className="flex items-center justify-center gap-2 border-[2px] border-foreground/50 text-foreground h-12 px-4 md:px-6 w-full uppercase hover:border-foreground hover:bg-foreground/5 transition-all duration-200"
                                >
                                    <FaArrowLeft className="text-foreground" />
                                    <span>Back to Shopping Bag</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={methods.formState.isSubmitting}
                                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-foreground px-4 md:px-6 font-light text-neutral-200 text-md tracking-wide w-full uppercase disabled:opacity-50"
                                >
                                    {methods.formState.isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1,
                                            }}
                                            className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <span>Proceed To Confirmation</span>
                                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                                <div className="relative h-full w-8 bg-white/20"></div>
                                            </div>
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>
                    </div>

                    {/* Pass subtotal, gst, total into your summary */}
                    <div className="hidden md:block ">
                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            gst={gst}
                            total={total}
                        />
                    </div>
                </div>
            </FormProvider>
        </motion.div>
    );
}

export default ShippingAndCheckout;
