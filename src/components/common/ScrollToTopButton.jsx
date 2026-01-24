import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Lucide icon

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-40 right-6 bg-foreground text-white p-3 rounded-full shadow-lg hover:bg-primary transition-all duration-300 z-50"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        )
    );
};

export default ScrollToTopButton;
