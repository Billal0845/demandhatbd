import React from "react";
import { Link, router } from "@inertiajs/react";
import { BsCartPlusFill } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";

const ProductCard = ({ product }) => {
    // 1. Calculation Logic
    const discountPercentage = product.discount ? Number(product.discount) : 0;
    const originalPrice = Number(product.price);

    // Formula: Price - (Price * Discount / 100)
    const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

    const handleAddToCart = (productId) => {
        if (product.stock <= 0) {
            toast.error("Sorry, this item is currently out of stock.");
            return;
        }

        ReactPixel.track("AddToCart", {
            currency: "BDT", // Changed to BDT to match currency symbol
            value: discountedPrice, // 2. Track the actual price paid
            content_name: product.name,
            content_ids: [productId],
            content_type: "product",
        });

        router.post(
            "/cart/add",
            {
                product_id: productId,
                quantity: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Successfully Added to Cart!");
                },
            },
        );
    };

    return (
        <div>
            <div
                key={product.id}
                className="group relative flex flex-col dark:bg-[#1F2937] rounded-xl shadow-sm border border-[#658C58] dark:border-[#374151] overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
                <Toaster />

                {/* 3. Discount Badge - Top Left */}
                <div className="absolute top-0 left-0 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg shadow-sm">
                    {discountPercentage > 0 ? `-${discountPercentage}%` : "0%"}
                </div>

                {/* Card content Link */}
                <Link
                    href={`/product/${product.id}`}
                    className="flex flex-col flex-1"
                >
                    {/* Image Container */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-[#374151]">
                        <img
                            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                            src={`/storage/${product.image}`}
                            alt={product.name}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="py-2 px-4 flex flex-col flex-1">
                        <h3 className="font-poppins text-gray-900 dark:text-[#F9FAFB] font-bold mb-1 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-gray-700 font-inter dark:text-[#D1D5DB] text-sm mb-1 line-clamp-2 leading-relaxed">
                            {product.short_description ||
                                "Product description..."}
                        </p>

                        <div className="mt-auto pt-2 border-t border-gray-50 dark:border-[#374151]">
                            {/* 4. Price Logic */}
                            <div className="flex items-center flex-wrap gap-2">
                                {/* Discounted Price (Main) */}
                                <span className="font-bold text-[#658C58] font-poppins dark:text-[#F9FAFB] text-lg">
                                    Tk {Math.round(discountedPrice)}
                                </span>

                                {/* Original Price (Strikethrough) - Only if discount exists */}
                                {discountPercentage > 0 && (
                                    <span className="font-medium text-gray-400 line-through font-poppins text-sm">
                                        Tk {originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Cart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                    }}
                    className="absolute top-3 right-3 z-10 
                               bg-[#658C58]/90 dark:bg-[#7CA66E]/90 backdrop-blur-sm text-white p-2 rounded-full shadow-sm border-none
                               opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                               transform scale-100 lg:scale-90 lg:group-hover:scale-100 
                               transition-all duration-300 cursor-pointer 
                               hover:bg-[#527043] dark:hover:bg-[#8FBA81] active:scale-95"
                >
                    <BsCartPlusFill size={20} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
