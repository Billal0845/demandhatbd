import React from "react";
import { Link, router } from "@inertiajs/react";
import { BsCartPlusFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";

function SectionCard({ product }) {
    const handleAddToCart = (productId) => {
        // 2. Check if found (safety measure) and Track

        ReactPixel.track("AddToCart", {
            // <--- Changed from "Purchase"
            currency: "USD",
            value: product.price,
            content_name: product.name,
            content_ids: [productId],
            content_type: "product", // <--- Good to add this
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
        <>
            <div
                key={product.id}
                className="group relative flex flex-col dark:bg-[#1F2937] rounded-xl shadow-sm  border border-gray-200 dark:border-[#374151]
 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
                {/* Card content Link */}
                {/* FIX 3: Removed the onClick check. The button is outside this Link, so no conflict exists. */}
                <Link
                    href={`/product/${product.id}`}
                    className="flex flex-col flex-1"
                >
                    {/* Image Container */}
                    <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-[#374151]">
                        <img
                            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                            src={`/storage/${product.image}`}
                            alt={product.name}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="py-1 px-2 flex flex-col flex-1">
                        <h3 className="font-poppins text-gray-900 dark:text-[#F9FAFB] text-sm font-bold mb-1 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-gray-700 font-inter dark:text-[#D1D5DB] text-sm mb-1 line-clamp-2 leading-relaxed">
                            {product.short_description ||
                                "Product description..."}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-gray-50 dark:border-[#374151]">
                            <div className="">
                                <span className="font-bold text-[#658C58] font-poppins dark:text-[#7CA66E] text-lg">
                                    Tk {product.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Cart Button */}
                <button
                    onClick={(e) => {
                        // stopPropagation prevents the click from triggering parent div events (if any)
                        e.stopPropagation();
                        handleAddToCart(product.id);
                    }}
                    // FIX 4: Mobile Responsiveness
                    // Changed 'opacity-0' to 'opacity-100 lg:opacity-0'.
                    // Now the button is ALWAYS visible on mobile/tablet, but hides and waits for hover on Desktop (lg).
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
        </>
    );
}

export default SectionCard;
