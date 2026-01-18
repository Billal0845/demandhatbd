import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import {
    FiSearch,
    FiFilter,
    FiX,
    FiDownload,
    FiUserPlus,
} from "react-icons/fi";

export default function OrdersFilter({ filters, employees, onAssignClick }) {
    // State Initialization
    const [searchTerm, setSearchTerm] = useState(filters?.search || "");
    const [orderStatus, setOrderStatus] = useState(filters?.order_status || "");
    const [paymentStatus, setPaymentStatus] = useState(
        filters?.payment_status || "",
    );
    const [dateFilter, setDateFilter] = useState(filters?.date_filter || "");
    const [startDate, setStartDate] = useState(filters?.start_date || "");
    const [endDate, setEndDate] = useState(filters?.end_date || "");
    const [showFilters, setShowFilters] = useState(false);

    // Debounced search (remains the same)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters?.search || "")) {
                // For search, we rely on the state because of the debounce delay
                triggerFilterRequest({ search: searchTerm });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    /**
     * CORE FIX: triggerFilterRequest
     * This function accepts 'newValues' to override the current state.
     * This ensures we send the value the user JUST clicked, not the old state.
     */
    const triggerFilterRequest = (newValues = {}) => {
        const params = {
            search: searchTerm,
            order_status: orderStatus,
            payment_status: paymentStatus,
            date_filter: dateFilter,
            sort_by: filters?.sort_by,
            sort_order: filters?.sort_order,
            ...newValues, // <--- This overrides current state with the new selection
        };

        // Handle Custom Date Range logic
        // If date_filter is custom, we only send start/end if they exist
        if ((newValues.date_filter || dateFilter) === "custom") {
            // Only attach dates if they are set
            if (startDate || newValues.start_date)
                params.start_date = newValues.start_date || startDate;
            if (endDate || newValues.end_date)
                params.end_date = newValues.end_date || endDate;

            // If custom is selected but dates are missing, don't auto-submit unless clicked "Apply"
            if (
                (!params.start_date || !params.end_date) &&
                !newValues.force_submit
            ) {
                return;
            }
        }

        // Clean up parameters (remove force_submit helper)
        delete params.force_submit;

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
        <div className="mb-2">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Orders
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your orders and track status
                    </p>
                </div>

                {/* Buttons Group */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Assign Button */}
                    {employees && (
                        <button
                            onClick={onAssignClick}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                        >
                            <FiUserPlus size={18} />
                            <span className="whitespace-nowrap">
                                Assign Orders
                            </span>
                        </button>
                    )}

                    {/* Export PDF Button */}
                    <button
                        onClick={handleExportPdf}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                    >
                        <FiDownload size={18} />
                        <span className="whitespace-nowrap">Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
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
                            {/* Order Status */}
                            <select
                                value={orderStatus}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setOrderStatus(val);
                                    // PASS NEW VALUE DIRECTLY
                                    triggerFilterRequest({ order_status: val });
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

                            {/* Payment Status */}
                            <select
                                value={paymentStatus}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setPaymentStatus(val);
                                    // PASS NEW VALUE DIRECTLY
                                    triggerFilterRequest({
                                        payment_status: val,
                                    });
                                }}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Payment Status</option>
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>

                            {/* Date Filter Type */}
                            <select
                                value={dateFilter}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setDateFilter(val);
                                    // If not custom, trigger immediately
                                    if (val !== "custom") {
                                        triggerFilterRequest({
                                            date_filter: val,
                                        });
                                    }
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

                    {/* Custom Date Range Inputs */}
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
                                onClick={() =>
                                    triggerFilterRequest({ force_submit: true })
                                }
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
