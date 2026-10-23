import React from "react";

function HomeTeam() {
    const teamMembers = [
        {
            name: "Mr. Sandeep Kumar Jaisawal",
            role: "Founder & Lead Strategist",
            description:
                "Leading the company with vision and expertise, ensuring quality and business growth since its inception.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Sandeep",
        },
        {
            name: "Mr. Suryansh Jaisawal",
            role: "Operations & Office Management",
            description:
                "Oversees core operations, ensuring smooth coordination, efficiency, and excellence in daily business processes.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Suryansh",
        },
        {
            name: "Ms. Varnika Jaisawal",
            role: "Sales & Client Relations",
            description:
                "Dedicated to building strong client relationships and expanding the global outreach of the company.",
            image: "https://placehold.co/150x150/F0E6D8/5A4B40?text=Varnika",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="bg-cream rounded-lg p-0 md:p-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                    Meet Our Team
                </h2>
                <p className="text-base sm:text-lg text-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                    A dedicated team combining expertise in strategy, sales, and operations to deliver high-quality handmade carpets for global markets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            /> */}
                            <h3 className="font-semibold text-xl text-foreground mb-1">
                                {member.name}
                            </h3>
                            <p className="text-foreground text-opacity-80 mb-2">{member.role}</p>
                            <p className="text-foreground text-sm leading-relaxed">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTeam;
