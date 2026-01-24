import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import SubHeading from "./SubHeading";


import HumptexImg from "../../../../assets/images/events/heimtextil.webp";
import CEPCImg from "../../../../assets/images/events/CEPC.jpg";
import DomotexImg from "../../../../assets/images/events/domotex.jpg";

function EventsSection() {
    const navigate = useNavigate();

    const events = [
        {
            image: HumptexImg,
            text: "Heimtextil",
            link: "/gallery",
        },
        {
            image: CEPCImg,
            text: "CEPC",
            link: "/gallery",
        },
        {
            image: DomotexImg,
            text: "domotex",
            link: "/gallery",
        },
    ];

    return (
        <div className="boxedContainer lg:px-15 px-5 w-full py-12 overflow-x-hidden">
            {/* Heading */}
            <div className="md:mb-14 mb-10 mt-4 text-center">
                <Heading text={"Our Events"} />
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Explore highlights from our major exhibitions and global showcases."
                        }
                    />
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer group overflow-hidden border border-gray-200 shadow-sm"
                        onClick={() => navigate(event.link)}
                    >
                        <motion.img
                            whileTap={{ scale: 0.97 }}
                            src={event.image}
                            alt={event.text}
                            loading="lazy"
                            className="w-full h-[50vh] object-cover object-center transition duration-300 ease-in-out group-hover:scale-105 "
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
                                {event.text}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsSection;
