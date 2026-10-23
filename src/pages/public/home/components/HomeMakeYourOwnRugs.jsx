import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../../assets/images/Hom/HomeMakeYourOwnRugs/CustomRugs.webp'
function HomeMakeYourOwnRugs() {
    return (
        <div className="container mx-auto px-4 py-5 md:py-10 max-w-7xl" id='custom_rugs'>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-cream rounded-lg  md:p-10">
                {/* Image Section - Left on desktop, top on mobile */}
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src={Image}
                        alt="Design Your Own Custom Rug"
                        className="rounded-sm w-full max-w-md md:max-w-full sm:h-[400px] h-[300px] object-cover"
                        loading='lazy'
                    />
                </div>

                {/* Text Content - Right on desktop, bottom on mobile */}
                <div className="md:w-1/2 w-full text-center md:text-left space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Design Your Own Custom Rug
                    </h2>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                        Unleash your creativity and design a unique carpet that perfectly fits your space and vision. With Himalaya Carpets, you can customize material, size, color, and design to bring your dream rug to life.
                    </p>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                        Our expert artisans will work with you every step of the way to ensure your bespoke rug is a true reflection of your style, meticulously crafted to the highest standards of quality.
                    </p>
                    <Link
                        to="/make-your-own-rug"
                        className="inline-block mt-4 px-8 py-3 bg-foreground text-white font-medium rounded-md hover:bg-foreground/90 transition-colors duration-300"
                    >
                        Start Designing Your Rug
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeMakeYourOwnRugs;
