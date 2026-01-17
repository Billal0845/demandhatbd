import CustomerLayout from "@/Layouts/CustomerLayouts/CustomerLayout";
import { Link } from "@inertiajs/react";

function Categories({ categories = [] }) {
    const sortedCategories = [...categories].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    return (
        <div
            className="
                py-5 min-h-screen transition-colors duration-300
                bg-gradient-to-br from-[#f4f7f3] via-white to-[#eef3ec]
                dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
            "
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                {/* Header */}
                <div className="mb-4 text-center">
                    <h1 className="font-poppins text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Explore Categories
                    </h1>
                    <p className="mt-2 font-inter text-gray-600 dark:text-gray-400">
                        Browse products by category
                    </p>
                    <div className="mt-4 h-1 w-24 bg-[#658C58] mx-auto rounded-full"></div>
                </div>

                {/* Categories Grid */}
                {sortedCategories.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {sortedCategories.map((category) => (
                            <Link
                                key={category.id}
                                href={`category/${category.id}`}
                                className="group block"
                            >
                                <div
                                    className="
                                        h-full rounded-2xl p-5
                                        flex flex-col items-center justify-center text-center
                                        bg-white/90 dark:bg-gray-900/80
                                        backdrop-blur-xl
                                        border border-[#658C58] dark:border-green-500
                                        shadow-sm
                                        transition-all duration-300
                                        hover:-translate-y-1 hover:shadow-xl
                                    "
                                >
                                    {/* Icon */}
                                    <div
                                        className="
                                            mb-4 flex h-12 w-12 items-center justify-center rounded-full
                                            bg-[#658C58]
                                            text-white font-bold text-lg
                                            shadow-md
                                            transition-transform duration-300
                                            group-hover:scale-110
                                        "
                                    >
                                        {category.name.charAt(0)}
                                    </div>

                                    {/* Category Name */}
                                    <h3
                                        className="
                                            font-inter font-semibold
                                            text-gray-800 dark:text-gray-200
                                            transition-colors
                                            group-hover:text-[#658C58]
                                        "
                                    >
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-6xl mb-4">📂</div>
                        <p className="font-poppins text-lg text-gray-500 dark:text-gray-400">
                            No categories found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

Categories.layout = (page) => <CustomerLayout children={page} />;
export default Categories;
