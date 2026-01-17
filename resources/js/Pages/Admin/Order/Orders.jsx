import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";
import OrdersFilter from "../../../components/AdminComponents/OrdersFilter";
import OrdersTable from "../../../components/AdminComponents/OrdersTable";
import Pagination from "../../../components/AdminComponents/Pagination";
import { FiX, FiUserPlus } from "react-icons/fi";

export default function Orders({
    orders,
    filters,
    employees,
    unassignedCount,
}) {
    // --- STATE MANAGEMENT ---

    // Edit Status Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Assignment Modal State
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    // --- FORMS ---

    // 1. Form for updating order status (Individual)
    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        reset: resetEdit,
        errors: editErrors,
    } = useForm({
        order_status: "",
        payment_status: "",
    });

    // 2. Form for Batch Assignment (Manager Feature)
    const {
        data: assignData,
        setData: setAssignData,
        post: postAssign,
        processing: assignProcessing,
        reset: resetAssign,
        errors: assignErrors,
    } = useForm({
        quantity: "",
        employee_id: "",
    });

    // --- HANDLERS ---

    // Edit Modal Handlers
    const openEditModal = (order) => {
        setSelectedOrder(order);
        setEditData({
            order_status: order.order_status,
            payment_status: order.payment_status,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedOrder(null);
        resetEdit();
    };

    const updateStatus = (e) => {
        e.preventDefault();
        put(`/admin/orders/${selectedOrder.id}/update`, {
            onSuccess: () => {
                closeEditModal();
            },
        });
    };

    // Assign Modal Handlers
    const handleAssignSubmit = (e) => {
        e.preventDefault();
        postAssign("/admin/orders/assign-batch", {
            onSuccess: () => {
                setIsAssignModalOpen(false);
                resetAssign();
            },
        });
    };

    return (
        <div className="pb-10 font-poppins relative">
            {/* 1. Header & Actions Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-2">
                {/* Filters */}
                <div className="w-full lg:w-auto flex-1">
                    <OrdersFilter
                        filters={filters}
                        employees={employees}
                        setIsEditModalOpen={setIsAssignModalOpen}
                    />
                </div>

                {/* Manager Action: Assign Button */}
                {/* Only show if employees list is passed (Admin/Manager check) */}
            </div>

            {/* 2. Table Section */}
            <OrdersTable
                orders={orders}
                filters={filters}
                onEditStatus={openEditModal}
            />

            {/* 3. Pagination Section */}
            <Pagination links={orders.links} total={orders.total} />

            {/* ========================================================= */}
            {/*                 MODAL 1: UPDATE STATUS                    */}
            {/* ========================================================= */}
            {isEditModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden animation-fade-in">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Update Order #{selectedOrder.id}
                            </h3>
                            <button
                                onClick={closeEditModal}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={updateStatus} className="p-6 space-y-4">
                            {/* Order Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Order Status
                                </label>
                                <select
                                    value={editData.order_status}
                                    onChange={(e) =>
                                        setEditData(
                                            "order_status",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">
                                        Processing
                                    </option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {editErrors.order_status && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {editErrors.order_status}
                                    </div>
                                )}
                            </div>

                            {/* Payment Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Payment Status
                                </label>
                                <select
                                    value={editData.payment_status}
                                    onChange={(e) =>
                                        setEditData(
                                            "payment_status",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                                {editErrors.payment_status && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {editErrors.payment_status}
                                    </div>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {editProcessing
                                        ? "Updating..."
                                        : "Update Status"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/*              MODAL 2: BATCH ASSIGN (NEW)                  */}
            {/* ========================================================= */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden animation-fade-in">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <FiUserPlus /> Assign Orders to Staff
                            </h3>
                            <button
                                onClick={() => setIsAssignModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={handleAssignSubmit}
                            className="p-6 space-y-5"
                        >
                            {/* Info Banner */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <span className="font-bold">
                                        Pending Unassigned Orders:{" "}
                                    </span>
                                    {unassignedCount !== undefined
                                        ? unassignedCount
                                        : "Loading..."}
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                                    The system will automatically select the
                                    oldest pending orders.
                                </p>
                            </div>

                            {/* Quantity Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    How many orders to assign?
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={unassignedCount || 1000}
                                    placeholder="e.g. 50"
                                    value={assignData.quantity}
                                    onChange={(e) =>
                                        setAssignData(
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                {assignErrors.quantity && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {assignErrors.quantity}
                                    </div>
                                )}
                            </div>

                            {/* Staff Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Assign to Staff
                                </label>
                                <select
                                    value={assignData.employee_id}
                                    onChange={(e) =>
                                        setAssignData(
                                            "employee_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                >
                                    <option value="">Select Employee...</option>
                                    {employees &&
                                        employees.map((emp) => (
                                            <option key={emp.id} value={emp.id}>
                                                {emp.name}
                                            </option>
                                        ))}
                                </select>
                                {assignErrors.employee_id && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {assignErrors.employee_id}
                                    </div>
                                )}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        assignProcessing ||
                                        unassignedCount === 0
                                    }
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
    );
}

Orders.layout = (page) => <AdminLayout children={page} />;
