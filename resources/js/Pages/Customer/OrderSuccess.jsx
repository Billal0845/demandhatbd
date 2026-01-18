import React, { useEffect } from "react"; // <--- Don't forget to import useEffect!
import { Head, Link } from "@inertiajs/react";
import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import ReactPixel from "react-facebook-pixel";

// 1. Change prop from { order_id } to { order }
const OrderSuccess = ({ order }) => {
    useEffect(() => {
        // Safety check: Ensure order and items exist before tracking
        if (order && order.items) {
            ReactPixel.track("Purchase", {
                content_name: "Order #" + order.id,
                // 2. Now this works because we loaded 'items' in the controller
                content_ids: order.items.map(
                    (item) => item.product_id || item.id,
                ),
                content_type: "product",
                value: order.total_amount,
                currency: "USD",
            });
        }
    }, [order]); // Dependency array ensures it runs when order data is ready

    return (
        <>
            <Head title="Order Confirmed" />

            <div className="min-h-[65vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                <div className="relative max-w-lg w-full text-center bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-gray-700">
                    {/* Icon */}
                    <div className="relative mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"></div>
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                        Order Confirmed 🎉
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Thank you for shopping with us. Your order has been
                        successfully placed and is now being processed.
                    </p>

                    {/* Order ID Display */}
                    <div className="rounded-xl p-4 mb-10 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600">
                        <span className="block text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            Order ID
                        </span>
                        {/* 3. Access ID from the object */}
                        <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                            #{order.id}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-all duration-200"
                        >
                            <Home size={18} />
                            Go Home
                        </Link>

                        <Link
                            href="/myOrders"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <ShoppingBag size={18} />
                            View Orders
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

OrderSuccess.layout = (page) => <CustomerLayout children={page} />;
export default OrderSuccess;
