import React from "react";
import SafeHTML from "../../CustomerComponents/SafeHTML";

const ProductDetailsTabs = ({ activeTab, setActiveTab, product }) => {
    // We define the tabs here
    const allTabs = [
        {
            id: "details",
            label: "বিস্তারিত বিবরণ",
            content: product.description,
            show: true, // Always show description
        },
        {
            id: "specification",
            label: "স্পেসিফিকেশন",
            content: product.specification,
            // Only show this tab if the admin actually added specifications
            show: product.specification && product.specification !== "<p></p>",
        },
        {
            id: "reviews",
            label: "রিভিউ",
            content: null,
            show: true,
        },
    ];

    // Filter to show only active tabs
    const visibleTabs = allTabs.filter((tab) => tab.show);

    return (
        <div className="mt-10 font-hindSiliguri sm:mt-14 rounded-xl bg-white dark:bg-[#0F1A0D] border border-gray-200 dark:border-gray-800 p-5 sm:p-8">
            {/* Tab Headers */}
            <div className="h-10 flex gap-5 items-center mb-5 border-b border-gray-100 dark:border-gray-800">
                {visibleTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-2 px-1 font-bold transition-all whitespace-nowrap ${
                            activeTab === tab.id
                                ? "text-green-600 border-b-2 border-green-600"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in duration-500">
                {activeTab === "reviews" ? (
                    <div className="text-gray-500 py-10 italic text-center">
                        এই পণ্যের জন্য এখনো কোনো রিভিউ নেই।
                    </div>
                ) : (
                    <SafeHTML
                        html={
                            visibleTabs.find((t) => t.id === activeTab)?.content
                        }
                        className="mt-4"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDetailsTabs;
