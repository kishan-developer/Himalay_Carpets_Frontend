import { useEffect } from "react";
import { motion } from "framer-motion";
import Heading from "../../pages/public/home/components/Heading";

const WishlistSidebar = ({ isOpen, closeHandler }) => {
    useEffect(() => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    const wishlistItems = [
        { id: 1, name: "Product One", price: "$29.99" },
        { id: 2, name: "Product Two", price: "$49.99" },
        { id: 3, name: "Product Three", price: "$19.99" },
    ];

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
                    <Heading text="Wishlist" />
                    <button
                        onClick={closeHandler}
                        className="p-2"
                        aria-label="Close wishlist"
                    >
                        <svg
                            className="w-7 h-7 text-foreground hover:text-foreground/80"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>

                <hr className="border-foreground/50 mx-4 sm:mx-6" />

                {/* Wishlist Content */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    <ul className="mt-4 flex flex-col gap-4">
                        {wishlistItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between border rounded-lg p-3 hover:shadow"
                            >
                                <div>
                                    <h4 className="font-medium text-sm sm:text-base">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {item.price}
                                    </p>
                                </div>
                                <button className="text-sm text-red-500 hover:underline">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-300 px-4 sm:px-6 py-4">
                    <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 text-sm sm:text-base">
                        Go To Wishlist Page
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default WishlistSidebar;
