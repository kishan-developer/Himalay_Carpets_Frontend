import React from 'react';
import Image from '../../../../assets/images/Hom/HomeAbout/HomeAbout.webp'
import { Link } from 'react-router-dom';
import CompanyHistoryShowcase from '../../../../components/common/CompanyHistoryShowcase';
function HomeAbout() {
    return (
        <div className="container mx-auto px-4 pt-10 md:py-10 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-cream rounded-lg p-2 md:p-10">
                {/* Image Section */}
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src={Image} // Placeholder image, replace with an actual carpet image
                        alt="Himalaya Carpets Workshop"
                        className="rounded-sm w-full max-w-md md:max-w-full sm:h-auto  object-cover "
                        loading='lazy'
                    />
                </div>

                {/* Text Content */}
                <div className="md:w-1/2 w-full text-center md:text-left space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        About Himalaya Carpets
                    </h2>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                        Himalaya Carpets is an Indian government-recognised export house, dedicated to the manufacture and export of all types of handmade carpets. With decades of experience, our promoters and management deliver excellent quality carpets that embody the latest home décor trends.
                    </p>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                        We pride ourselves on strong in-house R&D and design teams that collaborate closely with clients for bespoke and series-production carpets.
                    </p>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                        Our commitment to stringent quality control, ethical production, and competitive pricing ensures high customer satisfaction and a trusted global partnership.
                    </p>
                    <Link
                        to={'/about'}
                        // Replace with actual About Us page link
                        className="inline-block mt-4 px-6 py-3 bg-foreground text-white font-medium rounded-md hover:bg-foreground/90 transition-colors duration-300"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
            <div>
                <CompanyHistoryShowcase />
            </div>
        </div>
    );
}

export default HomeAbout;
