import AdminLayout from "@/Layouts/AdminLayouts/AdminLayout";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link, useForm } from "@inertiajs/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

function Setting({ heroes = [], sections = [] }) {
    const { delete: destroy, wasSuccessful } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        destroy(`/admin/hero/${id}`, {
            onSuccess: () => {
                toast.success("Hero Image Deleted successfully!");
            },
        });
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
            {/* Page Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-center font-poppins text-slate-800 dark:text-gray-100">
                Customize the User Interface
            </h1>

            {/* ================= HERO SECTION SETTINGS ================= */}
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow border border-gray-200 dark:border-[#374151] p-5">
                <div className="flex justify-between my-2">
                    <h2 className="text-sm sm:text-xl font-semibold font-poppins text-slate-800 dark:text-gray-200 mb-4">
                        Hero Section Settings
                    </h2>
                    <Link
                        href={`/admin/addHeroImage`}
                        className="px-4 py-2 flex gap-1 items-center rounded bg-blue-600 text-gray-100 hover:bg-green-500"
                    >
                        <IoAddCircleOutline size={24} />{" "}
                        <span className="hidden sm:block">Add Image</span>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-[#374151] text-left">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Image
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {heroes.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        No hero images found
                                    </td>
                                </tr>
                            ) : (
                                heroes.map((hero) => (
                                    <tr
                                        key={hero.id}
                                        className="border-t border-gray-200 dark:border-[#374151]"
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={`/storage/${hero.image}`}
                                                alt="Hero"
                                                className="h-24 w-40 object-cover rounded-lg border dark:border-gray-600"
                                            />
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex gap-4">
                                                <Link
                                                    title="Edit"
                                                    href={`/admin/heroEdit/${hero.id}`}
                                                    className="text-blue-600 hover:bg-gray-200 p-2 rounded-full hover:text-blue-800 dark:text-blue-400"
                                                >
                                                    <MdEdit size={22} />
                                                </Link>

                                                <form
                                                    onSubmit={(e) => {
                                                        handleDelete(
                                                            e,
                                                            hero.id
                                                        );
                                                    }}
                                                >
                                                    <button
                                                        title="Delete"
                                                        className="  hover:bg-gray-200 p-2 rounded-full  text-red-500 dark:text-red-400 transition-colors"
                                                    >
                                                        <FiTrash2 size={20} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= LANDING PAGE SECTIONS ================= */}
            <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow border border-gray-200 dark:border-[#374151] p-5">
                <h2 className="text-sm sm:text-xl font-semibold font-poppins text-slate-800 dark:text-gray-200 mb-4">
                    Landing Page Sections Order
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-[#374151]">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Category ID
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Section Name
                                </th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sections.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                                    >
                                        No sections configured
                                    </td>
                                </tr>
                            ) : (
                                sections.map((section) => (
                                    <tr
                                        key={section.id}
                                        className="border-t border-gray-200 dark:border-[#374151]"
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                                            {section.category_id}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {section.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-4">
                                                <Link
                                                    href={`LandingSectionEdit/${section.id}`}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                >
                                                    <MdEdit size={22} />
                                                </Link>
                                                <Link
                                                    href={`LandingSectionDelete/${section.id}`}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400"
                                                >
                                                    <MdDelete size={22} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

Setting.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Setting;
