import React from "react";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[#fdf9f9] text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-8">
                    Refund & Exchange Policy
                </h1>

                {/* Intro */}
                <p className="text-base sm:text-lg mb-6 text-center leading-relaxed">
                    At <span className="font-semibold">Himalaya Carpets</span>, we take pride in delivering premium quality handmade carpets.
                    Due to the artisanal and delicate nature of our products, we follow a strict return & exchange policy.
                    Please read the terms carefully before making a request.
                </p>

                {/* Conditions */}
                <section className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Return & Exchange Conditions</h2>
                    <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                        <li>No returns or exchanges for items purchased in the <span className="font-semibold">Special Price</span> category.</li>
                        <li>Products are ineligible for return or exchange if customized or altered in any way.</li>
                        <li>Only accepted for <span className="font-semibold">manufacturing defects</span> or <span className="font-semibold">incorrect items</span> shipped.</li>
                        <li>As our products are handmade, exchanges are permitted only in extreme circumstances.</li>
                    </ul>

                    {/* Process */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Return & Exchange Process</h2>
                    <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                        <li>Email your request to{" "}
                            <a href="mailto:carpetshimalaya@gmail.com" className="text-foreground font-semibold">
                                carpetshimalaya@gmail.com
                            </a>{" "}
                            within <span className="font-semibold">24 hours</span> of delivery with clear photos of the issue.
                        </li>
                        <li>Items must be unused, unwashed, unaltered, and in original packaging with all tags intact.</li>
                        <li>The original invoice must be included in the package.</li>
                        <li>Returns must be shipped via Blue Dart or DTDC only. Packages from other couriers will not be accepted.</li>
                        <li>Himalaya Carpets reserves the right to approve or reject a request after inspection.</li>
                        <li>If a package appears tampered with, please refuse delivery.</li>
                    </ul>

                    {/* Refund */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Refund & Credit Notes</h2>
                    <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                        <li>Approved refunds for defective or incorrect products will be processed to your bank account within 10–15 working days.</li>
                        <li>No cash refunds. You may opt for a replacement or a store credit note for future purchases.</li>
                    </ul>

                    {/* Footer Note */}
                    <p className="text-sm text-center text-gray-600 mt-8">
                        For any questions, please email us at{" "}
                        <a href="mailto:carpetshimalaya@gmail.com" className="text-foreground font-semibold">
                            carpetshimalaya@gmail.com
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default RefundPolicy;
