import React from "react";
import { router } from "@inertiajs/react";
import { FiCalendar, FiRefreshCw, FiPrinter } from "react-icons/fi";

export default function DashboardFilter({ currentRange, startDate, endDate }) {
    const handleRangeChange = (e) => {
        const range = e.target.value;
        router.get(
            "/admin",
            { range },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleRefresh = () => {
        router.reload({
            only: ["stats", "actions", "charts", "recent_orders"],
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative">
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    <select
                        value={currentRange}
                        onChange={handleRangeChange}
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="7_days">Last 7 Days</option>
                        <option value="30_days">Last 30 Days</option>
                    </select>
                </div>

                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    {startDate} — {endDate}
                </span>
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
                <button
                    onClick={handleRefresh}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
                    title="Refresh Data"
                >
                    <FiRefreshCw />
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                >
                    <FiPrinter /> Print Summary
                </button>
            </div>
        </div>
    );
}
