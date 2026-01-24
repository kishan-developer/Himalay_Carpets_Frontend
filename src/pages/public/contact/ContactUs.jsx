import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import axiosInstance from "../../../utils/apiConnector";

const ContactUs = () => {
    // react-hook-form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [success, setSuccess] = useState(false);

    // Submit handler with axiosInstance
    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post("/contact", data);
            if (res.data?.success) {
                setSuccess(true);
                reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            alert("Message failed to send. Please try again later.");
        }
    };

    // Contact info cards data (from your company)
    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details: [
                "HIG II, Plot 5-12, Jamunipur Colony",
                "BHADOHI - 221401, U.P., INDIA",
            ],
        },
        {
            icon: Phone,
            title: "Sales Contact",
            details: [
                "Mr. Sandeep Jaiswal: +91-9335723032",
                "Mr. Suryansh Jaiswal: +91-7007596907",
                "Head Office: Ms. Varnika Jaiswal: +91-9918022212",
            ],
        },
        {
            icon: Mail,
            title: "Email",
            details: ["carpetshimalaya@gmail.com"],
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Monday - Friday: 9AM - 7PM", "Saturday: 10AM - 6PM", "Sunday: Closed"],
        },
    ];

    // use Effetc For Scroll 
    useEffect(() => {
        if (window.location.hash === "#contact-us-form") {
            document.getElementById("contact-us-form")?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);
    return (
        <div className="bg-white">
            {/* Header */}
            <section className="bg-[rgb(83,62,45)] py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                        Contact
                    </h1>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="border border-gray-200 p-4">
                                <div className="flex items-center mb-3">
                                    <info.icon className="w-5 h-5 text-[rgb(83,62,45)] mr-2" />
                                    <h3 className="font-bold text-[rgb(83,62,45)]">{info.title}</h3>
                                </div>
                                <div>
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-foreground text-sm mb-1">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-8 md:py-12 bg-gray-100" id="contact-us-form">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                            Send us a Message
                        </h2>

                        {/* Success message */}
                        {success && (
                            <div className="bg-green-100 text-green-800 text-sm p-3 mb-4 rounded">
                                Message sent successfully! We'll get back to you shortly.
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        {...register("name", {
                                            required: "Full Name is required",
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Enter a valid email",
                                            },
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        {...register("phone")}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Subject *</label>
                                    <select
                                        {...register("subject", {
                                            required: "Subject is required",
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="bulk-buy">Bulk Buy</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Customer Support</option>
                                        <option value="business">Business / Export Enquiry</option>
                                        <option value="sample-request">Sample / Design Request</option>
                                        <option value="custom-order">Custom Order</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                    {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                                <textarea
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    placeholder="Tell us how we can help you..."
                                />
                                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[rgb(83,62,45)] text-white py-2 px-4 font-medium disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Google Map (search by address) */}
            <section className="py-8 md:py-12 ">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.6006584085976!2d82.59422917438361!3d25.384697024082673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fde78ffef9bd1%3A0x330b0009b0b2fc26!2sHimalaya%20Concepts!5e0!3m2!1sen!2sin!4v1750658104862!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-84"
                ></iframe>
            </section>

            {/* FAQ */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "What are your shipping options?",
                                answer: "We offer standard shipping across India; timelines depend on the order size and destination. For international shipments, lead times vary — please contact sales for details.",
                            },
                            {
                                question: "Do you accept custom carpet orders?",
                                answer: "Yes — we specialise in custom designs, sizes and backing. Contact our sales team with your requirements and samples for a quote.",
                            },
                            {
                                question: "What is your return policy?",
                                answer: "Returns are accepted only for manufacturing defects or if the wrong product was shipped. Please inspect items on arrival and contact us immediately if there's an issue.",
                            },
                            {
                                question: "How can I request samples?",
                                answer: "Sample requests are welcome. Please use the contact form (subject: 'Sample / Design Request') or call our sales contacts for faster assistance.",
                            },
                            {
                                question: "What are your monthly production capacities?",
                                answer: "Approximate monthly capacity: Tufted carpets ~5000 sqm, Handloom rugs ~5000 sqm, Hand-knotted ~2000 sqm.",
                            },
                            {
                                question: "How should I care for my carpet?",
                                answer: "Regular vacuuming, spot-cleaning with mild detergent, and professional cleaning for deep care. Avoid prolonged exposure to direct sunlight and moisture.",
                            },
                            {
                                question: "How long does customization take?",
                                answer: "Custom finishes (like special fringes or tassels) typically add 2–4 working days depending on order size. We'll confirm exact lead times when you place the order.",
                            },
                            {
                                question: "How can I track my order?",
                                answer: "Once your order ships, you'll receive shipment/tracking details via email. For export shipments we provide AWB/BL details to track the consignment.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-4 border border-gray-200">
                                <h3 className="font-bold text-[rgb(83,62,45)] mb-2">{faq.question}</h3>
                                <p className="text-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Links */}
            <section className="py-8 md:py-12 bg-[rgb(83,62,45)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Connect With Us</h2>
                    <p className="text-white mb-6">Follow us on social media for updates and export / product news</p>
                    <div className="flex justify-center space-x-4">
                        <a href="https://www.facebook.com/himalayacarpets" target="_blank" rel="noreferrer">
                            <FaFacebook size={30} className="text-white cursor-pointer" />
                        </a>
                        <a href="https://www.linkedin.com/company/himalayacarpets" target="_blank" rel="noreferrer">
                            <FaLinkedin size={30} className="text-white cursor-pointer" />
                        </a>
                        <a href="https://pin.it/" target="_blank" rel="noreferrer">
                            <FaPinterest size={30} className="text-white cursor-pointer" />
                        </a>
                        <a href="https://www.instagram.com/himalaya.carpets/" target="_blank" rel="noreferrer">
                            <BsInstagram size={30} className="text-white cursor-pointer" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
