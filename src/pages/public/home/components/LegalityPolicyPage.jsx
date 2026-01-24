import React from "react";
import { Truck, Scale, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

function LegalityPolicyPage() {
    return (
        <div className="min-h-screen bg-cream text-foreground py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
                    Our Policies
                </h1>

                {/* Introduction */}
                <p className="text-base sm:text-lg text-foreground mb-10 text-center leading-relaxed">
                    At Himalaya Carpets, we are committed to transparency and clarity in all our operations. Below you'll find brief summaries of our key policies. For comprehensive details, please refer to the full policy documents.
                </p>

                {/* Policy Sections */}
                <div className="space-y-10">
                    {/* Shipping Policy Summary */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Truck className="w-8 h-8 text-foreground mr-3 flex-shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Shipping Policy
                            </h2>
                        </div>
                        <p className="text-base text-foreground leading-relaxed mb-4">
                            Himalaya Carpets is an Indian government-recognised export house, committed to delivering your orders with high-quality packaging and within the agreed-upon timeframe. We partner with reputed international logistics providers to ensure seamless global delivery to our wholesalers and multi-store retailers across Europe and the Americas. Shipping costs and timelines are negotiated on a per-client or per-order basis.
                        </p>
                        <Link to={'/shipping-policy'} className="text-foreground hover:underline font-medium">
                            Read Full Shipping Policy &rarr;
                        </Link>
                    </div>

                    {/* Terms of Service Summary */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <Scale className="w-8 h-8 text-foreground mr-3 flex-shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Terms of Service
                            </h2>
                        </div>
                        <p className="text-base text-foreground leading-relaxed mb-4">
                            These terms and conditions govern all use of the himalayacarpetsindia.com website. By accessing or using any part of the Website, you agree to be bound by these terms. This includes guidelines on content, intellectual property, payments (where applicable), and dispute resolution, ensuring a fair and clear framework for all interactions.
                        </p>
                        <Link
                            to={'/terms-of-service'}
                            className="text-foreground hover:underline font-medium">
                            Read Full Terms of Service &rarr;
                        </Link>
                    </div>

                    {/* Future: Refund/Cancellation Policy Summary (Placeholder) */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-4">
                            <RefreshCcw className="w-8 h-8 text-foreground mr-3 flex-shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Refund & Cancellation Policy
                            </h2>
                        </div>
                        <p className="text-base text-foreground leading-relaxed mb-4">
                            Our commitment extends to clear and fair policies regarding returns, refunds, and cancellations. Specific terms may vary based on the nature of the order (ready stock vs. bespoke) and will be detailed in your purchase agreement.
                        </p>
                        {/* If you have a dedicated refund policy page, add the link here */}
                        <Link to={'/refund-policy'} className="text-foreground hover:underline font-medium">
                            Read Full Refund & Cancellation Policy &rarr;
                        </Link>
                        <p className="text-sm text-gray-600">
                            For details, please refer to your specific order agreement or contact our sales team.
                        </p>
                    </div>

                </div>

                {/* Contact Note */}
                <p className="text-base text-foreground mt-12 text-center">
                    Should you have any questions regarding these policies, please do not hesitate to contact us directly.
                </p>
            </div>
        </div>
    );
}

export default LegalityPolicyPage;
