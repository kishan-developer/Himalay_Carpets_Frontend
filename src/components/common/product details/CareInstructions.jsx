import { Check } from "lucide-react";

/**
 * CareInstructions Component
 * Displays product care and maintenance instructions
 */
function CareInstructions() {
    const careCategories = [
        {
            title: "Cleaning & Washing",
            instructions: [
                "Professional dry cleaning recommended for all handmade carpets to preserve integrity.",
                "Avoid machine washing, steaming, or using harsh chemical cleaners.",
                "Immediately blot spills with a clean, dry cloth; do not rub.",
                "For minor spots, use a mild carpet cleaner and a soft brush, testing on an inconspicuous area first."
            ],
        },
        {
            title: "Daily Care & Maintenance",
            instructions: [
                "Regularly vacuum your carpet with a low-power setting to remove dust and debris.",
                "Rotate your carpet periodically to ensure even wear and exposure to light.",
                "Place a rug pad underneath to prevent slipping and extend the life of your carpet.",
                "Keep away from direct, prolonged sunlight to prevent fading."
            ],
        },
        {
            title: "Storage",
            instructions: [
                "Store in a cool, dry, and well-ventilated area, away from direct sunlight and humidity.",
                "Roll the carpet tightly with the pile facing outwards to maintain its shape.",
                "Wrap the rolled carpet in breathable cotton or muslin cloth; avoid plastic covers.",
                "Ensure the carpet is clean and completely dry before storing to prevent mildew and odors.",
                "Do not use mothballs directly on the carpet; consider natural repellents like cedar wood."
            ],
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-0 lg:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Care Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {careCategories.map((category, index) => (
                    <div key={index} className="p-5 bg-foreground/5 rounded-sm">
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                            {category.title}
                        </h3>
                        <ul className="space-y-2 text-foreground">
                            {category.instructions.map((instruction, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                >
                                    <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareInstructions;
