import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { BsCartPlusFill, BsFilter, BsX } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import FilterSidebar from "../../components/CustomerComponents/FilterSidebar";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import ReactPixel from "react-facebook-pixel";

function ProductWithCategory({ products, name }) {
    const { url } = usePage(); // Get current URL to parse query params if needed

    // Extract query params for initial state
    const queryParams = new URLSearchParams(window.location.search);
    const initialMin = queryParams.get("min_price") || "";
    const initialMax = queryParams.get("max_price") || "";
    const initialSort = queryParams.get("sort") || "default";

    // State
    const [minPrice, setMinPrice] = useState(initialMin);
    const [maxPrice, setMaxPrice] = useState(initialMax);
    const [sortBy, setSortBy] = useState(initialSort);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Sort Options
    const sortOptions = [
        { label: "Default", value: "default" },
        { label: "Newest First", value: "date_desc" },
        { label: "Oldest First", value: "date_asc" },
        { label: "Name A to Z", value: "name_asc" },
        { label: "Name Z to A", value: "name_desc" },
        { label: "Price High to Low", value: "price_desc" },
        { label: "Price Low to High", value: "price_asc" },
    ];

    // Handle Filter Apply
    const applyFilters = (newSort = sortBy, min = minPrice, max = maxPrice) => {
        router.get(
            window.location.pathname, //url, filters, options
            {
                sort: newSort,
                min_price: min,
                max_price: max,
            },
            { preserveScroll: true, preserveState: true },
        );
    };

    // Handle Sort Change
    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortBy(newSort);
        applyFilters(newSort, minPrice, maxPrice);
    };

    // Handle Price Apply
    const handlePriceFilter = () => {
        applyFilters(sortBy, minPrice, maxPrice);
    };

    // Handle Clear Filters
    const clearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setSortBy("default");
        router.get(window.location.pathname, {}, { preserveScroll: true });
    };

    const handleAddToCart = (productId) => {
        const productToAdd = products?.data?.find((p) => p.id === productId);

        if (productToAdd) {
            ReactPixel.track("AddToCart", {
                currency: "USD",
                value: productToAdd.price,
                content_name: productToAdd.name,
                content_ids: [productToAdd.id],
                content_type: "product",
            });
        }

        router.post(
            "/cart/add",
            { product_id: productId, quantity: 1 },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success("Successfully Added to Cart!"),
            },
        );
    };

    // Safety check
    if (!products || !products.data) return null;

    const hasActivePriceFilter = minPrice || maxPrice;

    return (
        <div className="min-h-screen  py-3 transition-colors duration-300">
            <Toaster />
            <div className="mx-auto max-w-[1200px]">
                <div className="mx-auto mt-5 px-4 sm:px-6 lg:px-8">
                    <div className="flex  flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Sidebar (Desktop) */}
                        <aside className="hidden  lg:block">
                            <FilterSidebar
                                minPrice={minPrice}
                                setMinPrice={setMinPrice}
                                maxPrice={maxPrice}
                                setMaxPrice={setMaxPrice}
                                onApplyPrice={handlePriceFilter}
                            />
                        </aside>

                        {/* RIGHT COLUMN: Main Content */}
                        <div className="flex-1">
                            {/* Header: Title & Sort */}
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 font-inter dark:text-white mb-2">
                                    {name}
                                </h1>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {products.total} items found in {name}
                                    </span>

                                    <div className="flex items-center gap-4">
                                        {/* Mobile Filter Toggle */}
                                        <button
                                            className=" lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition
"
                                            onClick={() =>
                                                setShowMobileFilter(true)
                                            }
                                        >
                                            <BsFilter size={16} />
                                            <span className="text-lg font-semibold">
                                                Filters
                                            </span>
                                        </button>

                                        {/* Sort Dropdown */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-inter text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                Sort By:
                                            </span>
                                            <select
                                                value={sortBy}
                                                onChange={handleSortChange}
                                                className="border border-gray-300 font-inter dark:border-gray-600 rounded p-2 text-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white min-w-[120px]"
                                            >
                                                {sortOptions.map((opt) => (
                                                    <option
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Filters Display */}
                                {hasActivePriceFilter && (
                                    <div className="mt-4 flex items-center gap-2 flex-wrap text-sm">
                                        <span className="text-gray-600 font-inter dark:text-gray-400">
                                            Filtered By:
                                        </span>
                                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                                            <span className="mr-2 font-inter dark:text-gray-200">
                                                Price: {minPrice || "0"} -{" "}
                                                {maxPrice || "∞"}
                                            </span>
                                            <button
                                                onClick={clearFilters}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                                    <BsX size={18} />
                                                </div>
                                            </button>
                                        </div>
                                        <button
                                            onClick={clearFilters}
                                            className="text-red-500 hover:underline text-sm font-medium font-inter ml-2"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* PRODUCT GRID */}
                            <div className="grid font-inter gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group relative flex flex-col bg-white dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-[#374151] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Discount Badge (Mocked based on image) */}
                                        {product.discount_price && (
                                            <span className="absolute top-0 right-0 bg-[#ff4d4f] text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
                                                -
                                                {Math.round(
                                                    ((product.price -
                                                        product.discount_price) /
                                                        product.price) *
                                                        100,
                                                )}
                                                %
                                            </span>
                                        )}

                                        <Link
                                            href={`/product/${product.id}`}
                                            className="flex flex-col h-full"
                                        >
                                            {/* Image Area */}
                                            <div className="relative h-48 w-full p-4 bg-white dark:bg-[#374151] flex items-center justify-center">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-3 flex flex-col flex-1 border-t border-gray-100 dark:border-gray-700">
                                                <h3 className=" font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-2 mb-1 group-hover:text-[#658C58] dark:group-hover:text-[#7CA66E] transition-colors ">
                                                    {product.name}
                                                </h3>

                                                <div className="mt-auto">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[#658C58] dark:text-[#7CA66E] text-lg">
                                                            ৳
                                                            {product.discount_price ||
                                                                product.price}
                                                        </span>
                                                        {product.discount_price && (
                                                            <span className="text-gray-400 text-xs line-through">
                                                                ৳{product.price}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Hover Add to Cart Button */}
                                        {/* <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product.id);
                                        }}
                                        className="absolute bottom-20 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                        title="Add to Cart"
                                    >
                                        <BsCartPlusFill size={18} />
                                    </button> */}

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(product.id);
                                            }}
                                            className="  absolute bottom-3 right-3  flex items-center justify-center  h-9 w-9 rounded-full  bg-white dark:bg-[#111827]  border border-gray-200 dark:border-[#374151]  text-gray-600 dark:text-gray-300 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300  hover:text-[#658C58] hover:shadow-md"
                                            title="Add to Cart"
                                        >
                                            <BsCartPlusFill size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            <div className="flex justify-center mt-10 gap-2 flex-wrap">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        preserveScroll
                                        preserveState // Keep filters when changing page
                                        className={`px-3 py-1 rounded text-sm font-medium transition-colors
                                        ${
                                            link.active
                                                ? "bg-blue-600 text-white border border-blue-600"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        }
                                        ${
                                            !link.url &&
                                            "opacity-50 cursor-not-allowed"
                                        }
                                    `}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                {showMobileFilter && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowMobileFilter(false)}
                        />
                        <div className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 shadow-xl overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold font-inter text-gray-800 dark:text-gray-100">
                                    Filters
                                </h2>

                                <button
                                    onClick={() => setShowMobileFilter(false)}
                                >
                                    <div className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                        <BsX size={18} />
                                    </div>
                                </button>
                            </div>
                            <FilterSidebar
                                minPrice={minPrice}
                                setMinPrice={setMinPrice}
                                maxPrice={maxPrice}
                                setMaxPrice={setMaxPrice}
                                onApplyPrice={() => {
                                    handlePriceFilter();
                                    setShowMobileFilter(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductWithCategory.layout = (page) => <CustomerLayout children={page} />;
export default ProductWithCategory;
