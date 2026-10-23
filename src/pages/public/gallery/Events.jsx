import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Heading from "./../home/components/Heading";
import SubHeading from "./../home/components/SubHeading";

function Events() {
    const navigate = useNavigate();

    // 3 DIFFERENT EVENT LISTS
    const eventSections = [
        {
            title: "HEIMTEXTIL",
            description: "Himalaya Carpets is excited to participate in Heimtextil, showcasing our newest handcrafted and modern carpet collections. Visit us to explore fresh textures, rich patterns, and premium designs that blend tradition with innovation. Experience true craftsmanship and discover what makes our carpets stand out globally.",
            items: [
                { image: "/heimtextil_1.jpeg", text: "Heimtextil Frankfurt", link: "/events" },
                { image: "/htx26-2.webp", text: "Domotex Germany", link: "/events" },
            ],
        },
        {
            title: "CEPC",
            description: "Himalaya Carpets proudly participates in Carpet Export Promotion Council (CEPC), presenting our finest handmade and modern carpet collections to buyers and industry professionals. This platform helps us highlight craftsmanship, new designs, and sustainable weaving traditions while strengthening our presence in national and international markets.",
            items: [
                { image: "/CEPC_!.webp", text: "CEPC India Expo", link: "/events" },
                { image: "/CEPC_2.jpeg", text: "Delhi Textile Fair", link: "/events" },
            ],
        },
        {
            title: "DOMOTEX",
            description: "Himalaya Carpets is delighted to showcase its latest carpet collections at Domotex, a global platform for flooring innovation. We present fresh designs, premium textures, and exceptional craftsmanship, connecting with international buyers and industry leaders while highlighting our commitment to quality, creativity, and modern flooring trends.",
            items: [
                { image: "/Domotex_1.webp", text: "Handloom Week", link: "/events" },
                { image: "/Domotex_2.jpeg", text: "Craft Heritage Expo", link: "/events" },
            ],
        },
    ];

    return (
        <div className="boxedContainer lg:px-15 px-5 w-full py-12 overflow-x-hidden">
            
            {/* MAIN HEADING */}
            <div className="md:mb-14 mb-10 mt-4 text-center">
                <Heading text="Our Events" />
                {/* <div className="mt-2">
                    <SubHeading text="Explore highlights from our major exhibitions and global showcases." />
                </div> */}
            </div>

            {/* LOOP 3 DIFFERENT SECTIONS */}
            {eventSections.map((section, index) => (
                <div key={index} className="mb-16 mt-10 ">
                    
                    {/* SECTION HEADING */}
                    <h2 className="text-2xl text-center font-semibold mb-6 ">{section.title}</h2>
                    <h2 className="text-xl text-center  mb-6">{section.description}</h2>


                    {/* EVENTS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {section.items.map((event, i) => (
                            <div
                                key={i}
                                className="relative cursor-pointer group overflow-hidden border border-gray-200 shadow-sm"
                                onClick={() => navigate(event.link)}
                            >
                                <motion.img
                                    whileTap={{ scale: 0.97 }}
                                    src={event.image}
                                    alt={event.text}
                                    loading="lazy"
                                    className="w-full h-[50vh] object-cover object-center transition duration-300 ease-in-out group-hover:scale-105"
                                />

                                {/* OVERLAY */}
                                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <h2 className="text-white text-2xl font-semibold uppercase tracking-wide">
                                        {event.text}
                                    </h2>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Events;
