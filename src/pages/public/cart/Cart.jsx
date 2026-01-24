// Cart.jsx
import { useSelector } from "react-redux";
import ShoppingBag from "./components/ShoppingBag";
import ShippingAndCheckout from "./components/ShippingAndCheckout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
    const location = useLocation();
    const initialBuyNowItem = location.state?.buyNowItem || null;
    const [buyNowItem, setBuyNowItem] = useState(initialBuyNowItem);
    const isBuyNow = Boolean(buyNowItem);

    //  PROBLEM: if buyNowItem is undefined, buyNowItem.quantity throws
    // FIX: initialize localQty safely, default to 1 if no buyNowItem
    const [localQty, setLocalQty] = useState(
        () => (buyNowItem && buyNowItem.quantity) || 1
    );

    //  Choose items array based on mode
    const reduxItems = useSelector((state) => state.cart.cartItems);
    const cartItems = isBuyNow
        ? [{ ...buyNowItem, quantity: localQty }]
        : reduxItems;

    //  Sync localQty if buyNowItem changes (e.g. user navigates directly)
    useEffect(() => {
        if (isBuyNow) {
            setLocalQty(buyNowItem.quantity || 1);
        }
    }, [buyNowItem, isBuyNow]);

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.finalPrice * item.quantity,
        0
    );

    const Data = [
        {
            id: 1,
            heading: "Shopping Bag",
            subHeading: "Manage Your Items list",
        },
        {
            id: 2,
            heading: "Shipping And Checkout",
            subHeading: "Checkout your item list",
        },
        {
            id: 3,
            heading: "Confirmation",
            subHeading: "Review and submit your order",
        },
    ];
    // Your step definitions

    const [stepCount, setStepCount] = useState(1);

    return (
        <div className="boxedContainer h-auto w-full py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold uppercase mb-4 sm:mb-6">
                Cart
            </h1>

            {/* Step Indicators - Responsive Grid */}
            <div className="w-full mb-6 sm:mb-8">
                {/* Mobile Step Indicator (Horizontal Line with Dots) */}
                <div className="relative flex justify-between items-center md:hidden mb-6">
                    {/* Horizontal Line */}
                    <div className="absolute top-3 left-0 right-0 h-0.5 bg-foreground"></div>
                    {/* Dots and Labels */}
                    {Data.map((item) => (
                        <div
                            key={item.id}
                            className="relative z-10 flex flex-col items-center w-1/3"
                        >
                            <div
                                className={`w-6 h-6 flex items-center justify-center text-xs font-medium
                                    ${
                                        stepCount >= item.id
                                            ? "bg-foreground text-white"
                                            : "bg-white  border border-foreground text-foreground"
                                    }`}
                            >
                                {item.id}
                            </div>
                            <span className="text-[10px] sm:text-xs mt-2 text-center font-medium leading-tight">
                                {item.heading.split(" ")[0]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Desktop Step Indicator */}
                <div className="hidden md:grid w-full grid-cols-3 gap-4">
                    {Data.map((item) => (
                        <div
                            className={`flex gap-4 py-2 ${
                                stepCount >= item.id
                                    ? "border-b-2 border-foreground"
                                    : "border-b border-foreground/50"
                            }`}
                            key={item.id}
                        >
                            <h1 className="text-sm md:text-base lg:text-[18px] uppercase font-medium">
                                0{item.id}
                            </h1>

                            <div>
                                <h1 className="text-sm md:text-base lg:text-[18px] uppercase font-medium text-foreground">
                                    {item.heading}
                                </h1>
                                <h2 className="text-foreground text-xs md:text-sm">
                                    {item.subHeading}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Container with Responsive Padding */}
            <div className="w-full">
                {stepCount === 1 && (
                    <ShoppingBag
                        cartItems={cartItems}
                        isBuyNow={isBuyNow}
                        setLocalQty={setLocalQty}
                        setBuyNowItem={setBuyNowItem}
                        setStepCount={setStepCount}
                    />
                )}
                {stepCount === 2 && (
                    <ShippingAndCheckout
                        cartItems={cartItems}
                        setStepCount={setStepCount}
                    />
                )}
                {/* {stepCount === 3 && <Confirmation />} */}
            </div>
        </div>
    );
}

export default Cart;
