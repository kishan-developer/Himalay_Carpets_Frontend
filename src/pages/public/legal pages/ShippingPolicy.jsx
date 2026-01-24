import React from "react";

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-cream text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-8">
                    Shipping Policy
                </h1>

                {/* Introduction */}
                <p className="text-base sm:text-lg text-foreground mb-6">
                    Himalaya Carpets India is committed to delivering your order
                    with high-quality packaging and within the promised time
                    frame. We ship throughout the week, except Sundays and
                    public holidays. To ensure your carpet reaches you in perfect
                    condition, we use only reputed courier and logistics partners.
                </p>

                {/* Shipping Details */}
                <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Shipping Details
                    </h2>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            <span className="font-semibold">Free Shipping</span> is
                            available on all orders within India.
                        </li>
                        <li>
                            If a custom carpet design or special finishing is
                            requested, the delivery timeline may extend by 5–7
                            additional working days.
                        </li>
                        <li>
                            All carpets displayed on{" "}
                            <a
                                href="https://himalayacarpetsindia.com"
                                className="text-foreground hover:text-primary"
                            >
                                himalayacarpetsindia.com
                            </a>{" "}
                            are stocked in our warehouses or made-to-order, depending
                            on the product description.
                        </li>
                        <li>
                            Ready stock orders are dispatched within{" "}
                            <span className="font-semibold">3-5 working days</span>.
                        </li>
                        <li>
                            You will receive an email with tracking information once
                            your order is shipped.
                        </li>
                        <li>
                            Once shipped, please allow{" "}
                            <span className="font-semibold">5-10 business days</span>{" "}
                            for delivery within India.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Delay in Dispatch
                    </h2>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            If there is a delay in dispatch due to natural calamities,
                            public holidays, or unforeseen circumstances, Himalaya
                            Carpets India shall not be liable for cancellations or
                            exchanges.
                        </li>
                        <li>
                            If a delay occurs due to a product being out of stock or
                            production delays, we will contact you via email at{" "}
                            <a
                                href="mailto:carpetshimalaya@gmail.com"
                                className="text-foreground hover:text-primary"
                            >
                                carpetshimalaya@gmail.com
                            </a>
                            . You may choose to wait, select alternate products, or
                            opt for a store credit or refund.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Contact Information
                    </h2>
                    <div className="text-base sm:text-lg text-foreground bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p className="font-semibold">Himalaya Carpets India</p>
                        <p>2nd Floor, C.K 20/9,</p>
                        <p>Shetla Katra Thatheri Bazar,</p>
                        <p>Varanasi, Uttar Pradesh 221010,</p>
                        <p>India</p>
                        <p>
                            Phone:{" "}
                            <a
                                href="tel:+918960500991"
                                className="text-foreground hover:text-primary"
                            >
                                (+91)9918022212
                            </a>
                        </p>
                        <p>
                            Phone:{" "}
                            <a
                                href="tel:+916307116564"
                                className="text-foreground hover:text-primary"
                            >
                                (+91) 63071 16564
                            </a>
                        </p>
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:carpetshimalaya@gmail.com"
                                className="text-foreground hover:text-primary"
                            >
                                carpetshimalaya@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-foreground mt-8 text-center">
                    For any questions about our Shipping Policy, please contact us
                    at{" "}
                    <a
                        href="mailto:carpetshimalaya@gmail.com"
                        className="text-foreground hover:text-primary"
                    >
                        carpetshimalaya@gmail.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
