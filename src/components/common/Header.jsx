import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import Search from "./Search";
import LoginSidebar from "./LoginSidebar";
import CartSidebar from "./CartSidebar";
import { setStepCount } from "../../redux/slices/cartSlice";
import LOGO from "../../assets/images/logo/HIMALAYA_CARPET_WHITE.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

const HEADER_HEIGHT = 80; // Matches Himalaya Carpet's height (h-20)
const TOP_BAR_HEIGHT = 40; // Height for the top bar

function Header() {
    // Refs & Redux selectors
    const headerRef = useRef(null);
    const menuRef = useRef(null); // mobile menu container ref
    const menuButtonRef = useRef(null); // hamburger button ref

    const categories = useSelector(
        (state) => state?.category?.categories || []
    );
    const { cartItems } = useSelector(
        (state) => state?.cart || { cartItems: [] }
    );
    const wishlistItems = useSelector((state) => state.wishlist || []);
    const token =
        useSelector((state) => state?.user?.token) ||
        localStorage.getItem("token");
    const role = useSelector((state) => state?.user?.user?.role);
    const fabrics = useSelector((s) => s.fabrics);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [optimisedFabricsLinks, setOptimisedFabricsLinks] = useState([]);
    const [optimisedCategoriesList, setOptimisedCategoriesList] = useState([]);

    useEffect(() => {
        if (!Array.isArray(categories) || !Array.isArray(fabrics)) return;
        // Sort to prioritize category named "All"
        const sorted = [...categories].sort((a, b) => {
            if (a.name.toLowerCase() === "all") return -1;
            if (b.name.toLowerCase() === "all") return 1;
            return 0;
        });
        // Generate category links
        const navLinks = sorted.map((item) => {
            const slug = slugify(item?.name || "N/A", {
                lower: true,
                strict: true,
            });
            return {
                title: item?.name || "N/A",
                _id: item?._id,
                path: `/products/${slug}/${item._id}`,
            };
        });
        // Generate fabric links
        const fabLinks = fabrics?.map((item) => {
            const slug = slugify(item?.title || "N/A", {
                lower: true,
                strict: true,
            });
            return {
                title: item?.title || "N/A",
                _id: item?._id,
                path: `/collection/${slug}/${item._id}`,
            };
        });
        setOptimisedFabricsLinks(fabLinks);
        setOptimisedCategoriesList(navLinks);
    }, [categories, fabrics]);

    // Navigation links
    const Links = [
        { title: "Home", path: "/" },
        {
            title: "Shop",
            path: "/product",
            subLinks: optimisedCategoriesList,
        },
        // {
        //     title: "Collection",
        //     path: "/collection",
        //     subLinks: optimisedFabricsLinks,
        // },
        { title: "Gallery", path: "/gallery " },
        { title: "About Us ", path: "/about" }
        // { title: "Contact", path: "/contact" },
    ];

    // State for sidebars & mobile menu
    const [isSearching, setIsSearching] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const toggleSubmenu = (title) =>
        setOpenSubmenu(openSubmenu === title ? null : title);

    // Handlers
    const handleAccountClick = () => {
        if (token) {
            if (role === "user") navigate("/account/dashboard");
            else navigate("/admin/overview");
        } else if (location.pathname !== "/login") {
            setIsLogin(true);
        }
    };
    const handleCartClick = () => {
        if (location.pathname === "/cart") return;
        if (token) {
            dispatch(setStepCount(1));
            navigate("/cart");
        } else {
            setIsCartOpen(true);
        }
    };

    // Hide on scroll down, show on scroll up
    const { scrollY } = useScroll();
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (currentY) => {
            const diff = currentY - lastScrollY.current;
            if (diff > 5 && currentY > HEADER_HEIGHT + TOP_BAR_HEIGHT) {
                setShowHeader(false);
            } else if (diff < -5) {
                setShowHeader(true);
            }
            lastScrollY.current = currentY;
        });

        return () => unsubscribe(); // clean up on unmount
    }, [scrollY]);

    // Motion variants for header animation
    const headerVariants = {
        visible: { y: 0, transition: { duration: 0.3 } },
        hidden: { y: `-${TOP_BAR_HEIGHT + HEADER_HEIGHT}px`, transition: { duration: 0.3 } },
    };

    // --- Close mobile menu when clicking outside or scrolling ---
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleOutsideClick = (e) => {
            const target = e.target;
            // if click/touch is inside menu, do nothing
            if (menuRef.current && menuRef.current.contains(target)) return;
            // if click/touch is on the hamburger button, do nothing (button toggles)
            if (menuButtonRef.current && menuButtonRef.current.contains(target)) return;
            // otherwise close menu
            setIsMenuOpen(false);
        };

        const handleScroll = () => {
            if (isMenuOpen) setIsMenuOpen(false);
        };

        // listen for mouse and touch (mobile)
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick, { passive: true });
        // close on any page scroll
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMenuOpen]);

    // computed spacing so menu sits below full header (top bar + header)
    const menuTopPx = TOP_BAR_HEIGHT + HEADER_HEIGHT;
    const menuMaxHeightCalc = `calc(100vh - ${menuTopPx}px)`;

    return (
        <>
            {/* Spacer to prevent content overlap */}
            <div style={{ height: HEADER_HEIGHT + TOP_BAR_HEIGHT }} aria-hidden="true" />

            {/* Top Bar */}
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={headerVariants}
                className="fixed top-0 left-0 right-0 z-50 bg-foreground text-white h-10 flex items-center justify-between px-4 sm:px-10"
            >
                <div className="flex items-center gap-2">

                    <a
                        href="https://www.instagram.com/himalaya.carpets/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-primary transition-colors"
                    >
                        <FaInstagram className="w-5 h-5" />
                    </a>

                    <a
                        href="http://linkedin.com/in/sandeep-jaiswal-9469a92a0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-primary transition-colors"
                    >
                        <FaLinkedin className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="tel:9918022212"
                        aria-label="Call us"
                        className="hover:text-primary transition-colors"
                    >
                        <IoMdCall className="w-5 h-5" />
                    </a>
                    <a
                        href="https://wa.me/919918022212?text=Hello%20Team%20Himalaya%20Carpets%2C%20I%20hope%20you%27re%20doing%20well.%20I%20would%20like%20to%20get%20in%20touch%20regarding%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp us"
                        className="hover:text-primary transition-colors"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                    </a>
                </div>
            </motion.div>

            {/* Main Header */}
            <AnimatePresence>
                {showHeader && (
                    <motion.header
                        ref={headerRef}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={headerVariants}
                        className="fixed top-[40px] left-0 right-0 z-50 bg-white text-foreground px-4 sm:px-10 h-20 shadow border-b border-gray-300 flex items-center justify-between"
                    >
                        {/* Desktop Nav (md and up) */}
                        <nav className="hidden md:flex gap-6 text-foreground font-medium text-sm lg:text-[14px] tracking-wide uppercase">
                            {Links.map((link) => (
                                <div
                                    key={link.title}
                                    className="relative group"
                                >
                                    {link.subLinks ? (
                                        <div className="flex items-center gap-1 cursor-pointer text-nowrap">
                                            <span className="hover:text-primary transition-colors">
                                                {link.title}
                                            </span>
                                            <svg
                                                className="w-4 h-4 text-foreground group-hover:rotate-180 transition-transform duration-300"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m19 9-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            end
                                            className={({ isActive }) =>
                                                `hover:text-primary transition-colors ${isActive
                                                    ? "text-primary"
                                                    : ""
                                                }`
                                            }
                                        >
                                            {link.title}
                                        </NavLink>
                                    )}

                                    {link.subLinks && (
                                        <div className="absolute left-0 top-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            <div className="bg-white shadow-sm border border-gray-200 rounded-md flex flex-col gap-2 p-4 w-fit text-sm">
                                                {link.subLinks.map(
                                                    (sublink) => (
                                                        <NavLink
                                                            key={sublink._id}
                                                            to={sublink.path}
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                `hover:text-primary text-nowrap ${isActive
                                                                    ? "text-primary font-semibold"
                                                                    : ""
                                                                }`
                                                            }
                                                        >
                                                            {sublink.title}
                                                        </NavLink>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 mr-48">
                            <img
                                src={LOGO}
                                alt="Himalaya carpets Fab Logo"
                                className="h-12 sm:h-16 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Icons */}
                        <div className="hidden md:flex items-center gap-2 sm:gap-3">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearching(true)}
                                className="p-1.5"
                                aria-label="Open search"
                            >
                                <svg
                                    className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </button>

                            {/* Account */}
                            <button
                                onClick={handleAccountClick}
                                className="p-1.5"
                                aria-label="Open login"
                            >
                                <svg
                                    className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </button>

                            {/* Cart */}
                            <button
                                onClick={handleCartClick}
                                className="p-1.5 relative"
                                aria-label="Open cart"
                            >
                                <svg
                                    className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                                    />
                                </svg>
                                {cartItems?.length > 0 && (
                                    <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                        {cartItems.length}
                                    </div>
                                )}
                            </button>

                            {/* Wishlist */}
                            <button
                                onClick={() => {
                                    if (location.pathname !== "/wishlist")
                                        navigate("/wishlist");
                                }}
                                className="p-1.5 relative"
                                aria-label="Open wishlist"
                            >
                                <svg
                                    className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                </svg>
                                {wishlistItems?.length > 0 && (
                                    <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                        {wishlistItems.length}
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Hamburger (mobile only) */}
                        <button
                            ref={menuButtonRef}
                            className="md:hidden p-1.5 focus:outline-none absolute right-4 top-1/2 -translate-y-1/2"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg
                                className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16m-7 6h7"
                                    }
                                />
                            </svg>
                        </button>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop - clicking it closes the mobile menu */}
                        <motion.div
                            key="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.35 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        <motion.nav
                            key="mobile-menu"
                            ref={menuRef}
                            initial={{ y: "-6%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-6%", opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            // position the menu BELOW the full header so it won't overlap logo
                            style={{
                                position: "fixed",
                                left: 0,
                                right: 0,
                                top: `${menuTopPx}px`,
                                maxHeight: menuMaxHeightCalc,
                                zIndex: 50,
                            }}
                            className="bg-white border-t border-gray-200 overflow-y-auto"
                        >
                            <div className="flex flex-col px-4 py-3">
                                {/* Links */}
                                {Links.map((link) => (
                                    <div key={link.title} className="py-2">
                                        <div className="flex justify-between items-center capitalize ">
                                            {link.subLinks ? (
                                                <span className="text-foreground text-sm tracking-wider capitalize text-nowrap">
                                                    {link.title}
                                                </span>
                                            ) : (
                                                <NavLink
                                                    to={link.path}
                                                    end
                                                    className={({ isActive }) =>
                                                        `text-foreground text-sm tracking-wider capitalize text-nowrap ${isActive
                                                            ? "text-primary font-semibold"
                                                            : ""
                                                        }`
                                                    }
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.title}
                                                </NavLink>
                                            )}
                                            {link.subLinks && (
                                                <button
                                                    onClick={() =>
                                                        toggleSubmenu(link.title)
                                                    }
                                                    className="p-1"
                                                    aria-label={`Toggle ${link.title} submenu`}
                                                    aria-expanded={openSubmenu === link.title}
                                                    aria-controls={`${link.title}-submenu`}
                                                >
                                                    <svg
                                                        className={`w-4 h-4 transition-transform duration-300 ${openSubmenu === link.title
                                                            ? "rotate-180"
                                                            : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {link.subLinks &&
                                            openSubmenu === link.title && (
                                                <div id={`${link.title}-submenu`} className="mt-2 flex flex-col gap-2 pl-2">
                                                    {link.subLinks.map((sublink) => (
                                                        <NavLink
                                                            key={sublink._id}
                                                            to={sublink.path}
                                                            className={({ isActive }) =>
                                                                `capitalize text-xs text-nowrap text-foreground hover:text-primary px-3 py-2 rounded-md ${isActive
                                                                    ? "text-primary font-semibold"
                                                                    : ""
                                                                }`
                                                            }
                                                            onClick={() =>
                                                                setIsMenuOpen(false)
                                                            }
                                                        >
                                                            {sublink.title}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                ))}

                                {/* Divider */}
                                <div className="mt-4 border-t border-gray-200"></div>

                                {/* Icons Section */}
                                <div className="mt-4 flex flex-col gap-4">
                                    <button
                                        onClick={() => {
                                            setIsSearching(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="text-sm">Search</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleAccountClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                        <span className="text-sm">Account</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleCartClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                                            />
                                        </svg>
                                        {cartItems?.length > 0 && (
                                            <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                                {cartItems.length}
                                            </div>
                                        )}
                                        <span className="text-sm">Cart</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (location.pathname !== "/wishlist")
                                                navigate("/wishlist");
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                            />
                                        </svg>
                                        {wishlistItems?.length > 0 && (
                                            <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                                {wishlistItems.length}
                                            </div>
                                        )}
                                        <span className="text-sm">Wishlist</span>
                                    </button>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>

            {/* Sidebars */}
            <AnimatePresence>
                {isSearching && (
                    <Search
                        closeHandler={() => setIsSearching(false)}
                        isOpen={isSearching}
                    />
                )}
                {isLogin && location.pathname !== "/login" && (
                    <LoginSidebar
                        closeHandler={() => setIsLogin(false)}
                        isOpen={isLogin}
                    />
                )}
                {isCartOpen && (
                    <CartSidebar
                        closeHandler={() => setIsCartOpen(false)}
                        isOpen={isCartOpen}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Header;
