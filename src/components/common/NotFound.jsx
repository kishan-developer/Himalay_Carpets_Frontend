import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; // Import the Header component
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for text elements
const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Animation variants for the container (stagger children)
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col ">
            {/* Main content area */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    className="text-center max-w-2xl mx-auto space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Large 404 heading */}
                    <motion.h1
                        variants={textVariants}
                        className="text-7xl sm:text-9xl font-bold text-gray-800 tracking-wide"
                    >
                        404
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2
                        variants={textVariants}
                        className="text-xl sm:text-3xl md:text-4xl font-medium text-gray-800 capitalize"
                    >
                        Oops! Page Not Found
                    </motion.h2>

                    {/* Paragraph */}
                    <motion.p
                        variants={textVariants}
                        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto"
                    >
                        It looks like you've wandered off the path. Let's get
                        you back to the elegance of handwoven sarees.
                    </motion.p>

                    {/* Back to Home button */}
                    <motion.div variants={textVariants}>
                        <Link
                            to="/"
                            className="inline-block text-xl bg-white text-gray-800 px-6 py-3 border border-transparent hover:border hover:border-gray-800 hover:bg-transparent hover:text-gray-800 transition-all duration-200"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}

export default NotFound;
