import React from "react";
import CustomerLayout from "../../Layouts/CustomerLayouts/CustomerLayout";
import ProductCard from "@/components/CustomerComponents/ProductCard";
import toast from "react-hot-toast";

function ProductPage({ products = [] }) {
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
