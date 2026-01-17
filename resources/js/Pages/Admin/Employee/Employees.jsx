import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link, router } from "@inertiajs/react"; // Import Router for delete
import AdminLayout from "../../../Layouts/AdminLayouts/AdminLayout";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

function Employees({ employees = [] }) {
    // Add Delete Handler
    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this employee?")) {
            router.delete(`/admin/employees/${id}`, {
                onSuccess: () => {
                    toast.success("Deleted successfully!");
                },
            });
        }
    };

    return (
        <div>
            <div className="flex font-poppins justify-between items-center">
                <Link
                    href={"/admin/employee/create"}
                    className="px-3 inline-flex gap-2 items-center dark:bg-green-700 py-2 rounded font-bold bg-blue-500 hover:bg-green-500 text-white"
                >
                    <span>
                        <MdOutlinePersonAddAlt1 size={20} />
                    </span>
                    Add Staff
                </Link>

                <div className="px-3 inline-flex gap-2 items-center py-2 rounded font-bold bg-blue-500 hover:bg-green-500 hover:cursor-not-allowed text-white">
                    <span>
                        <HiOutlineUserGroup size={20} />
                    </span>
                    Total = {employees.total}
                </div>
            </div>

            <div className="w-full mt-4 overflow-x-auto">
                <table className="min-w-full bg-gray-300 dark:bg-gray-400 dark:text-black shadow-md rounded mb-4">
                    <thead className="bg-slate-700 text-gray-200">
                        <tr className="border-b">
                            <th className="text-left p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                ID
                            </th>
                            <th className="text-left p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                Name
                            </th>
                            <th className="text-center p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                Pending Orders
                            </th>
                            <th className="text-right p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {employees.data.map((employee) => {
                            return (
                                <tr
                                    key={employee.id}
                                    className="border-b font-inter border-sm border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <td className="p-1 px-3 sm:p-2 sm:px-5 text-sm sm:text-base">
                                        {employee.id}
                                    </td>
                                    <td className="p-1 px-3 sm:p-2 sm:px-5 text-sm sm:text-base">
                                        <div className="font-semibold">
                                            {employee.name}
                                        </div>
                                        <div className="text-sm capitalize dark:text-green-500 text-green-800 opacity-75">
                                            {employee.role}
                                        </div>
                                    </td>

                                    {/* HERE IS THE COUNT LOGIC */}
                                    <td className="p-1 px-3 sm:p-2 sm:px-5 text-sm sm:text-base text-center">
                                        {employee.assigned_orders_count > 0 ? (
                                            <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full dark:bg-gray-500 dark:text-white">
                                                {employee.assigned_orders_count}
                                            </span>
                                        ) : (
                                            <span className=" text-red-500">
                                                "No Order"
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-1 px-3 sm:p-2 sm:px-5">
                                        <div className="flex justify-end gap-1 sm:gap-2">
                                            <div className="flex gap-4 items-center">
                                                <Link
                                                    href={`/admin/employee/${employee.id}/edit`}
                                                    className="   p-2  sm:px-2 rounded"
                                                >
                                                    <IoEyeOutline
                                                        size={25}
                                                        className="text-red-500 hover:scale-110 "
                                                    />
                                                </Link>

                                                <form
                                                    onSubmit={(e) =>
                                                        handleDelete(
                                                            e,
                                                            employee.id,
                                                        )
                                                    }
                                                >
                                                    <button className=" bg-red-500 hover:bg-red-700 text-white py-1 px-1 sm:px-2 rounded">
                                                        <AiOutlineDelete
                                                            size={20}
                                                        />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="dark:text-green-500 font-poppins font-bold">
                    Total {employees.total}
                </div>

                <div className="flex flex-wrap gap-1 justify-end">
                    {employees.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            className={`md:px-3 px-2 py-1 md:py-1.5 text-sm rounded-md border dark:border-gray-700 
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
    );
}

Employees.layout = (page) => <AdminLayout children={page} />;
export default Employees;
