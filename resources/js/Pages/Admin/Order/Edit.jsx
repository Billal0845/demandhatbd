import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";

export default function Edit({ order }) {
    const { data, setData, patch, processing, errors } = useForm({
        order_status: order.order_status || "pending",
        payment_status: order.payment_status || "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}/status`, {
            onSuccess: () => {
                alert("Order status updated successfully!");
            },
        });
    };

    return (
        <div className="pb-10">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/admin/orders"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
                        >
                            <FiArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Update Order Status
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-14">
                        Order #{order.id}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Information Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Order Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Customer:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                    {order.name}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Email:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                    {order.email}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Phone:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                    {order.phone}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Address:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                    {order.address}
                                </p>
                            </div>
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-gray-500 dark:text-gray-400">
                                    Grand Total:
                                </span>
                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                    ৳{order.grand_total.toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Payment Method:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 capitalize">
                                    {order.payment_method}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">
                                    Order Date:
                                </span>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Update Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                            Update Status
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Order Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order Status
                                </label>
                                <select
                                    value={data.order_status}
                                    onChange={(e) =>
                                        setData("order_status", e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">
                                        Processing
                                    </option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {errors.order_status && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {errors.order_status}
                                    </p>
                                )}

                                {/* Status Description */}
                                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-xs text-blue-800 dark:text-blue-300">
                                        {data.order_status === "pending" &&
                                            "Order has been placed and awaiting confirmation."}
                                        {data.order_status === "processing" &&
                                            "Order is being prepared for shipment."}
                                        {data.order_status === "shipped" &&
                                            "Order has been dispatched and is on the way."}
                                        {data.order_status === "delivered" &&
                                            "Order has been successfully delivered to the customer."}
                                        {data.order_status === "cancelled" &&
                                            "Order has been cancelled."}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Payment Status
                                </label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) =>
                                        setData(
                                            "payment_status",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                                {errors.payment_status && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {errors.payment_status}
                                    </p>
                                )}

                                {/* Payment Status Description */}
                                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-xs text-blue-800 dark:text-blue-300">
                                        {data.payment_status === "pending" &&
                                            "Payment is awaiting confirmation."}
                                        {data.payment_status === "paid" &&
                                            "Payment has been successfully received."}
                                        {data.payment_status === "failed" &&
                                            "Payment transaction failed."}
                                        {data.payment_status === "refunded" &&
                                            "Payment has been refunded to the customer."}
                                    </p>
                                </div>
                            </div>

                            {/* Current vs New Status Comparison */}
                            <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    Status Changes
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                                            Current Order Status:
                                        </p>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                            {order.order_status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                                            New Order Status:
                                        </p>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            {data.order_status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                                            Current Payment Status:
                                        </p>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                            {order.payment_status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 mb-1">
                                            New Payment Status:
                                        </p>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            {data.payment_status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium shadow-sm"
                                >
                                    <FiSave size={18} />
                                    {processing
                                        ? "Updating..."
                                        : "Update Status"}
                                </button>
                                <Link
                                    href="/admin/orders"
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => <AdminLayout children={page} />;
