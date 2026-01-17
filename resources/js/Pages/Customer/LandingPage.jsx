import React from "react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import NewArrivals from "../../components/CustomerComponents/NewArraivals";
import CategoriesSection from "../../components/CustomerComponents/CategoriesSection";

import HeroBanner from "../../components/CustomerComponents/HeroBanner";
import KidZone from "../../components/CustomerComponents/KidZone";
import Winter from "@/components/CustomerComponents/Winter";
import Section from "@/components/CustomerComponents/Section";

const LandingPage = ({ products = [], categories = [], heroes = [] }) => {
    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-200 dark:bg-[#0F1A0D]">
                {/* CHANGED: Removed max-w-7xl mx-auto. Added w-full */}
                <div className="w-full  mx-auto">
                    <Toaster />
                    <HeroBanner heroes={heroes} />
                    <CategoriesSection categoriesComing={categories} />
                    <Section
                        products={products}
                        sectionname={"Kid Zone"}
                        catid={13}
                    />

                    <Section
                        products={products}
                        sectionname={"Winter Collection"}
                        catid={11}
                    />

                    <NewArrivals products={products} />

                    <Section
                        products={products}
                        sectionname={"Electronics"}
                        catid={10}
                    />
                </div>
            </div>
        </>
    );
};

LandingPage.layout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default LandingPage;
