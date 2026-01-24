import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-cream text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-8">
                    Privacy Policy
                </h1>

                {/* Introduction */}
                <p className="text-base sm:text-lg text-foreground mb-6">
                    This Privacy Policy describes how your personal information
                    is collected, used, and shared when you visit or make a
                    purchase from{" "}
                    <span className="font-semibold">Himalaya Carpets</span> (the
                    “Site” or “we”). By using our Site or contacting us, you
                    agree to the terms of this Privacy Policy.
                </p>

                <p className="text-base sm:text-lg text-foreground mb-6">
                    To enhance your browsing experience, you consent to third
                    parties processing your IP address to determine your
                    location for regional pricing and shipping purposes. You
                    also agree to have this preference stored in a session
                    cookie in your browser (a temporary cookie that is
                    automatically removed when you close your browser). This
                    helps provide consistent pricing and shipping information
                    during your visit.
                </p>

                {/* Personal Information We Collect */}
                <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Personal Information We Collect
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        When you visit the Site, we automatically collect
                        certain information about your device, including your
                        web browser, IP address, time zone, and cookies
                        installed on your device. As you browse, we collect data
                        about the web pages or products you view, referring
                        websites or search terms, and how you interact with the
                        Site. We refer to this as{" "}
                        <span className="font-semibold">Device Information</span>.
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        We collect Device Information using:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            <span className="font-semibold">Cookies</span>: Data
                            files placed on your device, often with a unique
                            identifier. For more information, visit{" "}
                            <a
                                href="http://www.allaboutcookies.org"
                                className="text-foreground hover:text-primary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.allaboutcookies.org
                            </a>
                            .
                        </li>
                        <li>
                            <span className="font-semibold">Log files</span>:
                            Track actions on the Site, collecting data like IP
                            address, browser type, Internet service provider,
                            referring/exit pages, and date/time stamps.
                        </li>
                        <li>
                            <span className="font-semibold">
                                Web beacons, tags, and pixels
                            </span>
                            : Electronic files that record how you browse the
                            Site.
                        </li>
                    </ul>
                    <p className="text-base sm:text-lg text-foreground">
                        When you make or attempt a purchase, or request samples
                        or quotes, we collect your name, billing address,
                        shipping address, payment information (where required),
                        email address, and phone number. We refer to this as{" "}
                        <span className="font-semibold">Order Information</span>.
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        In this Privacy Policy,{" "}
                        <span className="font-semibold">Personal Information</span>{" "}
                        refers to both Device Information and Order Information.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        How We Use Your Personal Information
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We use <span className="font-semibold">Order Information</span> to:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Fulfill orders (process payments, arrange shipping,
                            provide invoices/confirmations).
                        </li>
                        <li>Communicate with you about your order or inquiry.</li>
                        <li>Screen orders for potential risk or fraud.</li>
                        <li>
                            Provide product information, quotes, or marketing
                            communications based on your preferences (where you
                            have opted in).
                        </li>
                    </ul>
                    <p className="text-base sm:text-lg text-foreground">
                        We use <span className="font-semibold">Device Information</span> to:
                    </p>
                    <ul className="list-disc pl-6 text-base sm:text-lg text-foreground space-y-2">
                        <li>
                            Screen for potential risk and fraud (for example,
                            using your IP address).
                        </li>
                        <li>
                            Improve and optimize the Site (for example, via
                            analytics on customer browsing behavior and campaign
                            effectiveness).
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Sharing Your Personal Information
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We share Personal Information with trusted third parties
                        to support platform operations — for example: payment
                        processors, shipping partners, analytics providers, and
                        other service providers required to fulfil orders and
                        manage communications. We may also share information to
                        comply with laws or to protect our rights.
                    </p>
                    <p className="text-base sm:text-lg text-foreground">
                        Example: we use analytics tools to understand Site usage
                        and improve our service. See each provider’s privacy
                        policy for details on how they handle data.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Behavioral Advertising
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We may use Personal Information for targeted
                        advertisements or marketing communications that may
                        interest you. You can opt out of certain targeted
                        advertising via settings provided by the advertising
                        platforms (for example, Google Ads, Facebook Ads).
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Do Not Track
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We do not alter our Site’s data collection and use
                        practices when we detect a Do Not Track signal from your
                        browser.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Data Retention
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        When you place an order or contact us, we retain your
                        Order Information in our systems for as long as needed
                        to provide services, to comply with legal obligations,
                        and to resolve disputes. You may request deletion where
                        applicable by contacting us (details below).
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Changes
                    </h2>
                    <p className="text-base sm:text-lg text-foreground">
                        We may update this Privacy Policy to reflect changes in
                        our practices or legal requirements. Any updates will be
                        posted on the Site with an updated effective date.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                        Contact Us
                    </h2>
                    <div className="text-base sm:text-lg text-foreground bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p className="font-semibold">Himalaya Carpets</p>
                        <p>Corporate / Factory Address:</p>
                        <p>HIG II, Plot 5-12, Jamunipur Colony</p>
                        <p>BHADOHI - 221401, Uttar Pradesh, INDIA</p>
                        <p className="mt-3">
                            Sales Contact:
                        </p>
                        <p>
                            Mr. Sandeep Jaiswal:{" "}
                            <a href="tel:+919335723032" className="text-foreground hover:text-primary">
                                +91-9335723032
                            </a>
                        </p>
                        <p>
                            Mr. Suryansh Jaiswal:{" "}
                            <a href="tel:+917007596907" className="text-foreground hover:text-primary">
                                +91-7007596907
                            </a>
                        </p>
                        <p className="mt-2">
                            Head Office Contact:
                        </p>
                        <p>
                            Ms. Varnika Jaiswal:{" "}
                            <a href="tel:+919918022212" className="text-foreground hover:text-primary">
                                +91-9918022212
                            </a>
                        </p>

                        <p className="mt-3">
                            Email:{" "}
                            <a href="mailto:carpetshimalaya@gmail.com" className="text-foreground hover:text-primary">
                                carpetshimalaya@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-foreground mt-8 text-center">
                    For questions about our privacy practices, to request data
                    deletion, or to make a complaint, please contact us at{" "}
                    <a href="mailto:carpetshimalaya@gmail.com" className="text-foreground hover:text-primary">
                        carpetshimalaya@gmail.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
