import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import ReactPixel from "react-facebook-pixel";

import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import ProductGallery from "../../components/CustomerComponents/ProductDetailsPage/ProductGallery";
import ProductInfo from "../../components/CustomerComponents/ProductDetailsPage/ProductInfo";
import ProductActions from "../../components/CustomerComponents/ProductDetailsPage/ProductActions";
import ProductDetailsTabs from "../../components/CustomerComponents/ProductDetailsPage/ProductDetailsTabs";
import RelatedProducts from "../../components/CustomerComponents/ProductDetailsPage/RelatedProducts";

function ProductDetailsPage({ product = {}, relatedProducts = [] }) {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("details");
    const [selectedImage, setSelectedImage] = useState(product.image);

    useEffect(() => {
        setSelectedImage(product.image);
    }, [product.image]);

    const discountPercentage = product.discount ? Number(product.discount) : 0;
    const originalPrice = Number(product.price);
    const discountedPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

    const handleAddToCart = (shouldRedirect = false) => {
        if (product.stock <= 0) return;

        ReactPixel.track("AddToCart", {
            currency: "BDT",
            value: discountedPrice,
            content_name: product.name,
            content_ids: [product.id],
            content_type: "product",
        });

        setLoading(true);
        router.post(
            "/cart/add",
            { product_id: product.id, quantity: 1 },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setLoading(false);
                    shouldRedirect
                        ? router.visit("/checkout")
                        : toast.success("Successfully Added to Cart!");
                },
                onError: () => setLoading(false),
            },
        );
    };

    return (
        <div className="bg-white w-full dark:bg-[#111827] min-h-screen py-6 sm:py-10 transition-colors duration-300">
            <Toaster />
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 xl:gap-14">
                    <ProductGallery
                        product={product}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        discountPercentage={discountPercentage}
                    />
                    <div className="flex flex-col justify-center">
                        <ProductInfo
                            product={product}
                            discountedPrice={discountedPrice}
                            originalPrice={originalPrice}
                            discountPercentage={discountPercentage}
                        />
                        <ProductActions
                            product={product}
                            loading={loading}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                </div>

                <ProductDetailsTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    product={product}
                />

                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    );
}

ProductDetailsPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetailsPage;
