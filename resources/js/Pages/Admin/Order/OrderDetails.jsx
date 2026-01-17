import React from "react";
import { Link } from "@inertiajs/react";
import {
    FiArrowLeft,
    FiEdit2,
    FiPrinter,
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCreditCard,
    FiPackage,
} from "react-icons/fi";
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";

export default function OrderDetails({ order }) {
    const getStatusBadge = (status, type) => {
        const statusColors = {
            payment: {
                paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                pending:
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                refunded:
                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            },
            order: {
                pending:
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                processing:
                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                shipped:
                    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                delivered:
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                cancelled:
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            },
        };

        const colorClass =
            type === "payment"
                ? statusColors.payment[status]
                : statusColors.order[status];

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="pb-10 font-poppins">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/admin/orders"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
                        >
                            <FiArrowLeft size={20} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Order Details
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-14">
                        Order #{order.id} •{" "}
                        {new Date(order.created_at).toLocaleDateString(
                            "en-GB",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/admin/orders/${order.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                    >
                        <FiEdit2 size={16} />
                        Update Status
                    </Link>
                    <a
                        href={`/admin/orders/${order.id}/invoice`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                    >
                        <FiPrinter size={16} />
                        Print Invoice
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1   lg:grid-cols-3 gap-6">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FiPackage className="text-blue-600" />
                            Order Items
                        </h2>
                        <div className="space-y-1  ">
                            {order.items && order.items.length > 0 ? (
                                order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between px-2 py-1  bg-gray-50 dark:bg-slate-900 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                                {item.product_name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                ৳
                                                {parseFloat(item.price).toFixed(
                                                    2
                                                )}
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                ৳
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    No items found in this order
                                </p>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Subtotal:
                                    </span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {/* ৳{order.subtotal.toFixed(2)} */}৳
                                        {parseFloat(order.subtotal).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Delivery Fee:
                                    </span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {/* ৳{order.delivery_fee.toFixed(2)} */}
                                        ৳
                                        {parseFloat(order.delivery_fee).toFixed(
                                            2
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-800 dark:text-gray-200">
                                        Grand Total:
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                        {/* ৳{order.grand_total.toFixed(2)} */}৳
                                        {parseFloat(order.grand_total).toFixed(
                                            2
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FiUser className="text-blue-600" />
                            Customer Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <FiUser
                                    className="text-gray-400 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Name
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                        {order.name}
                                    </p>
                                    {order.user_id && (
                                        <Link
                                            href={`/admin/customers/${order.user_id}`}
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                                        >
                                            View Customer Profile →
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMail
                                    className="text-gray-400 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Email
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                        {order.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiPhone
                                    className="text-gray-400 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Phone
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                        {order.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMapPin
                                    className="text-gray-400 mt-1"
                                    size={18}
                                />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Delivery Address
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                                        {order.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Side */}
                <div className="space-y-6">
                    {/* Order Status */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Order Status
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    Order Status
                                </p>
                                {getStatusBadge(order.order_status, "order")}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    Payment Status
                                </p>
                                {getStatusBadge(
                                    order.payment_status,
                                    "payment"
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FiCreditCard className="text-blue-600" />
                            Payment Details
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Payment Method
                                </p>
                                <p className="font-medium text-gray-800 dark:text-gray-200 mt-1 capitalize">
                                    {order.payment_method}
                                </p>
                            </div>
                            {order.transaction_id && (
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Transaction ID
                                    </p>
                                    <p className="font-mono text-sm text-gray-800 dark:text-gray-200 mt-1 bg-gray-100 dark:bg-slate-900 px-2 py-1 rounded">
                                        {order.transaction_id}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Total Amount
                                </p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                    {/* ৳{order.grand_total.toFixed(2)} */}৳
                                    {parseFloat(order.grand_total).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Order Timeline
                        </h2>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        Order Placed
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
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
                            {order.updated_at !== order.created_at && (
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">
                                            Last Updated
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(
                                                order.updated_at
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

OrderDetails.layout = (page) => <AdminLayout children={page} />;
