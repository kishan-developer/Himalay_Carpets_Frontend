import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Renders a placeholder when the wishlist is empty.
 */
function EmptyWishlist() {

    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
        >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <p className="text-foreground text-sm sm:text-base mb-2">
                Your wishlist is empty.
            </p>
            <p className="text-foreground text-xs sm:text-sm mb-6">
                Browse products and tap the heart icon to add them.
            </p>
            <button 
            onClick={()=> navigate("/")}
            className="bg-foreground text-white px-4 py-2 text-xs sm:text-sm uppercase rounded hover:bg-foreground/90">
                Continue Shopping
            </button>
        </motion.div>
    );
}

export default EmptyWishlist;
