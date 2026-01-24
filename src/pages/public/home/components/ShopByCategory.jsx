import React, { useEffect, useMemo, useRef, useState } from "react";

function ShopByCategory() {
    const [toggaleBorder, setToggaleBorder] = useState(true);
    const containerRef = useRef();

    // Prev Handler
    function prevHandler() {
        setToggaleBorder(!toggaleBorder);
        containerRef.current.scrollLeft = -900;
    }
    // Next Handler
    function nextHandler() {
        setToggaleBorder(!toggaleBorder);
        containerRef.current.scrollLeft = 900;
    }

    const category = useMemo(() => [
        {
            title: "Banarasi Saree",
            path: "#",
            image: "https://themesflat.co/html/ecomus/images/collections/collection-14.jpg",
        },
        {
            title: "category 1",
            path: "#",
            image: "https://themesflat.co/html/ecomus/images/collections/collection-14.jpg",
        },
        {
            title: "category 3",
            path: "#",
            image: "https://themesflat.co/html/ecomus/images/collections/collection-14.jpg",
        },
        {
            title: "category 4",
            path: "#",
            image: "https://themesflat.co/html/ecomus/images/collections/collection-14.jpg",
        },
        {
            title: "category 5",
            path: "#",
            image: "https://themesflat.co/html/ecomus/images/collections/collection-14.jpg",
        },
    ]);

    return (
        <div className="boxedContainer w-full py-4  h-auto  overflow-x-hidden  mt-10">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex items-center gap-1">
                    {/* Prev Icon */}
                    <svg
                        onClick={toggaleBorder ? () => {} : prevHandler}
                        class={` w-8 h-8 text-gray-800  rounded-full p-1 cursor-pointer transition-all ease-linear duration-300  border ${
                            toggaleBorder
                                ? "border-gray-300"
                                : "border-gray-800"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m15 19-7-7 7-7"
                        />
                    </svg>
                    {/* Next Icon */}
                    <svg
                        onClick={toggaleBorder ? nextHandler : () => {}}
                        class={`w-8 h-8 text-gray-800  rounded-full p-1 cursor-pointer  transition-all ease-linear duration-300 border ${
                            toggaleBorder
                                ? "border-gray-800"
                                : "border-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m9 5 7 7-7 7"
                        />
                    </svg>
                </div>
                <h1 className="font-medium">SHOP BY CATEGORIES</h1>
            </div>
            {/* Card Container */}
            <div className="grid items-center mt-4 grid-cols-4 gap-6 transition-all duration-300 ease-linear">
                {/* Cards */}
                <div
                    ref={containerRef}
                    className="col-span-3  flex items-center gap-6 overflow-x-scroll  whitespace-normal cursor-grab scroll-smooth"
                    id="ShopByCategorySlider"
                >
                    {category.map((item) => (
                        <Card data={item} />
                    ))}
                </div>
                <div className="col-span-1 border border-gray-900 md:h-[350px] w-full  px-8 rounded-xl">
                    <div className="mt-46">
                        <h1 className=" tracking-wide text-2xl font-normal  max-w-[90%]">
                            Discovery all new items
                        </h1>
                        <svg
                            class="cursor-pointer w-12 h-12 text-gray-800 rounded-full border-black border p-2 mt-6 -rotate-45 hover:bg-black transition-all ease-linear duration-200 hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 12H5m14 0-4 4m4-4-4-4"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopByCategory;

function Card({ data }) {
    return (
        <div className=" md:h-[350px] w-[31.6%]  shrink-0 relative rounded-xl overflow-hidden">
            <img
                src={data.image}
                alt=""
                className="h-full w-full object-cover hover:scale-105 transition-all ease-linear duration-500"
            />
            <div className="absolute bottom-5 left-5">
                <CardButton text={data.title} />
            </div>
        </div>
    );
}

function CardButton({ text }) {
    return (
        <button className="flex items-center gap-1 px-6 py-3 text-gray-800  bg-white font-medium text-sm tracking-wide capitalize group transition-all duration-300 ease-linear hover:bg-gray-800 hover:text-white border border-gray-100">
            {text}{" "}
            <svg
                class="hidden cursor-pointer h-5 w-5 text-white  -rotate-45   group-hover:block opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all ease-linear duration-300 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                />
            </svg>
        </button>
    );
}
