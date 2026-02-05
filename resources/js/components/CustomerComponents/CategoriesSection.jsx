import React from "react";
import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

function CategoriesSection({ categoriesComing, sectionName }) {
    const [categories, setCategories] = useState(categoriesComing || []);

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        if (categories.length - 8 === slide) return false;
        setSlide(slide + 3);
    };

    const prevSlide = () => {
        if (slide === 0) return false;
        setSlide(slide - 3);
    };

    return (
        <div className="bg-white mt-1 dark:bg-[#0F1A0D] py-5  px-4 ">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex my-3 items-center mx-auto  justify-between">
                    <div className="font-bold font-poppins text-xl dark:text-gray-200 md:text-2xl text-gray-800">
                        Top Categories
                    </div>
                    <Link
                        href={"/categories"}
                        className="sm:hidden px-1 text-gray-900 hover:cursor-pointer bg-gray-200 p-2 rounded  hover:bg-green-700 hover:text-white"
                    >
                        View All
                    </Link>

                    {/* Hide arrows on mobile, show on desktop */}
                    <div className="hidden md:flex">
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
                            href={"/categories"}
                            className="px-2 py-1 text-gray-900 hover:cursor-pointer bg-gray-200  rounded  hover:bg-green-700 hover:text-white"
                        >
                            View All
                        </Link>
                    </div>
                </div>

                {/* Mobile: Native Scroll, Desktop: Transform Slider */}
                <div className="flex overflow-x-auto md:overflow-hidden  gap-4 md:gap-10 scrollbar-hide">
                    {categories.map((cat, index) => {
                        return (
                            <div
                                key={index}
                                className="w-[100px] my-4  md:w-[120px] shrink-0 duration-500"
                                style={{
                                    // Only apply transform on medium screens and up
                                    transform: `translateX(-${slide * 100}%)`,
                                }}
                            >
                                {/* <img
                                src={
                                    "http://localhost:3000/images/" + cat.image
                                }
                                alt={cat.path}
                                className="w-full object-cover"
                            /> */}

                                <Link
                                    key={cat.id}
                                    href={`category/${cat.id}`}
                                    className="group w-full object-cover  my-5"
                                >
                                    <div
                                        className="
                                        h-full rounded-2xl p-5
                                        flex flex-col items-center justify-center text-center
                                        bg-white/90 dark:bg-gray-900/80
                                        border border-green-600 dark:border-gray-600
                                        backdrop-blur-xl
                                        
                                        shadow-sm
                                        transition-all duration-300
                                        hover:-translate-y-1 hover:shadow-xl
                                    "
                                    >
                                        {/* Icon */}
                                        <div
                                            className="
                                            mb-2 flex h-12 w-12  items-center justify-center rounded-full
                                            bg-[#658C58]
                                            text-white font-bold text-lg
                                            shadow-md
                                            transition-transform duration-300
                                            group-hover:scale-110 
                                        "
                                        >
                                            {cat.name.charAt(0)}
                                        </div>

                                        {/* Category Name */}
                                        <h3
                                            className="
                                            font-inter font-semibold
                                            text-gray-800 dark:text-gray-200
                                            transition-colors 
                                            group-hover:text-[#658C58]
                                        "
                                        >
                                            {cat?.name}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=" font-poppins font-medium p-1">
                Swipe Horizontally...
            </div>
        </div>
    );
}

export default CategoriesSection;
