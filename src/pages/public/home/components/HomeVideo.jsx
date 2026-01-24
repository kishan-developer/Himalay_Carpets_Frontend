import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import VIDEO from "../../../../assets/carpet_video.mp4";
import POSTER from "../../../../assets/POSTER.webp";

function HomeVideo() {
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 1500); // Load video 1.5s after page render

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className=" w-full py-4 h-auto  overflow-x-hidden">
            <div className="md:mb-14 mb-10 mt-4">
                <div>
                    <Heading text="Timeless Designs, Unmatched Craft" />
                </div>
                <div className="mt-2">
                    <SubHeading
                        text="Explore Our Top Picks Woven to Perfection"
                    />
                </div>
            </div>

            <div className="relative w-full h-[35vh] sm:h-[100vh] bg-black">
                {showVideo ? (
                    <video
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster={POSTER}
                    >
                        <source src={VIDEO} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${POSTER})` }}
                    >
                        {/* Optional fallback poster if user disables autoplay */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeVideo;
