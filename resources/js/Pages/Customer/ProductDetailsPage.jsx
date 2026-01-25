import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import React, { useState } from "react";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";
import { FiPhoneCall } from "react-icons/fi";

function ProductDetailsPage({ product = {} }) {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("details");

    // 1. Calculation Logic
    const discountPercentage = product.discount ? Number(product.discount) : 0;
    const originalPrice = Number(product.price);
    // Calculate discounted price: Price - (Price * Discount / 100)
    const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

    const handleAddToCart = () => {
        ReactPixel.track("AddToCart", {
            currency: "BDT", // Changed to BDT to match currency symbol (optional, usually matches store currency)
            value: discountedPrice, // 2. Track the actual price paid
            content_name: product.name,
            content_ids: [product.id],
            content_type: "product",
        });

        setLoading(true);
        router.post(
            "/cart/add",
            {
                product_id: product.id,
                quantity: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setLoading(false);
                    toast.success("Successfully Added to Cart!");
                },
            },
        );
    };

    return (
        <div className="bg-white w-full dark:bg-[#111827] min-h-screen py-6 sm:py-10 transition-colors duration-300">
            <Toaster />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 xl:gap-14">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl border border-green-700 dark:border-[#374151] bg-gray-100 dark:bg-[#1F2937] aspect-square xl:aspect-[5/4] shadow-lg">
                            {/* 3. Discount Badge - Top Left */}
                            <div className="absolute top-0 left-0 z-20 bg-orange-500 text-white text-sm sm:text-base font-bold px-3 py-1 rounded-br-lg shadow-sm">
                                {discountPercentage > 0
                                    ? `-${discountPercentage}%`
                                    : "0%"}
                            </div>

                            <img
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                src={`/storage/${product.image}`}
                                alt={product.name}
                            />

                            {product.stock <= 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                                    <span className="text-white font-bold text-xl sm:text-2xl xl:text-3xl uppercase tracking-widest border-2 sm:border-4 border-white px-4 py-2 sm:px-6 sm:py-3 -rotate-12">
                                        Out of Stock
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-[#F9FAFB] mb-4 md:mb-5 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                            {/* 4. Price Logic */}
                            <div className="flex items-baseline gap-3">
                                {/* Discounted Price */}
                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#658C58] dark:text-[#7CA66E]">
                                    TK{" "}
                                    {Math.round(
                                        discountedPrice,
                                    ).toLocaleString()}
                                </p>

                                {/* Original Price Strikethrough (only if discount exists) */}
                                {discountPercentage > 0 && (
                                    <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400 line-through decoration-gray-400">
                                        TK {originalPrice.toLocaleString()}
                                    </p>
                                )}
                            </div>

                            {/* Divider line for visual separation if needed, or just spacing */}
                            <span className="hidden sm:block text-gray-300">
                                |
                            </span>

                            <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${
                                    product.stock > 0
                                        ? "bg-[#E8F5E3] border-[#7CA66E] text-[#527043] dark:bg-[#374151] dark:text-[#8FBA81]"
                                        : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                            >
                                {product.stock > 0 ? (
                                    <>
                                        <CheckCircle
                                            size={14}
                                            className="sm:w-4 sm:h-4"
                                        />{" "}
                                        Available
                                    </>
                                ) : (
                                    <>
                                        <XCircle
                                            size={14}
                                            className="sm:w-4 sm:h-4"
                                        />{" "}
                                        Unavailable
                                    </>
                                )}
                            </span>
                        </div>

                        {product.quick_view && (
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-[#F9FAFB] mb-2">
                                    Quick Overview
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-[#D1D5DB] leading-relaxed whitespace-pre-line">
                                    {product.quick_view}
                                </p>
                            </div>
                        )}

                        <a
                            href="tel:01700000000"
                            className="py-2 flex items-center px-2 gap-2 justify-center rounded text-white bg-purple-900 hover:bg-purple-800 transition-colors"
                        >
                            <FiPhoneCall size={25} />
                            Call Us:{" "}
                            <span className="font-medium">01700000000</span>
                        </a>

                        <a
                            href="tel:01800000000"
                            className="py-2 flex mt-2 items-center px-2 gap-2 justify-center rounded text-slate-800 bg-yellow-500 hover:bg-yellow-400 transition-colors"
                        >
                            <FiPhoneCall size={25} />
                            Alternative:{" "}
                            <span className="font-medium">01800000000</span>
                        </a>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || loading}
                            className={`mt-2 flex items-center justify-center gap-2 py-2 sm:py-2 px-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 shadow-md
                                ${
                                    product.stock > 0
                                        ? "bg-[#658C58] hover:bg-[#527043] dark:bg-[#7CA66E] dark:hover:bg-[#8FBA81] text-white"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-[#374151]"
                                }`}
                        >
                            <ShoppingCart
                                size={20}
                                className="sm:w-[22px] sm:h-[22px]"
                            />
                            {loading
                                ? "Adding..."
                                : product.stock > 0
                                  ? "Add to Cart"
                                  : "Out of Stock"}
                        </button>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-10 sm:mt-14 rounded-xl bg-[#2D3E29] dark:bg-[#0F1A0D] p-5 sm:p-8">
                    <div className="h-10 flex gap-5 items-center mb-5">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`py-2 px-3 font-medium rounded text-white transition-all
            ${
                activeTab === "details"
                    ? "bg-green-500 underline"
                    : "bg-slate-400 hover:bg-slate-500"
            }`}
                        >
                            Details
                        </button>

                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`py-2 px-3 font-medium rounded text-white transition-all
            ${
                activeTab === "reviews"
                    ? "bg-green-500 underline"
                    : "bg-slate-400 hover:bg-slate-500"
            }`}
                        >
                            Reviews
                        </button>
                    </div>

                    {activeTab === "details" && (
                        <>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                                Product Details
                            </h2>
                            <div className="h-px bg-white/20 mb-4 sm:mb-6"></div>
                            <p className="text-sm sm:text-base text-[#D1D5DB] whitespace-pre-line leading-relaxed">
                                {product.description}
                            </p>
                        </>
                    )}

                    {activeTab === "reviews" && (
                        <div className="text-white">Review Ekhane Asbe</div>
                    )}
                </div>
            </div>
        </div>
    );
}

ProductDetailsPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetailsPage;
