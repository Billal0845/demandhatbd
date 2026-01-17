import React from "react";
import AdminLayout from "../../Layouts/AdminLayouts/AdminLayout";
import { Form } from "@inertiajs/react";

function CategoryForm({ CategoryForm }) {
    return (
        <div>
            <div>
                <Form
                    action={"/admin/categories/store"}
                    method="post"
                    resetOnSuccess
                >
                    {({ errors, processing, wasSuccessful }) => (
                        <div className="flex font-poppins  sm:w-1/2  sm:mx-auto flex-col p-2 gap-2">
                            <label
                                htmlFor="category-name"
                                className=" dark:text-gray-100 font-bold"
                            >
                                Add Category Name
                            </label>
                            <input
                                className="p-2  dark:text-black rounded dark:border-white dark- "
                                type="text"
                                required
                                name="name"
                                placeholder="Enter Category"
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                            <button
                                disabled={processing}
                                className="p-2 rounded hover:bg-green-600 bg-green-700 text-gray-200 font-bold"
                            >
                                {processing ? "Saving..." : "Save Category"}
                            </button>
                            {wasSuccessful && (
                                <div className="text-green-500">
                                    Category created successfully!
                                </div>
                            )}
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}

CategoryForm.layout = (page) => (
    <AdminLayout children={page} title="Add Category" />
);

export default CategoryForm;
