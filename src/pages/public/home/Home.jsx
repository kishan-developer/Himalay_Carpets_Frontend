import React, { useMemo, Suspense } from "react";
import HomeHeroSlider from "./components/HomeHeroSlider";
import Second_Slider from "./components/Second_Slider";
import Banner1 from "../../../assets/images/slider/HC_1920X1080.jpg_1.jpg";
import Banner2 from "../../../assets/images/slider/HC_1920X1080.jpg_2.jpg";
import Banner3 from "../../../assets/images/slider/HC_1920X1080.jpg_3.jpg";
import Slide2Banner1 from "../../../assets/images/slider2/HC_1920X1080_2_a.jpg";
import Slide2Banner2 from "../../../assets/images/slider2/HC_1920X1080_2_b.jpg";
import Loader from "../../../components/common/Loader";
import Certifications from "../../../components/common/Certification";

// Lazy-load heavy sections
const HomeSection4 = React.lazy(() =>
    import("./components/HomeOnlyTwoSlideGrid")
);

const WhyChooseUs = React.lazy(() => import("./components/WhyChooseUs"));
const Home3Grid = React.lazy(() => import("./components/Home3Grid"));
const HomeVideo = React.lazy(() => import("./components/HomeVideo"));
const Home2BigGrid = React.lazy(() => import("./components/Home2BigGrid"));
const HomeAbout = React.lazy(() => import("./components/HomeAbout"));

// const HomeOneImageOnly = React.lazy(() =>
//     import("./components/HomeOneImageOnly")
// );

const HomeLetsExplore = React.lazy(() =>
    import("./components/HomeLetsExplore")
);
const LegalityPolicyPage = React.lazy(() =>
    import("./components/LegalityPolicyPage")
);

const HomeTeam = React.lazy(() =>
    import("./components/HomeTeam")
);
const HomeTestimonials = React.lazy(() =>
    import("./components/HomeTestimonials")
);
const HomeMakeYourOwnRugs = React.lazy(() =>
    import("./components/HomeMakeYourOwnRugs")
);

// Fallback loader
// const Loader = () => <div className="py-8 text-center">Loading section...</div>;

function Home() {
    // Himalaya Carpets  Slider Data 
    const sliderData1 = useMemo(
        () => [
            {
                image: Banner1,
                heading: "Elegance Beneath Your Feet",
                subheading: "Handwoven Luxury Carpets",
                paragraph:
                    "Transform your home with artisanal carpets that blend tradition with timeless design. Every weave tells a story of heritage.",
            },
            {
                image: Banner2,
                heading: "Crafted for Comfort",
                subheading: "Designs that Define Spaces",
                paragraph:
                    "From minimalist to majestic, our carpets are made to elevate your interiors — comfort and style woven together.",
            },
            {
                image: Banner3,
                heading: "Art You Can Walk On",
                subheading: "Where Tradition Meets Innovation",
                paragraph:
                    "Our carpets are more than décor, they’re masterpieces made by skilled hands, tailored to the modern lifestyle.",
            },
        ],
        []
    );

    const sliderData2 = useMemo(
        () => [
            {
                image: Slide2Banner1,
                heading: "Elegance Beneath Your Feet",
                subheading: "Handwoven Luxury Carpets",
                paragraph:
                    "Transform your home with artisanal carpets that blend tradition with timeless design. Every weave tells a story of heritage.",
            },
            {
                image: Slide2Banner2,
                heading: "Crafted for Comfort",
                subheading: "Designs that Define Spaces",
                paragraph:
                    "From minimalist to majestic, our carpets are made to elevate your interiors — comfort and style woven together.",
            },
        ],
        []
    );

    return (
        <div className="w-full h-full ">
            {/* Hero Slider */}
            <HomeHeroSlider sliderData={sliderData1} />

            {/* Sections */}
            <Suspense fallback={<Loader />} >
                <HomeAbout />
                <HomeVideo />
                <Home3Grid />  {/* Basically Its Hold 6 Cards Of Data*/}
                <HomeMakeYourOwnRugs />
                <LegalityPolicyPage />
                <Certifications />
                <HomeTeam />
                <HomeTestimonials />
                <Home2BigGrid />
            </Suspense>

            <div className="py-4">
                <Second_Slider textPosition={true} sliderData={sliderData2} />
            </div>

            <Suspense fallback={<Loader />}>
                <HomeSection4 />
                <HomeLetsExplore />
                <WhyChooseUs />
            </Suspense>
        </div>
    );
}

export default Home;
