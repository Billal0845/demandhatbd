import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import React, { useState } from "react";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";

function ProductDetailsPage({ product = {} }) {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = () => {
        // CORRECT WAY
        ReactPixel.track("AddToCart", {
            // <--- Changed from "Purchase"
            currency: "USD",
            value: product.price,
            content_name: product.name,
            content_ids: [product.id],
            content_type: "product", // <--- Good to add this
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
        <div className="bg-white w-full dark:bg-[#111827] min-h-screen py-10 transition-colors duration-300">
            <Toaster />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-14">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl border border-green-700 dark:border-[#374151] bg-gray-100 dark:bg-[#1F2937] aspect-square xl:aspect-[5/4] shadow-lg">
                            <img
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                src={`/storage/${product.image}`}
                                alt={product.name}
                            />

                            {product.stock <= 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl xl:text-3xl uppercase tracking-widest border-4 border-white px-6 py-3 -rotate-12">
                                        Out of Stock
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-[#F9FAFB] mb-5">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-xl xl:text-2xl font-bold text-[#658C58] dark:text-[#7CA66E]">
                                TK {Number(product.price).toLocaleString()}
                            </p>

                            <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${
                                    product.stock > 0
                                        ? "bg-[#E8F5E3] border-[#7CA66E] text-[#527043] dark:bg-[#374151] dark:text-[#8FBA81]"
                                        : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                            >
                                {product.stock > 0 ? (
                                    <>
                                        <CheckCircle size={16} /> Available
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={16} /> Unavailable
                                    </>
                                )}
                            </span>
                        </div>

                        {product.quick_view && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#F9FAFB] mb-2">
                                    Quick Overview
                                </h3>
                                <p className="text-gray-600 dark:text-[#D1D5DB] leading-relaxed whitespace-pre-line">
                                    {product.quick_view}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || loading}
                            className={`mt-auto flex items-center justify-center gap-2 py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md
                                ${
                                    product.stock > 0
                                        ? "bg-[#658C58] hover:bg-[#527043] dark:bg-[#7CA66E] dark:hover:bg-[#8FBA81] text-white"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-[#374151]"
                                }`}
                        >
                            <ShoppingCart size={22} />
                            {loading
                                ? "Adding..."
                                : product.stock > 0
                                  ? "Add to Cart"
                                  : "Out of Stock"}
                        </button>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-14 rounded-xl bg-[#2D3E29] dark:bg-[#0F1A0D] p-6 xl:p-8">
                    <h2 className="text-2xl xl:text-3xl font-bold text-white mb-4">
                        Product Details
                    </h2>
                    <div className="h-px bg-white/20 mb-4"></div>
                    <p className="text-[#D1D5DB] dark:text-[#9CA3AF] whitespace-pre-line leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

ProductDetailsPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetailsPage;
