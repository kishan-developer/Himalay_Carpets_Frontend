import React, { useState } from "react";
import { X } from "lucide-react";

const GalleryPage = () => {
    // Replace with your API/DB images
    const images = [
        "/NS9607.jpg",
        "/NS9621.jpg",
        "/NS9629.jpg",
        "/NS9632.jpg",
        "/NS9634.jpg",
        "/NS9636.jpg",
        "/NS9641.jpg",
        "/3168.jpg"
        
        // "https://picsum.photos/500/700?random=1",
        // "https://picsum.photos/500/600?random=2",
        // "https://picsum.photos/500/800?random=3",
        // "https://picsum.photos/500/750?random=4",
        // "https://picsum.photos/500/650?random=5",
        // "https://picsum.photos/500/720?random=6",
        // "https://picsum.photos/500/680?random=7",
        // "https://picsum.photos/500/770?random=8",
        // "https://picsum.photos/500/810?random=9",
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="min-h-screen bg-cream text-foreground py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center tracking-tight mb-16">
                    Our Events
                </h1>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden shadow-lg break-inside-avoid group cursor-pointer"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <p className="text-white font-semibold tracking-wide uppercase">
                                    View
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                        <div className="relative max-w-6xl w-full animate-fadeIn">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-10 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full max-h-[85vh] object-contain shadow-2xl"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;
