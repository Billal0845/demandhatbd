import React from "react";
import SectionCard from "./SectionCard";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function Section({ sectionname, products, catid }) {
    // Safety check if products is undefined
    if (!products) return null;

    products = products
        .filter((product) => Number(product.category_id) === catid)
        .slice(0, 5);

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        if (products.length - 4 === slide) return false;
        setSlide(slide + 1);
    };

    const prevSlide = () => {
        if (slide === 0) return false;
        setSlide(slide - 1);
    };
    return (
        <>
            <div className="bg-white mt-5 dark:bg-[#0F1A0D] py-10  px-4 ">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex my-3 items-center mx-auto  justify-between">
                        <div className="font-bold font-poppins text-xl dark:text-gray-200 md:text-2xl text-gray-800">
                            {sectionname}
                        </div>
                        <Link
                            href={`/category/${catid}`}
                            className="sm:hidden px-1 text-gray-900 hover:cursor-pointer bg-gray-200 p-2 rounded  hover:bg-green-700 hover:text-white"
                        >
                            View All
                        </Link>

                        {/* Hide arrows on mobile, show on desktop */}
                        <div className="hidden sm:flex">
                            <div
                                onClick={prevSlide}
                                className="cursor-pointer dark:text-black h-[30px] w-[30px] flex mx-2 justify-center items-center hover:bg-green-700 hover:text-white rounded-full bg-[#e2e2e7]"
                            >
                                <FaArrowLeft />
                            </div>
                            <div
                                onClick={nextSlide}
                                className="cursor-pointer h-[30px] dark:text-black w-[30px] flex mx-2 justify-center items-center hover:bg-green-700 hover:text-white rounded-full bg-[#e2e2e7]"
                            >
                                <FaArrowRight />
                            </div>

                            <Link
                                href={`/category/${catid}`}
                                className="px-2 py-1 text-gray-900 hover:cursor-pointer bg-gray-200  rounded  hover:bg-green-700 hover:text-white"
                            >
                                View All
                            </Link>
                        </div>
                    </div>

                    {/* Mobile: Native Scroll, Desktop: Transform Slider */}
                    <div className="flex overflow-x-auto md:overflow-hidden  gap-4 md:gap-10 scrollbar-hide">
                        {products.map((product, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-[150px] my-4  sm:w-[200px] md:w-[250px] shrink-0 duration-500"
                                    style={{
                                        // Only apply transform on medium screens and up
                                        transform: `translateX(-${
                                            slide * 100
                                        }%)`,
                                    }}
                                >
                                    <SectionCard product={product} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Section;
