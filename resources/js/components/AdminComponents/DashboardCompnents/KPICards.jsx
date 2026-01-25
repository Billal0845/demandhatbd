import React from "react";
// Added FiBarChart2 for the new Sales icon
import {
    FiShoppingBag,
    FiUsers,
    FiTrendingUp,
    FiBarChart2,
} from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white font-poppins dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mt-2">
                    {value}
                </h3>
            </div>
            <div className={`p-2 rounded-full ${color} bg-opacity-10 text-xl`}>
                <Icon />
            </div>
        </div>
        {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
    </div>
);

export default function KPICards({ stats }) {
    // Format currency
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
        }).format(amount);

    return (
        // Changed grid to xl:grid-cols-5 to fit 5 cards nicely on large screens
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
            {/* 1. Total Sales (Volume) - NEW CARD */}
            <StatCard
                title="Total Sales"
                value={formatCurrency(stats.sales_volume)}
                icon={FiBarChart2}
                color="text-indigo-600 bg-indigo-500"
                subtext="Excludes Cancelled"
            />

            {/* 2. Total Revenue (Cash) */}
            <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.revenue)}
                icon={FaBangladeshiTakaSign}
                color="text-green-600 bg-green-500"
                subtext="Paid Orders Only"
            />

            {/* 3. Total Orders */}
            <StatCard
                title="Total Orders"
                value={stats.orders}
                icon={FiShoppingBag}
                color="text-blue-600 bg-blue-500"
            />

            {/* 4. Avg Order Value */}
            <StatCard
                title="Avg. Order Value"
                value={formatCurrency(stats.aov)}
                icon={FiTrendingUp}
                color="text-purple-600 bg-purple-500"
            />

            {/* 5. Total Customers */}
            <StatCard
                title="Total Customers"
                value={stats.customers}
                icon={FiUsers}
                color="text-orange-600 bg-orange-500"
            />
        </div>
    );
}
