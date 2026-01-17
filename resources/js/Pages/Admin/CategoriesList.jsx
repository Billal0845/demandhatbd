import React from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayouts/AdminLayout";
import { FaSquarePlus } from "react-icons/fa6";
import { PiSigmaBold } from "react-icons/pi";

function CategoriesList({ categories = [] }) {
    console.log(categories.data[0]);
    const { delete: destroy } = useForm();
    const handleDelete = (e, id) => {
        e.preventDefault();
        destroy(`/admin/categories/${id}/delete`);
    };

    return (
        <div>
            <div className="flex font-poppins justify-between items-center">
                <Link
                    href={"/admin/categories/create"}
                    className="px-3 inline-flex gap-2 items-center dark:bg-green-700 py-2 rounded font-bold bg-blue-500 hover:bg-green-500 text-white"
                >
                    <span>
                        <FaSquarePlus size={20} />
                    </span>
                    Add Categories
                </Link>

                <div className="px-3 inline-flex gap-2 items-center py-2 rounded font-bold bg-blue-500 hover:bg-green-500 hover:cursor-not-allowed text-white">
                    <span>
                        <PiSigmaBold size={20} />
                    </span>
                    Total = {categories.total}
                </div>
            </div>
            <div className="w-full mt-4 overflow-x-auto">
                <table
                    border="1"
                    className="min-w-full bg-white dark:bg-gray-400 dark:text-black shadow-md rounded mb-4"
                >
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                ID
                            </th>
                            <th className="text-left p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                Category Name
                            </th>
                            <th className="text-right p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.map((category) => {
                            return (
                                <tr
                                    key={category.id}
                                    className="border-b border-sm border-gray-500 hover:bg-orange-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:text-white"
                                >
                                    <td className="p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                        {category.id}
                                    </td>
                                    <td className="p-2 px-3 sm:p-3 sm:px-5 text-sm sm:text-base">
                                        {category.name}
                                    </td>
                                    <td className="p-2 px-3 sm:p-3 sm:px-5">
                                        <div className="flex justify-end gap-1 sm:gap-2">
                                            <Link
                                                href={`/admin/categories/${category.id}/edit`}
                                                className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 sm:px-2 rounded"
                                            >
                                                Edit
                                            </Link>

                                            <form
                                                onSubmit={(e) =>
                                                    handleDelete(e, category.id)
                                                }
                                            >
                                                <button className="text-xs sm:text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-1 sm:px-2 rounded">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="dark:text-green-500   font-poppins font-bold">
                    Total {categories.total}
                </div>

                <div className="flex flex-wrap gap-1 justify-end">
                    {categories.links.map((link, index) => (
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
    );
}
CategoriesList.layout = (page) => (
    <AdminLayout children={page} title="Categories" />
);
export default CategoriesList;
