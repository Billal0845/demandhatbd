import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";
import OrdersFilter from "../../../components/AdminComponents/OrdersFilter";
import OrdersTable from "../../../components/AdminComponents/OrdersTable";
import Pagination from "../../../components/AdminComponents/Pagination";
import { FiX, FiUserPlus } from "react-icons/fi";
import axios from "axios";
import FraudCheckModal from "../../../components/AdminComponents/FraudCheckModal";
import toast from "react-hot-toast";
import CourierModal from "../../../components/AdminComponents/CourierModal";

export default function Orders({
    orders,
    filters,
    employees,
    unassignedCount,
}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    // Fraud Check Modal State
    const [isFraudModalOpen, setIsFraudModalOpen] = useState(false);
    const [fraudData, setFraudData] = useState(null);
    const [isFraudLoading, setIsFraudLoading] = useState(false);
    const [checkingPhone, setCheckingPhone] = useState("");

    //courier er state
    const [isCourierModalOpen, setIsCourierModalOpen] = useState(false);
    const [selectedCourierOrder, setSelectedCourierOrder] = useState(null);

    const openCourierModal = (order) => {
        setSelectedCourierOrder(order);
        setIsCourierModalOpen(true);
    };

    const handleCheckFraud = async (order) => {
        setCheckingPhone(order.phone);
        setIsFraudModalOpen(true);
        setIsFraudLoading(true);
        setFraudData(null);

        try {
            const response = await axios.get(
                `/admin/orders/${order.id}/check-fraud`,
            );
            setFraudData(response.data);
        } catch (error) {
            console.error("Fraud check failed", error);
            setFraudData({ status: "error", error: "Connection Failed" });
        } finally {
            setIsFraudLoading(false);
        }
    };

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        reset: resetEdit,
        errors: editErrors,
    } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        subtotal: "",
        delivery_fee: "",
        grand_total: "",
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
            name: order.name,
            email: order.email,
            phone: order.phone,
            address: order.address,
            subtotal: order.subtotal,
            delivery_fee: order.delivery_fee,
            grand_total: order.grand_total,
            order_status: order.order_status,
            payment_status: order.payment_status,
        });
        setIsEditModalOpen(true);
    };

    const handlePriceChange = (field, value) => {
        const val = parseFloat(value) || 0;
        setEditData((prev) => {
            const newData = { ...prev, [field]: val };
            newData.grand_total =
                (parseFloat(newData.subtotal) || 0) +
                (parseFloat(newData.delivery_fee) || 0);
            return newData;
        });
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
                toast.success("Order Edited Successfully.");
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
            {/* ========================================================= */}
            {/* 1. Header & Actions Section (Redesigned)                  */}
            {/* ========================================================= */}
            <div className="flex flex-col  justify-between items-start lg:items-center gap-4 mb-6">
                {/* Left Side: Filters */}
                <div className="w-full lg:flex-1">
                    <OrdersFilter
                        filters={filters}
                        employees={employees}
                        onAssignClick={() => setIsAssignModalOpen(true)}
                    />
                </div>
            </div>

            {/* 2. Table Section */}
            <OrdersTable
                orders={orders}
                filters={filters}
                onEditStatus={openEditModal}
                onCheckFraud={handleCheckFraud}
                onSendCourier={openCourierModal}
            />

            {/* 3. Pagination Section */}
            <Pagination links={orders.links} total={orders.total} />

            <CourierModal
                isOpen={isCourierModalOpen}
                onClose={() => setIsCourierModalOpen(false)}
                order={selectedCourierOrder}
            />

            {/* ========================================================= */}
            {/*                 MODAL 1: UPDATE STATUS                    */}
            {/* ========================================================= */}
            {isEditModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold dark:text-white">
                                Edit Order #{selectedOrder.id}
                            </h3>
                            <button
                                onClick={closeEditModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <form onSubmit={updateStatus} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Column 1: Customer Details */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-blue-600 uppercase">
                                        Customer Information
                                    </h4>
                                    <div>
                                        <label className="block text-sm font-medium dark:text-gray-300">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) =>
                                                setEditData(
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) =>
                                                    setEditData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                value={editData.phone}
                                                onChange={(e) =>
                                                    setEditData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium dark:text-gray-300">
                                            Address
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={editData.address}
                                            onChange={(e) =>
                                                setEditData(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Column 2: Status & Financials */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-purple-600 uppercase">
                                        Status & Financials
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
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
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            >
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="processing">
                                                    Processing
                                                </option>
                                                <option value="shipped">
                                                    Shipped
                                                </option>
                                                <option value="delivered">
                                                    Delivered
                                                </option>
                                                <option value="cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
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
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            >
                                                <option value="paid">
                                                    Paid
                                                </option>
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="failed">
                                                    Failed
                                                </option>
                                                <option value="refunded">
                                                    Refunded
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
                                                Subtotal
                                            </label>
                                            <input
                                                type="number"
                                                value={editData.subtotal}
                                                onChange={(e) =>
                                                    handlePriceChange(
                                                        "subtotal",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium dark:text-gray-300">
                                                Delivery Fee
                                            </label>
                                            <input
                                                type="number"
                                                value={editData.delivery_fee}
                                                onChange={(e) =>
                                                    handlePriceChange(
                                                        "delivery_fee",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                        <label className="block text-xs font-bold text-gray-500 uppercase">
                                            Grand Total
                                        </label>
                                        <span className="text-2xl font-bold text-blue-600">
                                            ৳
                                            {parseFloat(
                                                editData.grand_total,
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                                >
                                    {editProcessing
                                        ? "Saving..."
                                        : "Update Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/*              MODAL 2: BATCH ASSIGN                        */}
            {/* ========================================================= */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <FiUserPlus className="text-purple-500" />{" "}
                                Assign Orders to Staff
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
                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-md p-3">
                                <p className="text-sm text-purple-800 dark:text-purple-200">
                                    <span className="font-bold">
                                        Pending Unassigned Orders:{" "}
                                    </span>
                                    {unassignedCount !== undefined
                                        ? unassignedCount
                                        : "Loading..."}
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
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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

            <FraudCheckModal
                isOpen={isFraudModalOpen}
                onClose={() => setIsFraudModalOpen(false)}
                data={fraudData}
                isLoading={isFraudLoading}
                phone={checkingPhone}
            />
        </div>
    );
}

Orders.layout = (page) => <AdminLayout children={page} />;
