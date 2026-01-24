import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import Heading from "./Heading";
import SubHeading from "./SubHeading";
import dhurries_rugs from "../../../../assets/images/Hom/Home3Grid/dhurries-rugs.avif";
import flatweaves_rugs from "../../../../assets/images/Hom/Home3Grid/flatweaves-rugs.jpg";
import hand_knowtted_rugs from "../../../../assets/images/Hom/Home3Grid/Hand-Knowtted-rugs.jpg";
import hand_tufted_rugs from "../../../../assets/images/Hom/Home3Grid/Hand-tufted-rugs.jpg";
import hand_woven_rugs from "../../../../assets/images/Hom/Home3Grid/hand-woven-rugs.webp";
import handloom_rugs from "../../../../assets/images/Hom/Home3Grid/handloom-rugs.jpg";
function Home3Grid() {

    const navigate = useNavigate();


    const data = [
        { image: hand_knowtted_rugs, link: "/products/hand-knotted/685a563f449f39b5d40bb9f1", title: "Hand knotted" },
        { image: hand_woven_rugs, link: "#", title: "Indo Nepli" },
        { image: hand_tufted_rugs, link: "#", title: "Hand tufted rugs" },
        { image: handloom_rugs, link: "#", title: " Handloom rugs " },
        { image: flatweaves_rugs, link: "#", title: "Flatweaves " },
        { image: dhurries_rugs, link: "#", title: "Outdoor " },
    ];

    return (
        <div className="boxedContainer lg:px-15 px-5 w-full py-4  h-auto  overflow-x-hidden  ">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading
                        text={"Discover Signature Styles."}
                    />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text={
                            "Handpicked Carpets That Define Elegance, Comfort, and Craftsmanship"
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <div className="relative cursor-pointer " onClick={() => navigate(item.slug)}>
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            key={index}
                            src={item.image}
                            alt="Sarees"
                            loading='lazy'
                            className="w-full h-[500px] object-cover object-top md:object-center  hover:scale-[101%] transition-all ease-linear duration-200 shadow-sm  border border-gray-200 "
                        />
                        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                            <p class="text-white text-2xl font-medium">
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home3Grid;
