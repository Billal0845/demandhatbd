import React, { useState } from "react";
import { FaPlay, FaChevronDown, FaChevronUp } from "react-icons/fa";

function FilterSidebar({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onApplyPrice,
    className = "",
}) {
    const [isPriceOpen, setIsPriceOpen] = useState(true);

    return (
        <div
            className={`w-full border px-2 shadow-sm  rounded font-inter lg:w-60 flex-shrink-0 ${className}`}
        >
            <h2 className=" mx-0 border-b  hidden sm:block font-bold font-inter text-dark dark:text-gray-100">
                Filter by
            </h2>
            {/* Price Filter Section (Active) */}
            <div className="border-b  border-gray-200 dark:border-gray-700 py-4">
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex text-sm w-full justify-between items-center text-gray-700 dark:text-gray-300  mb-3"
                >
                    <span>Price</span>
                    {isPriceOpen ? (
                        <FaChevronUp size={12} />
                    ) : (
                        <FaChevronDown size={12} />
                    )}
                </button>

                {isPriceOpen && (
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className=" w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600  bg-white dark:bg-[#111827] text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#658C58]
"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className=" w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600  bg-white dark:bg-[#111827] text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#658C58]
"
                        />
                        <button
                            onClick={onApplyPrice}
                            className="p-2 bg-[#658C58] text-white text-sm font-medium rounded hover:bg-[#527043] transition shadow-sm border "
                        >
                            <FaPlay size={10} />
                        </button>
                    </div>
                )}
            </div>
            {/* Visual Only: Category Section (Collapsed) */}
            {/* <div className="border-b border-gray-200 dark:border-gray-700 py-4">
                <button className="flex w-full font-inter justify-between items-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                    <span>Category</span>
                    <FaChevronDown size={12} />
                </button>
            </div> */}
            {/* Visual Only: Other Filters */}
            {["Brand", "Color"].map((filter) => (
                <div
                    key={filter}
                    className="border-b border-gray-200 dark:border-gray-700 py-4"
                >
                    <button className="flex w-full justify-between items-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                        <span>{filter}</span>
                        <FaChevronDown size={12} />
                    </button>
                </div>
            ))}
        </div>
    );
}
export default FilterSidebar;
