import React from "react";
import AdminLayout from "../../Layouts/AdminLayouts/AdminLayout";
import { useForm } from "@inertiajs/react";

function EditCategory({ category }) {
    // 1. Add photo and _method to useForm
    const { data, setData, errors, post, processing, wasSuccessful } = useForm({
        name: category.name,
        photo: null,
        _method: "PATCH", // This tells Laravel to treat the POST as a PATCH
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 2. Use 'post' instead of 'patch' for file uploads
        post(`/admin/categories/${category.id}/update`);
    };

    return (
        <div className="py-6">
            <form onSubmit={handleSubmit}>
                <div className="flex sm:w-1/2 sm:mx-auto flex-col p-4 gap-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h2 className="text-xl font-bold dark:text-white">
                        Edit Category
                    </h2>

                    {/* Category Name */}
                    <div className="flex flex-col gap-1">
                        <label className="dark:text-gray-100 font-bold">
                            Category Name
                        </label>
                        <input
                            className="p-2 text-black rounded border border-gray-300"
                            type="text"
                            required
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter Category"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Category Photo */}
                    <div className="flex flex-col gap-1">
                        <label className="dark:text-gray-100 font-bold">
                            Category Image (Leave empty to keep current)
                        </label>

                        {/* Show Current Image Preview */}
                        {category.photo && (
                            <div className="mb-2">
                                <p className="text-xs text-gray-400">
                                    Current Image:
                                </p>
                                <img
                                    src={`/storage/${category.photo}`}
                                    alt="Current"
                                    className="w-20 h-20 object-cover rounded border"
                                />
                            </div>
                        )}

                        <input
                            className="p-2 dark:text-white border border-dashed rounded"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("photo", e.target.files[0])
                            }
                        />
                        {errors.photo && (
                            <div className="text-red-500 text-sm">
                                {errors.photo}
                            </div>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        type="submit"
                        className="p-2 rounded hover:bg-green-600 bg-green-700 text-gray-200 font-bold"
                    >
                        {processing ? "Updating..." : "Update Category"}
                    </button>

                    {wasSuccessful && (
                        <div className="text-green-500 font-bold">
                            Category updated successfully!
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

EditCategory.layout = (page) => (
    <AdminLayout children={page} title="Edit Category" />
);

export default EditCategory;
