import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import SafeHTML from "../../CustomerComponents/SafeHTML";

const ProductInfo = ({
    product,
    discountedPrice,
    originalPrice,
    discountPercentage,
}) => {
    return (
        <>
            <h1 className="text-xl font-inter sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-[#F9FAFB] mb-3 md:mb-4 leading-tight">
                {product.name}
            </h1>

            {product.short_description && (
                <p className="font-semibold text-lg font-hindSiliguri tracking-tight text-gray-900 my-2">
                    {product.short_description}
                </p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <div className="flex items-baseline gap-3">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#658C58] dark:text-[#7CA66E]">
                        TK {Math.round(discountedPrice).toLocaleString()}
                    </p>
                    {discountPercentage > 0 && (
                        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400 line-through">
                            TK {originalPrice.toLocaleString()}
                        </p>
                    )}
                </div>

                <span className="hidden sm:block text-gray-300">|</span>

                <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${
                        product.stock > 0
                            ? "bg-[#E8F5E3] border-[#7CA66E] text-[#527043]"
                            : "bg-red-50 border-red-200 text-red-700"
                    }`}
                >
                    {product.stock > 0 ? (
                        <>
                            <CheckCircle size={14} /> Available
                        </>
                    ) : (
                        <>
                            <XCircle size={14} /> Unavailable
                        </>
                    )}
                </span>
            </div>

            {product.quick_view && (
                <div className="mb-6 md:mb-8 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                    <h3 className="text-base sm:text-lg  font-semibold text-gray-900 dark:text-[#F9FAFB] mb-2">
                        Quick Overview
                    </h3>
                    <SafeHTML html={product.quick_view} />
                </div>
            )}
        </>
    );
};

export default ProductInfo;
