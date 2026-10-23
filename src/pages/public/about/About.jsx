import React from "react";
import { Link } from "react-router-dom";
import Certifications from "../../../components/common/Certification";
import HomeTeam from "../home/components/HomeTeam";


const StatsSection = () => {
    const stats = [
        { number: "5,000+", label: "Tufted Rugs / month" },
        { number: "5,000+", label: "Handloom Rugs / month" },
        { number: "2,000+", label: "Hand-knotted / month" },
        { number: "25+", label: "Years of Craftsmanship" },
    ];

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-4xl font-extrabold text-[rgb(83,62,45)]">
                                {stat.number}
                            </p>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



const AboutUs = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <section className="bg-[rgb(83,62,45)] py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white text-center">
                        About Himalaya Carpets
                    </h1>
                </div>
            </section>

            {/* About */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Who We Are
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Himalaya Carpets is an Indian government-recognised export
                        house since 1987 engaged in the manufacture and export of all types of
                        handmade carpets. With decades of experience, our promoters
                        have built a reputation for delivering excellent quality
                        products that reflect the latest trends in home décor.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Backed by a strong R&D team and in-house designers, we work
                        closely with clients to create both bespoke and series
                        production carpets. Our commitment is to ensure high customer
                        satisfaction through stringent quality control, ethical
                        manufacturing, and competitive pricing.
                    </p>
                </div>
            </section>

            {/* Clients */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Clients & Fairs
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Himalaya Carpets has an international presence and actively
                        participates in Indian Carpet Fairs and prestigious
                        international events like Domotex and CEPC. Our primary
                        markets include Europe and America, where we collaborate with
                        wholesalers and multi-store retailers.
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Jaunty Inc.</li>
                        <li>Limited Edition</li>
                        <li>Afridi Gallery</li>
                        <li>Cabib Genova Hous of wool and  Mirzai</li>
                    </ul>
                </div>
            </section>

            {/* Factory */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Factory & Capabilities
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>2 campuses spread over 2 acres for different carpet qualities</li>
                        <li>In-house looms of multiple types</li>
                        <li>Dedicated drying chambers for all-weather production</li>
                        <li>In-house weaving, processing & finishing</li>
                        <li>Strong R&D and design team</li>
                    </ul>
                    <h3 className="mt-6 text-xl font-semibold text-[rgb(83,62,45)]">
                        Production Capacity (per month)
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Tufted carpets – 5000 sqm</li>
                        <li>Handloom rugs – 5000 sqm</li>
                        <li>Hand-knotted carpets – 2000 sqm</li>
                    </ul>
                </div>
            </section>

            {/* Stats */}
            <StatsSection />

            {/* Products */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                        Our Product Range
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Hand knotted – 3/20 to 10/50 quality</li>
                        <li>Hand woven rugs</li>
                        <li>Hand tufted rugs</li>
                        <li>Handloom rugs</li>
                        <li>Flatweaves</li>
                        <li>Dhurries</li>
                        <li>Louri back & Gabbeh</li>
                        <li>Indoor/Outdoor Polyester Rugs</li>
                    </ul>
                </div>
            </section>

            {/* Certifications */}
            <Certifications />

            {/* Team */}
            <HomeTeam />

            {/* CTA */}
            <section className="py-12 bg-[rgb(83,62,45)] text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">
                        Partner with Himalaya Carpets
                    </h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        For custom production, samples or export enquiries, our team
                        is ready to collaborate. We deliver quality, scale and
                        on-time exports.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/products/all/696b32fa0d9bad1460f6e065"
                            className="bg-white text-[rgb(83,62,45)] px-6 py-2 font-medium rounded"
                        >
                            Explore Products
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-white px-6 py-2 font-medium rounded"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.727566240339!2d82.5688242!3d25.3804455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fdd9f5f1b7293%3A0x1de67c63a58b4ad7!2sThe%20Himalaya%20Carpets!5e0!3m2!1sen!2sin!4v1771328734331!5m2!1sen!2sin" className="w-full h-[60vh]"  referrerpolicy="no-referrer-when-downgrade"></iframe>
{/* 
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.727566240339!2d82.5688242!3d25.3804455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fdd9f5f1b7293%3A0x1de67c63a58b4ad7!2sThe%20Himalaya%20Carpets!5e0!3m2!1sen!2sin!4v1771328734331!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}

        </div>
    );
};

export default AboutUs;
