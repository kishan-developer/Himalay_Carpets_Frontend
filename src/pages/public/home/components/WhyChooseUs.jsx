import React from "react";

import { MdSupportAgent } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSparkles } from "react-icons/io5";

const data = [
    {
        icon: <TbTruckDelivery />,
        heading: "Fast And Free Delivery",
        subheading: "Free delivery for all orders over india",
    },
    {
        icon: <MdSupportAgent />,
        heading: "24/7 Customer Support",
        subheading: "Friendly 24/7 customer support",
    },

    {
        icon: <IoSparkles />,
        heading: "Premium Quality",
        subheading: "Quality You Can Trust",
    },
];
function WhyChooseUs() {
    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden   grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.map((item) => (
                <div className=" p-4 flex flex-col items-center gap-2">
                    {/* icon */}
                    <span className="text-6xl leading-none font-thin text-foreground">
                        {item.icon}
                    </span>
                    {/* Heading */}
                    <div>
                        <h1 className="uppercase text-xl font-medium text-foreground/90 text-center">
                            {item.heading}
                        </h1>
                        {/* Subheading */}
                        <h2 className="text-sm font-normal text-foreground/80 text-center">
                            {item.subheading}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default WhyChooseUs;
