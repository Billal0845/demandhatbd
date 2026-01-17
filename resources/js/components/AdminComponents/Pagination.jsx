import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links, total }) {
    if (!links || links.length === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-950 px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between rounded-b-lg shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Orders: <span className="font-semibold">{total}</span>
            </div>

            <div className="flex flex-wrap gap-1 justify-end">
                {links.map((link, index) => (
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
    );
}
