import React from "react";
import { FiPhone } from "react-icons/fi"; // Feather Phone icon

const PhoneCallIcon = () => {
    const callLink = `tel:9918022212`;

    return (
        <a
            href={callLink}
            className="fixed bottom-24 right-6 z-50 bg-foreground p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Call Now"
        >
            <FiPhone className="w-6 h-6 text-white md:w-7 md:h-7 lg:w-6 lg:h-6" />
        </a>
    );
};

export default PhoneCallIcon;
