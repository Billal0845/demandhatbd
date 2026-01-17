import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import {
    FiSearch,
    FiFilter,
    FiX,
    FiDownload,
    FiUserPlus,
} from "react-icons/fi";

export default function OrdersFilter({
    filters,
    employees,
    setIsAssignModalOpen,
}) {
    console.log(employees);
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const [orderStatus, setOrderStatus] = useState(filters?.order_status || "");
    const [paymentStatus, setPaymentStatus] = useState(
        filters?.payment_status || "",
    );
    const [dateFilter, setDateFilter] = useState(filters?.date_filter || "");
    const [startDate, setStartDate] = useState(filters?.start_date || "");
    const [endDate, setEndDate] = useState(filters?.end_date || "");
    const [showFilters, setShowFilters] = useState(false);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters?.search || "")) {
                applyFilters();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const applyFilters = () => {
        const params = {
            search: searchTerm,
            order_status: orderStatus,
            payment_status: paymentStatus,
            date_filter: dateFilter,
            // Preserve sort params if they exist in current URL
            sort_by: filters?.sort_by,
            sort_order: filters?.sort_order,
        };

        if (dateFilter === "custom" && startDate && endDate) {
            params.start_date = startDate;
            params.end_date = endDate;
        }

        router.get("/admin/orders", params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setOrderStatus("");
        setPaymentStatus("");
        setDateFilter("");
        setStartDate("");
        setEndDate("");
        router.get("/admin/orders");
    };

    const handleExportPdf = () => {
        const params = new URLSearchParams(window.location.search);
        window.open(`/admin/orders/export/pdf?${params.toString()}`, "_blank");
    };

    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Orders
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your orders and track status
                    </p>
                </div>

                <div className="">
                    {employees && (
                        <div className="mb-5 lg:mb-0">
                            <button
                                onClick={() => setIsAssignModalOpen(true)}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all transform hover:scale-105"
                            >
                                <FiUserPlus size={18} />
                                <span>Assign Orders</span>
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleExportPdf}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium z-20 shadow-sm"
                >
                    <FiDownload size={18} />
                    Export PDF
                </button>
            </div>

            <div className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, or order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 placeholder-gray-400"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <FiFilter size={18} />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <select
                                value={orderStatus}
                                onChange={(e) => {
                                    setOrderStatus(e.target.value);
                                    // Trigger immediately on select change, wrapped in timeout to allow state update
                                    setTimeout(() => applyFilters(), 0);
                                }}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Order Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <select
                                value={paymentStatus}
                                onChange={(e) => {
                                    setPaymentStatus(e.target.value);
                                    setTimeout(() => applyFilters(), 0);
                                }}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Payment Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>

                            <select
                                value={dateFilter}
                                onChange={(e) => {
                                    setDateFilter(e.target.value);
                                    if (e.target.value !== "custom")
                                        setTimeout(() => applyFilters(), 0);
                                }}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="custom">Custom Range</option>
                            </select>

                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <FiX size={16} />
                                Clear
                            </button>
                        </div>
                    )}

                    {showFilters && dateFilter === "custom" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300"
                            />
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Apply Date Range
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
