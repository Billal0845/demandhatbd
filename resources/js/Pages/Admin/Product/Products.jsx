import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiMoreVertical,
    FiFilter,
} from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import AdminLayout from "@/Layouts/AdminLayouts/AdminLayout";

const Products = ({ products = [] }) => {
    const { delete: destroy, wasSuccessful } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        destroy(`/admin/products/${id}`, {
            onSuccess: () => {
                alert("Product Deleted successfully!");
                // Optionally clear image preview here
            },
        });
    };

    const stockStatus = (stock) => {
        if (stock > 5) {
            return "In Stock";
        } else if (stock <= 0) {
            return "Out of Stack";
        } else {
            return "Low Stock";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "In Stock": //in stack
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "Low Stock": //low stack
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "Out of Stack": // out of stack
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="pb-10">
            {/* Page Header */}
            <div className="flex font-poppins flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Products
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your product inventory
                    </p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                >
                    <FiPlus size={18} />
                    Add Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 placeholder-gray-400"
                        />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex gap-3">
                        <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Categories</option>
                            <option>Electronics</option>
                            <option>Furniture</option>
                            <option>Wearables</option>
                        </select>

                        <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Status</option>
                            <option>In Stock</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product List Table */}
            <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                {/* THE MAGIC WRAPPER: Handles horizontal scroll without breaking layout */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="p-4 border-b dark:border-gray-800">
                                    Product
                                </th>
                                <th className="p-4 border-b dark:border-gray-800">
                                    Category
                                </th>
                                <th className="p-4 border-b dark:border-gray-800">
                                    Stock
                                </th>
                                <th className="p-4 border-b dark:border-gray-800">
                                    Price
                                </th>
                                <th className="p-4 border-b dark:border-gray-800">
                                    Status
                                </th>
                                <th className="p-4 border-b dark:border-gray-800 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {products.data.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 border dark:border-gray-700">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ID: {product.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                        {product.category?.name}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                        {product.stock} units
                                    </td>
                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                                        {product.price}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${getStatusColor(
                                                stockStatus(product.stock)
                                            )}`}
                                        >
                                            {stockStatus(product.stock)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 transition-colors"
                                            >
                                                <FiEdit2 size={16} />
                                            </Link>
                                            <form
                                                onSubmit={(e) => {
                                                    handleDelete(e, product.id);
                                                }}
                                            >
                                                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-red-500 dark:text-red-400 transition-colors">
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-red-500">Total {products.total}</div>

                    <div className="flex flex-wrap gap-1 justify-end">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url ?? "#"}
                                className={`md:px-3 px-2 py-1 md:py-1.5 text-sm rounded-md border 
                    dark:border-gray-700 
                    ${
                        link.active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                    }
                    ${!link.url ? "opacity-50 cursor-default" : ""}
                `}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Products.layout = (page) => <AdminLayout children={page} />;

export default Products;
