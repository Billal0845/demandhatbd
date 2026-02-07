import React from "react";

const ProductGallery = ({
    product,
    selectedImage,
    setSelectedImage,
    discountPercentage,
}) => {
    // Helper to extract path regardless of data format
    const getImagePath = (img) => {
        if (!img) return "";
        // If img is an object {image_path: '...'}, return that. If it's just a string, return the string.
        return typeof img === "object" ? img.image_path : img;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl border border-green-700 dark:border-[#374151] bg-gray-100 dark:bg-[#1F2937] aspect-square shadow-lg">
                    {discountPercentage > 0 && (
                        <div className="absolute top-0 left-0 z-20 bg-orange-500 text-white text-sm sm:text-base font-bold px-3 py-1 rounded-br-lg shadow-sm">
                            -{discountPercentage}%
                        </div>
                    )}

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

            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {/* Main Image Thumbnail */}
                    <button
                        onClick={() => setSelectedImage(product.image)}
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

                    {/* Additional Images Loop */}
                    {product.images.map((img, index) => {
                        const path = getImagePath(img);
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(path)}
                                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImage === path
                                        ? "border-green-600 scale-105 shadow-md"
                                        : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={`/storage/${path}`}
                                    className="w-full h-full object-cover"
                                    alt={`gallery-${index}`}
                                    onError={(e) => {
                                        console.log(
                                            "Failed to load image at:",
                                            path,
                                        );
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
