import React from "react";
import {
    FiDollarSign,
    FiShoppingBag,
    FiUsers,
    FiTrendingUp,
} from "react-icons/fi";

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="bg-white font-poppins dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                    {value}
                </h3>
            </div>
            <div className={`p-3 rounded-full ${color} bg-opacity-10 text-xl`}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.revenue)}
                icon={FiDollarSign}
                color="text-green-600 bg-green-500"
            />
            <StatCard
                title="Total Orders"
                value={stats.orders}
                icon={FiShoppingBag}
                color="text-blue-600 bg-blue-500"
            />
            <StatCard
                title="Avg. Order Value"
                value={formatCurrency(stats.aov)}
                icon={FiTrendingUp}
                color="text-purple-600 bg-purple-500"
            />
            <StatCard
                title="Total Customers"
                value={stats.customers}
                icon={FiUsers}
                color="text-orange-600 bg-orange-500"
            />
        </div>
    );
}
