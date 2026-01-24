import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/apiConnector";
import { handleAxiosError } from "../../utils/handleAxiosError";
import LOGO from "../../assets/images/logo/HIMALAYA_CARPET_WHITE.png";
import { BsInstagram } from "react-icons/bs";

import {
    FaFacebookF,
    FaLinkedin,
    FaInstagram,
    FaPinterest,
    FaChevronUp,
} from "react-icons/fa";

const primaryColor = "rgb(83, 62, 45)";

const Footer = () => {
    // Get categories from Redux state. Default to an empty array if undefined.
    const categories = useSelector((state) => state.category.categories) || [];

    // Destructure functions from useForm hook for newsletter subscription.
    const { register, handleSubmit, reset } = useForm();

    // Handler for newsletter subscription form submission.
    const subscribeNewsHandler = async (data) => {
        const toastId = toast.loading("Please wait..."); // Show loading toast
        try {
            // Send POST request to subscribe to the newsletter.
            await axiosInstance.post("/newsletter", data);
            toast.success("Thanks for subscribing!"); // Show success toast
            reset(); // Reset the form fields
        } catch (error) {
            handleAxiosError(error); // Handle Axios specific errors
        } finally {
            toast.dismiss(toastId); // Dismiss the loading toast regardless of success or failure
        }
    };

    // Array of social media links and their corresponding icons.
    const socials = [

        {
            icon: FaLinkedin,
            link: "http://linkedin.com/in/sandeep-jaiswal-9469a92a0/", // Placeholder link
        },

        {
            icon: BsInstagram,
            link: "https://www.instagram.com/himalaya.carpets/" // Placeholder link
        }
    ];

    // Sort categories to place 'all' first.
    // This creates a new array so the original categories array from Redux is not mutated.
    const sortedCategories = [...categories].sort((a, b) => {
        if (a.name.toLowerCase() === 'all') return -1; // 'all' comes first
        if (b.name.toLowerCase() === 'all') return 1;  // 'all' comes first
        return 0; // Maintain original order for other categories
    });

    return (
        <footer
            className="bg-[#E4E4E4] pt-12 pb-4"
            style={{ color: primaryColor }} // Apply primary color for text
        >
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Info Section */}
                    <div>
                        <img
                            src={LOGO}
                            alt="Himalaya Carpets Logo" // Updated alt text for clarity
                            className="mb-3 relative h-[80px] w-[80px]"
                        />
                        <p
                            className="text-sm mb-2"
                        >
                            Himalaya Carpets Pvt. Ltd.
                            <br />
                            JAMUNIPUR COLONY, NEAR KATYANI DEVI TEMPLE, BIDA COLONY BHADOHI
                            , UP, India – 221401
                        </p>
                        <p className="text-sm mb-2"><b>Email : </b> carpetshimalaya@gmail.com</p>
                        <p className="text-sm"> <b>Phone :</b>+91 99180 22212</p>
                        <div className="flex space-x-3 mt-7">
                            {socials.map((item, idx) => (
                                <a
                                    href={item.link}
                                    key={idx}
                                    target="_blank"
                                    rel="noreferrer" // Security best practice for target="_blank"
                                    className="hover:opacity-70 transition-opacity"
                                    style={{ color: primaryColor }} // Apply primary color for social icons
                                >
                                    <item.icon className="w-5 h-5" /> {/* Render the icon component */}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links Section */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links Section */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/refund-policy">Refund Policy</Link></li>
                            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                            <li><Link to="/terms-of-service">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Our Products - Dynamic Categories Section */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Our Products</h3>
                        <ul className="space-y-2 text-sm">
                            {/* Map through the sorted categories to display product links */}
                            {Array.isArray(sortedCategories) && sortedCategories.map((cat) => {
                                const slug = slugify(cat.name, { lower: true }); // Generate SEO-friendly slug
                                return (
                                    <li key={cat._id}>
                                        <Link
                                            className="capitalize"
                                            to={`/products/${slug}/${cat._id}`} // Link to specific product category page
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Newsletter Subscription Section */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">Subscribe</h3>
                        <p className="text-sm mb-4">
                            Get updates on new designs, promotions & interior tips.
                        </p>
                        <form
                            onSubmit={handleSubmit(subscribeNewsHandler)} // Handle form submission
                            className="flex flex-col sm:flex-row gap-2 mb-4"
                        >
                            <input
                                {...register("email")} // Register email input with react-hook-form
                                type="email"
                                required
                                placeholder="Your email address"
                                className="w-full p-2 border outline-foreground focus:ring-2 focus:ring-foreground focus:rounded-none"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 bg-[rgb(83,62,45)] text-white font-medium"
                            >
                                JOIN
                            </button>
                        </form>
                        <p className="text-sm font-medium mb-2">
                            Secure payments
                        </p>
                        <img
                            src="https://uomo-html.flexkitux.com/images/payment-options.png"
                            alt="Accepted Payment Methods" // Updated alt text for clarity
                            className="h-6 object-contain"
                        />
                    </div>
                </div>

                {/* Footer Bottom Section - Copyright and Back to Top */}
                <div className="border-t pt-4 text-sm flex flex-col sm:flex-row justify-between items-center">
                    <a href="https://mediafleetblue.com/" target="_blank" rel="noreferrer">
                        Made with ❤️ by Media Fleetblue.
                    </a>
                    <a
                        href="#top" // Scrolls to the top of the page (assuming an element with id="top" exists)
                        className="mt-4 sm:mt-0 flex items-center gap-1 hover:underline"
                    >
                        Back to Top <FaChevronUp /> {/* Back to top icon */}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
