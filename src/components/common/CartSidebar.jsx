// CartSidebar.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    setStepCount,
    updateQuantity,
} from "../../redux/slices/cartSlice"; // Adjust path as needed
import Heading from "../../pages/public/home/components/Heading";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, closeHandler }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartItems);
    const subtotal = useSelector((state) => state?.cart?.subtotal);
    const updateQuantityHandler = (id, change, idx) => {
        const item = cartItems.find(
            (item, index) => index === idx && item._id === id
        );
        console.log(item);
        if (item) {
            const newQuantity = Math.max(1, item.quantity + change);

            dispatch(updateQuantity({ id, quantity: newQuantity, idx }));
        }
    };

    const removeItem = (id, idx) => {
        dispatch(removeFromCart({ id, idx }));
    };
    const navigate = useNavigate(); //
    const checkOutHandler = () => {
        dispatch(setStepCount(2));
        navigate("/cart");
    };
    const viewCartHandler = () => {
        closeHandler();
        dispatch(setStepCount(1));
    };
    return (
        <div
            className="fixed z-[100] inset-0 w-screen h-screen flex bg-gray-900/25"
            onClick={closeHandler}
        >
            <motion.div
                className="absolute flex flex-col bg-white w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full right-0 z-[101]"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4">
                    <Heading text={`Shopping Bag (${cartItems?.length})`} />
                    <button
                        onClick={closeHandler}
                        className="p-2"
                        aria-label="Close cart"
                    >
                        <svg
                            className="w-7 h-7 text-foreground hover:text-foreground/50"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>
                <hr className="border-foreground/50 mx-4 sm:mx-6 mb-2" />

                {/* Cart Items (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    {cartItems?.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-foreground text-center"
                        >
                            Your cart is empty.
                        </motion.p>
                    ) : (
                        cartItems?.map((item, idx) => (
                            <motion.div
                                key={item._id + item?.addons?.toString()}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-3 mb-4 pb-4 border-b border-foreground/50"
                            >
                                <div
                                    className="w-20 sm:w-24 aspect-square  overflow-hidden  border-gray-100 flex-shrink-0 cursor-pointer"
                                    onClick={() => {
                                        navigate(`/product/${item?._id}`);
                                        closeHandler();
                                    }}
                                >
                                    <img
                                        src={
                                            Array.isArray(item.images)
                                                ? item.images[0]
                                                : item.image
                                        }
                                        alt={item.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-light text-sm sm:text-base text-foreground line-clamp-1">
                                            {item?.name}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                removeItem(item?._id, idx)
                                            }
                                            className="text-foreground hover:text-foreground/50 text-base p-1"
                                            aria-label={`Remove ${item?.name}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <p className="text-foreground text-xs">
                                        Color: {item?.color}
                                    </p>
                                    <p className="text-foreground text-xs">
                                        Fall, pico:{" "}
                                        {item?.addons.withFallPico
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                    <p className="text-foreground text-xs">
                                        Tassels :{" "}
                                        {item?.addons.withTassels
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantityHandler(
                                                        item._id,
                                                        -1,
                                                        idx
                                                    )
                                                }
                                                className="w-7 h-7 flex items-center justify-center border  text-foreground hover:bg-gray-100 text-sm"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="text-xs sm:text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantityHandler(
                                                        item._id,
                                                        +1,
                                                        idx
                                                    )
                                                }
                                                className="w-7 h-7 flex items-center justify-center border  text-foreground hover:bg-gray-100 text-sm"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="font-medium text-xs sm:text-sm">
                                            &#x20B9;
                                            {item.finalPrice * item?.quantity}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Footer (Fixed to Bottom) */}
                <div className="sticky bottom-0 bg-white border-t border-gray-300 px-4 sm:px-6 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-light text-sm sm:text-base">
                            SUBTOTAL:
                        </span>
                        <span className="font-light text-sm sm:text-base">
                            &#x20B9; {subtotal?.toFixed(2)}
                        </span>
                    </div>
                    <Link to={"/cart"} onClick={viewCartHandler}>
                        <button
                            className="w-full mb-2 py-2 px-4 bg-gray-100 text-gray-800 font-light text-sm sm:text-base hover:bg-gray-200 transition-colors "
                            aria-label="View cart"
                        >
                            View Cart
                        </button>
                    </Link>
                    <Button
                        text="Checkout"
                        onSubmitHandler={
                            cartItems?.length ? checkOutHandler : () => {}
                        }
                        className="w-full py-2 text-sm sm:text-base"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default CartSidebar;
