import React, { useState } from "react";

export const SECTION_TABS = [
    { key: "heroSlider", label: "Hero Slider" },
    { key: "threeGrid", label: "3-Image Grid" },
    { key: "videoBlock", label: "Video Block" },
    { key: "bigGrid", label: "2-Image Big Grid" },
    { key: "singleBanner", label: "Single Banner" },
    { key: "twoSlideGrid", label: "2-Slide Grid" },
    { key: "exploreBanner", label: "Explore Banner" },
    { key: "whyChooseUs", label: "Why Choose Us" },
    { key: "whyChooseUs1", label: "Why Choose Us" },
    { key: "whyChooseUs2", label: "Why Choose Us" },
    { key: "whyChooseUs3", label: "Why Choose Us" },
];

export default function AdminTabSelector({
    sections,
    initialTabKey,
    onTabChange,
}) {
    const [activeTab, setActiveTab] = useState(
        initialTabKey || sections[0]?.key
    );

    const handleTabClick = (key) => {
        setActiveTab(key);
        if (onTabChange) onTabChange(key);
    };

    return (
        <div className="  bg-white overflow-hidden max-w-full ">
            <div className="overflow-x-scroll scrollbar-hide">
                <div className="flex w-fit min-w-[700px] sm:min-w-full space-x-2 px-4 py-2">
                    {sections.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => handleTabClick(key)}
                            className={`flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                                activeTab === key
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-700 hover:text-gray-900"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
