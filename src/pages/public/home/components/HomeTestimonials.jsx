import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

function HomeTestimonials() {
    const testimonials = [
        {
            quote: "Himalaya Carpets consistently delivers exceptional quality and truly unique designs. Their craftsmanship is unmatched, making them our preferred partner.",
            clientName: "Jaunty Inc.",
            source: "USA",
        },
        {
            quote: "The team at Himalaya Carpets is incredibly collaborative. They understood our vision perfectly and delivered bespoke rugs that exceeded our expectations.",
            clientName: "Limited Edition",
            source: "Europe",
        },
        {
            quote: "We've been sourcing from Himalaya Carpets for years. Their reliability, ethical practices, and the stunning beauty of their hand-knotted pieces are why we keep coming back.",
            clientName: "Afridi Gallery",
            source: "UK",
        },
        {
            quote: "From initial design concepts to final delivery, Himalaya Carpets provided a seamless experience. Their attention to detail and customer satisfaction is truly commendable.",
            clientName: "Cabib Genova Hous of wool and  Mirzai",
            source: "Italy",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change testimonial every 5 seconds
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="container mx-auto px-4 py-0 max-w-7xl">
            <div className="bg-white rounded-lg p-6 md:p-10 text-center relative overflow-hidden">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-0 md:mb-8">
                    What Our Clients Say
                </h2>

                <div className="max-w-3xl mx-auto flex items-center justify-center">
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute left-4 md:left-6 lg:left-8 z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>

                    {/* Testimonial Content */}
                    <div className="bg-cream p-6 rounded-lg flex flex-col items-center justify-center w-full transition-opacity duration-500 ease-in-out shadow-lg">
                        {/* Image */}
                        <img
                            src={`https://picsum.photos/seed/${currentIndex}/120`} // Random image per testimonial
                            alt={currentTestimonial.clientName}
                            className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                        />

                        <Quote className="w-8 h-8 text-foreground mb-4 opacity-70" />
                        <p className="text-foreground italic mb-4 leading-relaxed text-center">
                            "{currentTestimonial.quote}"
                        </p>
                        <div className="w-full text-center mt-auto">
                            <p className="font-semibold text-foreground mb-1">
                                - {currentTestimonial.clientName}
                            </p>
                            <p className="text-sm text-foreground opacity-80">
                                {currentTestimonial.source}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 absolute right-4 md:right-6 lg:right-8 z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-foreground" : "bg-gray-300"
                                } transition-colors duration-300`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTestimonials;
