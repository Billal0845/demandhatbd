import React from "react";
import { Link, router } from "@inertiajs/react";
import { BsCartPlusFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";

const ProductCard = ({ product }) => {
    // 1. Calculation Logic
    const discountPercentage = product.discount ? Number(product.discount) : 0;
    const originalPrice = Number(product.price);
    const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

    /**
     * @param {number} productId
     * @param {boolean} shouldRedirect - If true, goes to checkout.
     */
    const handleAddToCart = (productId, shouldRedirect = false) => {
        if (product.stock <= 0) {
            toast.error("Sorry, this item is currently out of stock.");
            return;
        }

        ReactPixel.track("AddToCart", {
            currency: "BDT",
            value: discountedPrice,
            content_name: product.name,
            content_ids: [productId],
            content_type: "product",
        });

        router.post(
            "/cart/add",
            { product_id: productId, quantity: 1 },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (shouldRedirect) {
                        router.visit("/checkout");
                    } else {
                        toast.success("Successfully Added to Cart!");
                    }
                },
            },
        );
    };

    return (
        <div className="group relative flex flex-col bg-white dark:bg-[#1F2937] rounded-xl shadow-sm border border-gray-200 dark:border-[#374151] overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
            {/* Discount Badge */}
            <div className="absolute top-0 left-0 z-10 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-br-lg shadow-sm">
                {discountPercentage > 0 ? `-${discountPercentage}%` : "0%"}
            </div>

            {/* Cart Button (Add Only) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product.id, false);
                }}
                className="absolute top-3 right-3 z-10 
                           bg-[#658C58]/90 text-white p-2 rounded-full shadow-md 
                           opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                           transform scale-100 lg:scale-90 lg:group-hover:scale-100 
                           transition-all duration-300 hover:bg-[#527043] active:scale-95"
            >
                <BsCartPlusFill size={18} />
            </button>

            <Link
                href={`/product/${product.id}`}
                className="flex flex-col h-full"
            >
                {/* Image Container */}
                <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-gray-50 dark:bg-[#2a3544] flex items-center justify-center p-2">
                    <img
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                        src={`/storage/${product.image}`}
                        alt={product.name}
                    />
                </div>

                {/* Content Section */}
                <div className="p-3 flex flex-col flex-grow">
                    <h3 className="font-poppins text-gray-900 dark:text-[#F9FAFB] font-bold text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-[#658C58] transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-gray-500 font-hindSiliguri dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-tight">
                        {product.short_description ||
                            "High quality product from Surabil"}
                    </p>

                    <div className="mt-auto space-y-3">
                        {/* Price Logic */}
                        <div className="flex flex-col">
                            <span className="font-bold text-[#658C58] dark:text-[#8FBA81] text-lg leading-none">
                                Tk {Math.round(discountedPrice)}
                            </span>
                            {discountPercentage > 0 && (
                                <span className="text-gray-400 line-through text-xs mt-1">
                                    Tk {originalPrice}
                                </span>
                            )}
                        </div>

                        {/* Order Now Button (Redirects) */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(product.id, true);
                            }}
                            className="w-full bg-green-600 text-white hover:bg-green-700 font-bold py-2.5 rounded-lg transition-all duration-300 transform active:scale-95 text-sm shadow-sm"
                        >
                            অর্ডার করুন
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
