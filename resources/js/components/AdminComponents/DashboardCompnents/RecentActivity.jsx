import React from "react";
import { Link } from "@inertiajs/react";

export default function RecentActivity({ recentOrders, topProducts }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        Recent Orders
                    </h3>
                    <Link
                        href="/admin/orders"
                        className="text-sm text-blue-500 hover:text-blue-600"
                    >
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {recentOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                        #{order.id}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                        {order.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                order.order_status
                                            )}`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-900 dark:text-white font-medium">
                                        ৳
                                        {parseFloat(order.grand_total).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        Top Selling Products
                    </h3>
                </div>
                <div className="p-4">
                    {topProducts.length > 0 ? (
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-white truncate w-40 sm:w-60">
                                                {product.product_name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Sold: {product.total_sold} units
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-green-600">
                                        ৳
                                        {parseFloat(product.revenue).toFixed(0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center text-sm py-4">
                            No sales data yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
