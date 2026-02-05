import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import React, { useState, useEffect } from "react";
import {
    ShoppingCart,
    CheckCircle,
    XCircle,
    ShoppingBag,
    Eye,
} from "lucide-react";
import { router, Link } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";
import { FiPhoneCall } from "react-icons/fi";

function ProductDetailsPage({ product = {}, relatedProducts = [] }) {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("details");

    // NEW: State to track which image is currently displayed in the main view
    const [selectedImage, setSelectedImage] = useState(product.image);

    // Sync selectedImage if product prop changes
    useEffect(() => {
        setSelectedImage(product.image);
    }, [product.image]);

    // 1. Calculation Logic
    const discountPercentage = product.discount ? Number(product.discount) : 0;
    const originalPrice = Number(product.price);
    const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

    const handleAddToCart = (shouldRedirect = false) => {
        if (product.stock <= 0) return;

        ReactPixel.track("AddToCart", {
            currency: "BDT",
            value: discountedPrice,
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
                    if (shouldRedirect) {
                        router.visit("/checkout");
                    } else {
                        toast.success("Successfully Added to Cart!");
                    }
                },
                onError: () => setLoading(false),
            },
        );
    };

    return (
        <div className="bg-white w-full dark:bg-[#111827] min-h-screen py-6 sm:py-10 transition-colors duration-300">
            <Toaster />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 xl:gap-14">
                    {/* Image & Gallery Section */}
                    <div className="flex flex-col gap-4">
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-2xl border border-green-700 dark:border-[#374151] bg-gray-100 dark:bg-[#1F2937] aspect-square shadow-lg">
                                <div className="absolute top-0 left-0 z-20 bg-orange-500 text-white text-sm sm:text-base font-bold px-3 py-1 rounded-br-lg shadow-sm">
                                    {discountPercentage > 0
                                        ? `-${discountPercentage}%`
                                        : "0%"}
                                </div>

                                {/* Main Display Image (uses selectedImage state) */}
                                <img
                                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    src={`/storage/${selectedImage}`}
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

                        {/* GALLERY THUMBNAILS SECTION */}
                        {product.images && product.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {/* First Thumbnail (The Original Main Image) */}
                                <button
                                    onClick={() =>
                                        setSelectedImage(product.image)
                                    }
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === product.image
                                            ? "border-green-600 scale-105 shadow-md"
                                            : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img
                                        src={`/storage/${product.image}`}
                                        className="w-full h-full object-cover"
                                        alt="main-thumb"
                                    />
                                </button>

                                {/* Mapping through additional images */}
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setSelectedImage(img.image_path)
                                        }
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === img.image_path
                                                ? "border-green-600 scale-105 shadow-md"
                                                : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={`/storage/${img.image_path}`}
                                            className="w-full h-full object-cover"
                                            alt={`gallery-${index}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-[#F9FAFB] mb-4 md:mb-5 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                            <div className="flex items-baseline gap-3">
                                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#658C58] dark:text-[#7CA66E]">
                                    TK{" "}
                                    {Math.round(
                                        discountedPrice,
                                    ).toLocaleString()}
                                </p>

                                {discountPercentage > 0 && (
                                    <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400 line-through decoration-gray-400">
                                        TK {originalPrice.toLocaleString()}
                                    </p>
                                )}
                            </div>

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

                        {/* Call Buttons */}
                        <a
                            href="tel:01700000000"
                            className="py-2 flex shadow-md items-center px-2 gap-2 justify-center rounded text-white bg-purple-900 hover:bg-purple-800 transition-colors"
                        >
                            <FiPhoneCall size={25} />
                            কল করুন :{" "}
                            <span className="font-medium">01700000000</span>
                        </a>

                        <a
                            href="tel:01800000000"
                            className="py-2 flex mt-2 shadow-md items-center px-2 gap-2 justify-center rounded text-slate-800 bg-yellow-500 hover:bg-yellow-400 transition-colors"
                        >
                            <FiPhoneCall size={25} />
                            কল করুন:{" "}
                            <span className="font-medium">01800000000</span>
                        </a>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => handleAddToCart(false)}
                            disabled={product.stock <= 0 || loading}
                            className={`mt-2 flex items-center justify-center gap-2 py-2 sm:py-2 px-6 sm:px-8 rounded-sm text-base sm:text-lg font-semibold transition-all duration-300 shadow-md
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
                                ? "কার্টে যোগ করা হচ্ছে..."
                                : "কার্টে যোগ করুন"}
                        </button>

                        {/* Order Now Button */}
                        <button
                            onClick={() => handleAddToCart(true)}
                            disabled={product.stock <= 0 || loading}
                            className={`mt-2 flex items-center justify-center gap-2 py-2 sm:py-2 px-6 sm:px-8 rounded-sm text-base sm:text-lg font-semibold transition-all duration-300 shadow-md
                                ${
                                    product.stock > 0
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                                }`}
                        >
                            <ShoppingBag
                                size={20}
                                className="sm:w-[22px] sm:h-[22px]"
                            />
                            {loading ? "লোডিং হচ্ছে..." : "অর্ডার করুন"}
                        </button>
                    </div>
                </div>

                {/* Description Tabs Section */}
                <div className="mt-10 sm:mt-14 rounded-xl bg-[#2D3E29] dark:bg-[#0F1A0D] p-5 sm:p-8">
                    <div className="h-10 flex gap-5 items-center mb-5">
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`py-2 px-3 font-medium rounded text-white transition-all
                            ${activeTab === "details" ? "bg-green-500 underline" : "bg-slate-400 hover:bg-slate-500"}`}
                        >
                            বিস্তারিত
                        </button>

                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`py-2 px-3 font-medium rounded text-white transition-all
                            ${activeTab === "reviews" ? "bg-green-500 underline" : "bg-slate-400 hover:bg-slate-500"}`}
                        >
                            রিভিউ দেখুন
                        </button>
                    </div>

                    {activeTab === "details" && (
                        <>
                            <div className="h-px bg-white/20 mb-4 sm:mb-6"></div>
                            <p className="text-sm sm:text-base text-[#D1D5DB] whitespace-pre-line leading-relaxed">
                                {product.description}
                            </p>
                        </>
                    )}

                    {activeTab === "reviews" && (
                        <div className="text-white font-hindSiliguri py-4 italic text-center">
                            এই পণ্যের জন্য এখনো কোনো রিভিউ নেই।
                        </div>
                    )}
                </div>

                {/* RELATED PRODUCTS GRID SECTION */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16 mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                রিলেটেড প্রোডাক্ট
                            </h2>
                            <div className="h-px w-full bg-gray-200 dark:bg-gray-800"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((item) => {
                                const itemDiscount = item.discount
                                    ? Number(item.discount)
                                    : 0;
                                const itemPrice = Number(item.price);
                                const itemFinalPrice =
                                    itemPrice -
                                    itemPrice * (itemDiscount / 100);

                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white dark:bg-[#1F2937] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-[#111827]">
                                            {itemDiscount > 0 && (
                                                <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">
                                                    -{itemDiscount}%
                                                </div>
                                            )}
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* Quick Link Overlay */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Link
                                                    href={`/product/${item.id}`}
                                                    className="bg-white p-2 rounded-full text-gray-900 hover:bg-green-600 hover:text-white transition-colors"
                                                >
                                                    <Eye size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <Link href={`/product/${item.id}`}>
                                                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 h-10 mb-2 hover:text-green-600 transition-colors">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <div className="flex flex-col">
                                                <span className="text-green-600 dark:text-green-400 font-bold text-sm sm:text-base">
                                                    TK{" "}
                                                    {Math.round(
                                                        itemFinalPrice,
                                                    ).toLocaleString()}
                                                </span>
                                                {itemDiscount > 0 && (
                                                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                                        TK{" "}
                                                        {itemPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductDetailsPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetailsPage;
