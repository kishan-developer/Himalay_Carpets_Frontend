import React from 'react';
import GST from '../../assets/images/certification/GST.png';
import EPB from '../../assets/images/certification/EPB.jpg';
import IEC from '../../assets/images/certification/IEC.webp';
import MSME from '../../assets/images/certification/MSME.png';
import RCMC from '../../assets/images/certification/RCMC.avif';


// Use an array of objects for better clarity and to add a title
const certifications = [
    { src: IEC, alt: 'Import Export Code', title: 'IEC Certificate' },
    { src: MSME, alt: 'MSME Registration', title: 'MSME Registration' },
    { src: RCMC, alt: 'Registration-Cum-Membership Certificate', title: 'RCMC Certificate' },
    { src: EPB, alt: 'Export Promotion Bureau Certificate', title: 'EPB Certificate' },
    { src: GST, alt: 'Goods and Services Tax', title: 'GST Registration' },

];

const Certifications = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Our Certifications
                </h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    We are proud to hold the following certifications, demonstrating our commitment to quality and legal compliance in all our operations.
                </p>

                {/* --- Auto-sliding carousel container with smoke effect --- */}
                <div className="relative overflow-hidden w-full py-4 cert-container">
                    <div className="flex animate-slide whitespace-nowrap">
                        {/* Duplicate the array to create a seamless loop */}
                        {certifications.concat(certifications).map((cert, index) => (
                            <div key={index} className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-4">
                                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-lg border border-gray-200 h-48 w-full justify-center">
                                    <img
                                        src={cert.src}
                                        alt={cert.alt}
                                        className="h-24 object-contain mb-2"
                                    />
                                    <h3 className="text-sm font-semibold text-gray-700 text-center">
                                        {cert.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Tailwind CSS keyframes and custom CSS for smoke effect --- */}
            <style>
                {`
                @keyframes slide {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-slide {
                    animation: slide 25s linear infinite; /* Adjust speed by changing the duration */
                }

                .cert-container::before,
                .cert-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    width: 10%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 10;
                }

                .cert-container::before {
                    left: 0;
                    background: linear-gradient(to right, white, transparent);
                }

                .cert-container::after {
                    right: 0;
                    background: linear-gradient(to left, white, transparent);
                }

                `}
            </style>
        </section>
    );
};

export default Certifications;