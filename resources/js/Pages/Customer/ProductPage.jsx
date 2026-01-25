import React, { useEffect } from "react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import ProductCard from "@/components/CustomerComponents/ProductCard";
import ReactPixel from "react-facebook-pixel";
import { Link, usePage } from "@inertiajs/react"; // Import Link for pagination

function ProductPage({ products }) {
    // Determine if products is an array (old) or paginated object (new)
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
        <div className="mx-auto mt-5 max-w-[1200px]">
            <h1 className="text-4xl mx-auto font-inter dark:text-gray-100 text-slate-700 font-semibold tracking-tighter p-3">
                All Products
            </h1>

            {/* Grid */}
            <div className="py-5 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {productList.length > 0 ? (
                    productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500 text-xl">
                        No products found matching your search.
                    </div>
                )}
            </div>

            {/* Pagination Links (Only show if paginated) */}
            {paginationLinks.length > 0 && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap mb-10">
                    {paginationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            preserveState
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors
                                ${
                                    link.active
                                        ? "bg-[#658C58] text-white border border-[#658C58]"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }
                                ${!link.url && "opacity-50 cursor-not-allowed"}
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
