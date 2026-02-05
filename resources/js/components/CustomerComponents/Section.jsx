import React, { useState, useRef, useEffect } from "react";
import SectionCard from "./SectionCard";
import { Link } from "@inertiajs/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function Section({
    sectionname,
    products = [],
    catid,
    overrideProducts = null,
}) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Determine which products to show
    // If overrideProducts is provided (like for the Offer section), use it.
    // Otherwise, filter the main products list by the category ID.
    const filteredProducts = overrideProducts
        ? overrideProducts
        : products.filter(
              (product) => Number(product.category_id) === Number(catid),
          );

    // Don't render anything if there are no products
    if (filteredProducts.length === 0) return null;

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        checkScrollButtons();
        if (currentRef) {
            currentRef.addEventListener("scroll", checkScrollButtons);
            window.addEventListener("resize", checkScrollButtons);
        }
        return () => {
            if (currentRef)
                currentRef.removeEventListener("scroll", checkScrollButtons);
            window.removeEventListener("resize", checkScrollButtons);
        };
    }, [filteredProducts]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount =
                direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white mt-5 dark:bg-[#0F1A0D] py-5 px-4 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex my-3 items-center justify-between">
                    <div className="font-bold  font-hindSiliguri text-xl dark:text-gray-200 md:text-2xl text-gray-800">
                        {sectionname}
                    </div>
                    {catid && (
                        <Link
                            href={`/category/${catid}`}
                            className="px-4 py-1 text-sm font-semibold text-green-700 border border-green-700 rounded-full hover:bg-green-700 hover:text-white transition-all"
                        >
                            View All
                        </Link>
                    )}
                </div>

                <div className="relative group">
                    <button
                        onClick={() => scroll("left")}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 dark:bg-gray-800/90 p-3 rounded-r-xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                            canScrollLeft
                                ? "opacity-100 visible translate-x-0"
                                : "opacity-0 invisible -translate-x-5"
                        } hover:bg-green-600 hover:text-white`}
                    >
                        <FaArrowLeft size={20} />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 dark:bg-gray-800/90 p-3 rounded-l-xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                            canScrollRight
                                ? "opacity-100 visible translate-x-0"
                                : "opacity-0 invisible translate-x-5"
                        } hover:bg-green-600 hover:text-white`}
                    >
                        <FaArrowRight size={20} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-4 md:gap-6 scrollbar-hide snap-x snap-mandatory py-2"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="w-[160px] sm:w-[220px] md:w-[260px] shrink-0 snap-start first:ml-1 last:mr-1"
                            >
                                <SectionCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`,
                }}
            />
        </div>
    );
}

export default Section;
