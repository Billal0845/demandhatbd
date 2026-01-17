import React from "react";
import AdminLayout from "../../Layouts/AdminLayouts/AdminLayout";
import { useForm } from "@inertiajs/react";

function EditCategory({ category }) {
    const { data, setData, errors, patch, processing, wasSuccessful } = useForm(
        {
            name: category.name,
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/admin/categories/${category.id}/update`);
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex sm:w-1/2 sm:mx-auto flex-col p-2 gap-2">
                        <label className="dark:text-gray-100 font-bold">
                            Add Category Name
                        </label>

                        <input
                            className="p-2 text-black rounded dark:border-white border"
                            type="text"
                            required
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter Category"
                        />

                        {errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                        )}

                        <button
                            disabled={processing}
                            type="submit"
                            className="p-2 rounded hover:bg-green-600 bg-green-700 text-gray-200 font-bold"
                        >
                            {processing ? "Updating..." : "Update Category"}
                        </button>

                        {wasSuccessful && (
                            <div className="text-green-500">
                                Category updated successfully!
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

EditCategory.layout = (page) => (
    <AdminLayout children={page} title="Add Category" />
);

export default EditCategory;
