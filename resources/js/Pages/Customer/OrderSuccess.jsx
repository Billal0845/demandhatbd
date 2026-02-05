import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import {
    CheckCircle2,
    Home,
    ShoppingBag,
    Truck,
    PhoneCall,
} from "lucide-react";
import ReactPixel from "react-facebook-pixel";

const OrderSuccess = ({ order }) => {
    useEffect(() => {
        if (order && order.items) {
            ReactPixel.track("Purchase", {
                content_name: "Order #" + order.id,
                content_ids: order.items.map(
                    (item) => item.product_id || item.id,
                ),
                content_type: "product",
                value: order.total_amount,
                currency: "BDT", // Changed to BDT to match your store
            });
        }
    }, [order]);

    return (
        <div className="bg-gray-50 min-h-screen font-hindSiliguri pb-20">
            <Head title="অর্ডার সফল হয়েছে - SURABIL" />

            <div className="max-w-2xl mx-auto px-4 pt-10">
                {/* 1. Success Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <CheckCircle2 className="w-12 h-12 text-[#658C58]" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        অর্ডার সফল হয়েছে! 🎉
                    </h1>
                    <p className="text-gray-600">
                        আপনার অর্ডারটি আমরা সফলভাবে গ্রহণ করেছি। খুব শীঘ্রই
                        আমাদের একজন প্রতিনিধি আপনাকে কল করবেন।
                    </p>
                </div>

                {/* 2. Order Information Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                    <div className="bg-[#658C58] px-6 py-4 flex justify-between items-center text-white">
                        <span className="font-semibold">
                            অর্ডার আইডি: #{order.id}
                        </span>
                        <span className="text-sm opacity-90">
                            অর্ডার সময়: {new Date().toLocaleDateString("bn-BD")}
                        </span>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-500">
                                    পেমেন্ট মেথড:
                                </span>
                                <span className="font-bold text-gray-800">
                                    Cash on Delivery
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-500">
                                    মোট মূল্য:
                                </span>
                                <span className="text-xl font-bold text-[#658C58]">
                                    Tk {Math.round(order.grand_total)}
                                </span>
                            </div>
                        </div>

                        {/* Delivery Notice */}
                        <div className="mt-6 flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <Truck
                                className="shrink-0 text-blue-600"
                                size={24}
                            />
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm">
                                    ডেলিভারি আপডেট
                                </h4>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    আগামী ৭২ ঘণ্টার মধ্যে আপনার পণ্যটি ডেলিভারি
                                    করা হবে। দয়া করে ফোন সচল রাখুন।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="text-green-700 p-2 font-medium my-2">
                    অর্ডার ট্রাক করতে লগিন করুন
                </h3>
                {/* 3. Steps/Process Visualization */}
                <div className="grid mx-auto grid-cols-4 gap-2 mb-10 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-2">
                            1
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-800">
                            অর্ডার সম্পন্ন
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold mb-2">
                            2
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-500">
                            অর্ডার ভেরিফাইড
                        </span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold mb-2">
                            4
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                            কুরিয়ারের কাছে
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold mb-2">
                            5
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                            ডেলিভারি
                        </span>
                    </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/productspage"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold bg-[#658C58] hover:bg-[#527043] text-white transition-all shadow-lg active:scale-95"
                    >
                        <ShoppingBag size={20} />
                        আরও কেনাকাটা করুন
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold bg-white border-2 border-gray-200 hover:border-[#658C58] hover:text-[#658C58] text-gray-700 transition-all active:scale-95"
                    >
                        <Home size={20} />
                        হোম পেজে যান
                    </Link>
                </div>

                {/* Support Contact */}
                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-sm mb-2">
                        কোনো সমস্যা হলে কল করুন
                    </p>
                    <a
                        href="tel:01867510845"
                        className="inline-flex items-center gap-2 text-lg font-bold text-[#658C58] hover:underline"
                    >
                        <PhoneCall size={18} />
                        01898385395
                    </a>
                </div>
            </div>
        </div>
    );
};

OrderSuccess.layout = (page) => <CustomerLayout children={page} />;
export default OrderSuccess;
