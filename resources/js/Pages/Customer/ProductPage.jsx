import React, { useEffect } from "react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import ProductCard from "@/components/CustomerComponents/ProductCard";
import ReactPixel from "react-facebook-pixel";
import { Link } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

function ProductPage({ products }) {
    const productList = Array.isArray(products) ? products : products.data;
    const paginationLinks = !Array.isArray(products) ? products.links : [];

    useEffect(() => {
        if (!productList || productList.length === 0) return;
        const contentIds = productList.map((p) => p.id);
        ReactPixel.track("ViewContent", {
            content_ids: contentIds,
            content_name: "Product Listing Page",
            content_type: "product",
        });
    }, [productList]);

    return (
        <div className="mx-auto mt-8 max-w-[1200px] px-4">
            <Toaster position="top-right" />

            <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold font-inter dark:text-white text-slate-800">
                    All Products
                </h1>
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {productList.length} Items Found
                </span>
            </div>

            {/* Grid - 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {productList.length > 0 ? (
                    productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-gray-400 text-lg">
                            No products found matching your search.
                        </p>
                        <Link
                            href="/"
                            className="text-green-600 font-bold mt-2 inline-block"
                        >
                            Go back home
                        </Link>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {paginationLinks.length > 0 && (
                <div className="flex justify-center mt-12 gap-2 flex-wrap mb-10">
                    {paginationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                                ${
                                    link.active
                                        ? "bg-[#658C58] text-white shadow-lg shadow-[#658C58]/30"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }
                                ${!link.url && "opacity-40 cursor-not-allowed"}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

ProductPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductPage;
