import React, { useState } from "react";
import { useForm } from "@inertiajs/react"; // Import this
import { FiUserPlus, FiX } from "react-icons/fi"; // Icons
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";
import OrdersFilter from "../../../components/AdminComponents/OrdersFilter";
import OrdersTable from "../../../components/AdminComponents/OrdersTable";
import Pagination from "../../../components/AdminComponents/Pagination";

// ADD employees and unassignedCount to props
export default function Orders({
    orders,
    filters,
    employees,
    unassignedCount,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // ... existing state ...
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    // Form for Batch Assignment
    const {
        data: assignData,
        setData: setAssignData,
        post: postAssign,
        processing: assignProcessing,
        reset: resetAssign,
    } = useForm({
        quantity: "",
        employee_id: "",
    });

    const handleAssignSubmit = (e) => {
        e.preventDefault();
        postAssign(route("admin.orders.assign_batch"), {
            onSuccess: () => {
                setIsAssignModalOpen(false);
                resetAssign();
                // Toast success is handled by flash props usually
            },
        });
    };

    return (
        <div className="pb-10 font-poppins relative">
            {/* Header Area with Assign Button */}
            <div className="flex justify-between items-center mb-6">
                <OrdersFilter filters={filters} />

                {/* Only show this button to Admins */}
                <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                    <FiUserPlus size={18} />
                    <span>Assign Orders</span>
                </button>
            </div>

            <OrdersTable
                orders={orders}
                filters={filters}
                onEditStatus={openEditModal}
            />

            <Pagination links={orders.links} total={orders.total} />

            {/* ========================================= */}
            {/*           ASSIGNMENT MODAL                */}
            {/* ========================================= */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Assign Orders to Staff
                            </h3>
                            <button
                                onClick={() => setIsAssignModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleAssignSubmit}
                            className="p-6 space-y-5"
                        >
                            {/* Information Banner */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
                                <span className="font-bold">
                                    Total Pending & Unassigned:
                                </span>{" "}
                                {unassignedCount} orders.
                                <br />
                                <span className="text-xs opacity-75">
                                    Selecting orders will prioritize the oldest
                                    pending orders first.
                                </span>
                            </div>

                            {/* Quantity Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Number of orders to assign
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={unassignedCount}
                                    value={assignData.quantity}
                                    onChange={(e) =>
                                        setAssignData(
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. 50"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            {/* Staff Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Assign to
                                </label>
                                <select
                                    value={assignData.employee_id}
                                    onChange={(e) =>
                                        setAssignData(
                                            "employee_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="">
                                        Select a staff member...
                                    </option>
                                    {employees &&
                                        employees.map((emp) => (
                                            <option key={emp.id} value={emp.id}>
                                                {emp.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        assignProcessing ||
                                        unassignedCount === 0
                                    }
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
                                >
                                    {assignProcessing
                                        ? "Assigning..."
                                        : `Transfer ${assignData.quantity || "0"} Orders`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ... Existing Edit Modal code ... */}
        </div>
    );
}
