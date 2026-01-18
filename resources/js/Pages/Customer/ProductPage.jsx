import React from "react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import ProductCard from "@/components/CustomerComponents/ProductCard";
import toast from "react-hot-toast";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

function ProductPage({ products = [] }) {
    useEffect(() => {
        if (!products || products.length === 0) return;

        // Map all product IDs on the page
        const contentIds = products.map((p) => p.id);

        ReactPixel.track("ViewContent", {
            content_ids: contentIds, // Array of product IDs
            content_name: "Product Listing Page", // Optional descriptive name
            content_type: "product", // Always good to add
        });
    }, [products]); // Fire when products change

    return (
        <div className="mx-auto mt-5 max-w-[1200px]">
            <h1 className=" text-4xl mx-auto font-inter dark:text-gray-100 text-slate-700 font-semibold tracking-tighter p-3">
                All the products are here
            </h1>
            <div className="py-5 px-4  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4    gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

ProductPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductPage;
