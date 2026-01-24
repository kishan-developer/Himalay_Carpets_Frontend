import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../utils/apiConnector";
import toast from "react-hot-toast";
import { setCart } from "../../../../redux/slices/cartSlice";
import { removeFromWishList } from "../../../../redux/slices/wishListSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Renders a single wishlist item in a responsive row.
 * Props:
 *  - item: { _id, name, image, price, ... }
 *  - idx: index for staggered animation
 *
 * You can later pass in onRemove and onMoveToCart callbacks.
 */
function WishlistItemRow({ item, idx }) {
    const imageUrl = Array.isArray(item.images) ? item.images[0] : item.image;
    const user = useSelector((state) => state?.user?.user);
    const cartItems = useSelector((state) => state?.cart?.cartItems || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddToCart = async (data) => {
        // Check if item already exists in cart
        const isExist = cartItems?.some((item) => item?._id === data?._id);

        // Proceed only if user is logged in and item is not in cart
        if (!isExist && user) {
            try {
                // Prepare cart item data to be sent to the backend
                const cartData = {
                    product: data._id,
                    quantity: data.quantity || 1,
                    finalPrice: data.price,
                    withCustomization: false,
                    totalPrice: data.price,
                    userId: user._id,
                };

                // Send the data to backend API
                const res = await axiosInstance.post(
                    "/user/cart/add",
                    cartData
                );

                // If no response, exit
                if (!res) return;

                // Update Redux store (you need to define updatedCart if using this)
                dispatch(setCart(res.data));
                const wishlistResponse = await axiosInstance.post(
                    "/user/wishlist/remove",
                    { userId: user?._id, productId: item?._id }
                );
                dispatch(removeFromWishList(item?._id));
            } catch (error) {
                toast.error("Something went wrong");
                console.error(error);
            }
        } else {
            navigate(`/cart`);
        }
    };
    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
    const removeHandler = async (productId) => {
        try {
            const res = await axiosInstance.post("/user/wishlist/remove", {
                productId,
                userId: user?._id,
            });
            dispatch(removeFromWishList(productId));
        } catch (error) {
            console.log(error, "Failed to remove from wishlist");
        }
    };
    useEffect(() => {
        const found = cartItems?.some(
            (cartItem) => cartItem?._id === item?._id
        );
        setIsAlreadyInCart(found);
    }, [cartItems, item]);
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border-b border-foreground/40 py-4 "
        >
            {/* Image + Info */}
            <div
                className="flex items-start gap-4 col-span-1 sm:col-span-2 cursor-pointer"
                onClick={() => {
                    navigate(`/product/${item?._id}`);
                }}
            >
                <motion.div
                    className="w-[100px] sm:w-[120px] md:w-[140px] aspect-square  overflow-hidden  flex-shrink-0"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                >
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                    />
                </motion.div>

                <div className="flex flex-col justify-between space-y-1">
                    <h2 className="text-base font-semibold text-foreground leading-snug line-clamp-2">
                        {item.name}
                    </h2>
                    {item.description && (
                        <p className="text-xs text-foreground/70 line-clamp-2">
                            {item.description.length > 80
                                ? item.description.slice(0, 80) + "..."
                                : item.description}
                        </p>
                    )}
                    <span className="text-xs text-foreground/50 mt-1">
                        ID: {item._id.slice(-6)}
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="hidden sm:flex flex-col items-center justify-center col-span-1">
                <span className="text-xs text-foreground/60">Price</span>
                <span className="text-sm font-semibold text-foreground">
                    ₹{item.price.toFixed(2)}
                </span>
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex flex-col gap-2 items-center justify-center col-span-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(item)}
                    className="w-full max-w-[140px] px-4 py-2 bg-foreground text-white text-sm rounded hover:bg-foreground/90 transition-all"
                >
                    {isAlreadyInCart ? "Go to Cart" : "Move to Cart"}
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => removeHandler(item._id)}
                >
                    Remove
                </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="sm:hidden mt-2 col-span-1 flex flex-col gap-3">
                <div className="flex justify-between text-sm text-foreground">
                    <span className="text-foreground/60">Price</span>
                    <span className="font-medium">
                        ₹{item.price.toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className="w-full px-3 py-2 bg-foreground text-white text-sm rounded hover:bg-foreground/90 transition-all"
                    >
                        {isAlreadyInCart ? "Go to Cart" : "Move to Cart"}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm text-red-500 hover:underline"
                        onClick={() => removeHandler(item._id)}
                    >
                        Remove
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default WishlistItemRow;
