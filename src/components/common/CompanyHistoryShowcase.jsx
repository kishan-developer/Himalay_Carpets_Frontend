import React from "react";
import { Building2, Users, Crown, Calendar } from "lucide-react";

const timelineData = [
    {
        period: "1987 - 2000",
        title: "Himalaya Rugs",
        description: "Founded under the guidance of ancestral wisdom",
        managers: ["Sandeep Kumar Jaisawal"],
        icon: <Building2 className="w-5 h-5" />,
    },
    {
        period: "2000 - 2023",
        title: "Himalaya Collection",
        description: "Expanded and managed with dedication",
        managers: ["Sandeep Kumar Jaisawal"],
        icon: <Crown className="w-5 h-5" />,
    },
    {
        period: "2023 - Present",
        title: "Himalaya Carpets",
        description: "Continuing the legacy with fresh vision",
        managers: ["Varnika Jaisawal", "Suryansh Jaisawal"],
        icon: <Users className="w-5 h-5" />,
        isActive: true,
    },
];

export default function CompanyTimeline() {
    return (
        <div className="w-full max-w-4xl mx-auto p-0 md:p-6">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance md:text-center text-left">
                    Our Legacy Through Generations
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto text-pretty md:text-center text-left">
                    From humble beginnings to generational excellence, discover how our
                    family business has evolved while maintaining its core values.
                </p>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-foreground h-full"></div>

                <div className="space-y-12">
                    {timelineData.map((event, index) => (
                        <div
                            key={index}
                            className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                            {/* Content card */}
                            <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                                <div
                                    className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${event.isActive ? "ring-2 ring-primary/30 border-primary/20" : ""
                                        }`}
                                >
                                    {/* Period badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                            {event.period}
                                        </span>
                                        {event.isActive && (
                                            <span className="text-xs font-medium text-primary-foreground bg-primary px-2 py-1 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    {/* Title with icon */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            {event.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground">
                                            {event.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-4 text-base text-pretty">
                                        {event.description}
                                    </p>

                                    {/* Managers */}
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground mb-2">
                                            {event.managers.length > 1
                                                ? "Managed by:"
                                                : "Founded & Managed by:"}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {event.managers.map((manager, managerIndex) => (
                                                <span
                                                    key={managerIndex}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground"
                                                >
                                                    {manager}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Spacer */}
                            <div className="w-2/12"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden relative">
                {/* Mobile vertical line */}
                <div className="absolute left-6 w-0.5 bg-foreground h-full top-0"></div>

                <div className="space-y-6">
                    {timelineData.map((event, index) => (
                        <div key={index} className="relative flex items-start">
                            {/* Timeline dot */}
                            <div className="absolute left-4 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 mt-2"></div>

                            {/* Content card */}
                            <div className="ml-12 flex-1">
                                <div
                                    className={`bg-card border border-border rounded-lg p-4 shadow-sm ${event.isActive ? "ring-2 ring-primary/30 border-primary/20" : ""
                                        }`}
                                >
                                    {/* Period badge */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                            {event.period}
                                        </span>
                                        {event.isActive && (
                                            <span className="text-xs font-medium text-primary-foreground bg-primary px-2 py-1 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    {/* Title with icon */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                            {event.icon}
                                        </div>
                                        <h3 className="text-base font-semibold text-foreground">
                                            {event.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-muted-foreground mb-3 text-sm text-pretty">
                                        {event.description}
                                    </p>

                                    {/* Managers */}
                                    <div>
                                        <h4 className="text-xs font-medium text-foreground mb-2">
                                            {event.managers.length > 1
                                                ? "Managed by:"
                                                : "Founded & Managed by:"}
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {event.managers.map((manager, managerIndex) => (
                                                <span
                                                    key={managerIndex}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                                                >
                                                    {manager}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 md:mt-12 p-4 md:p-6 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground text-sm md:text-base text-pretty">
                    <span className="font-medium text-foreground">Three generations, one vision.</span>{" "}
                    From Sandeep Kumar Jaisawal's founding vision under ancestral guidance to today's
                    third-generation leadership, our commitment to excellence continues to drive us
                    forward.
                </p>
            </div>
        </div>
    );
}
