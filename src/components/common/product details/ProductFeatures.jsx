import { Sparkles, Scissors, Award, Leaf, Zap, Gift } from "lucide-react";

/**
 * ProductFeatures Component
 * Displays key product features with icons and descriptions
 */
function ProductFeatures({ product }) {
    const features = [
        {
            icon: Sparkles,
            title: "Exceptional Craftsmanship",
            description: `Each carpet is meticulously handcrafted by skilled artisans, blending traditional techniques with modern product innovation for superior quality.`,
        },
        {
            icon: Award, // Changed icon from Scissors to Award for recognition/quality
            title: "Government Recognized Export House",
            description:
                "As an Indian government-recognized export house, we ensure compliance and timely exports to global markets, including Europe and the Americas.",
        },

        {
            icon: Leaf,
            title: "Ethical & Sustainable Practices",
            description:
                "We are committed to responsible sourcing and production processes to limit environmental impact and ensure ethical manufacturing.",
        },
        {
            icon: Gift, // Changed icon from Zap to Gift for bespoke/customized solutions
            title: "Bespoke & Series Production",
            description:
                "Our in-house R&D and design teams work closely with clients to develop and deliver customized and series-production carpets.",
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-0 lg:p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
                Why Choose Himalaya Carpets?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-foreground">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFeatures;
