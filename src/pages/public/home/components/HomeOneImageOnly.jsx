import React from "react";
import Image from "../../../../assets/images/Hom/HomeOneImageOnly/HC_1920x1080.jpg";

function HomeOneImageOnly() {
    return (
        <div className="h-[300px] md:h-[550px] w-full boxedContainer py-4 sm:px-8 overflow-hidden">
            <img
                src={Image}
                className="object-cover h-full w-full cursor-pointer sm:px-8"
                alt="background"
                loading='lazy'
            />
        </div>
    );
}

export default HomeOneImageOnly;
