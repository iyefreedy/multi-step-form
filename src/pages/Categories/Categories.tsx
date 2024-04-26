import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Button from "@components/Button";
import ProgressIndicator from "@components/ProgressIndicator";

import { useAuth } from "@hooks/useAuth";
import { useFetchCategories } from "@hooks/useFetchCategories";

import Modal from "@/components/Modal";

type ActiveState = "all" | "active" | "inactive";

const Categories = () => {
    const { user } = useAuth();
    const { categories, isLoading, deleteCategory } = useFetchCategories();

    const [selectedActiveState, setSelectedActiveState] =
        useState<ActiveState>("all");
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [categoryId, setSelectedCategoryId] = useState<string>("");

    const memorizedCategories = useMemo(() => {
        const filteredCategories = categories.filter((category) => {
            if (selectedActiveState === "active") {
                return category.is_active;
            }

            if (selectedActiveState === "inactive") {
                return !category.is_active;
            }

            return category;
        });

        return filteredCategories;
    }, [selectedActiveState, categories]);

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const updatedActiveState = event.target.value as ActiveState;

        setSelectedActiveState(updatedActiveState);
    };

    if (!user) return <Navigate to={"/login"} replace />;

    if (isLoading)
        return (
            <div className="text-center">
                <ProgressIndicator className="h-12 w-12 text-green-600" />
            </div>
        );

    return (
        <>
            <div className="rounded-md bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold">Category List</h2>

                    <div className="flex w-full max-w-md items-center space-x-4">
                        <select
                            onChange={handleCategoryChange}
                            className="block w-full rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-base sm:leading-6"
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <Link
                            to={"/categories/create"}
                            type="button"
                            className="flex-shrink-0 rounded-md bg-green-600 p-2 text-sm text-white md:text-base"
                        >
                            Create category
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse overflow-x-scroll text-sm">
                        <thead>
                            <tr className="border-b border-b-slate-400">
                                <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium  text-slate-800">
                                    Name
                                </th>
                                <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium  text-slate-800">
                                    Description
                                </th>
                                <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium  text-slate-800"></th>
                                <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-medium  text-slate-800"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {memorizedCategories.map((category) => (
                                <tr key={category.id}>
                                    <td className="border-b border-slate-100  p-4 pl-8 text-slate-500">
                                        {category.category_name}
                                    </td>
                                    <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
                                        {category.category_description}
                                    </td>
                                    <td>
                                        {category.is_active ? (
                                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <XMarkIcon className="h-6 w-6 text-red-600" />
                                        )}
                                    </td>
                                    <td className="w-24">
                                        <div className=" flex items-center space-x-6">
                                            <Link
                                                to={`/categories/edit/${category.id}`}
                                            >
                                                Edit
                                            </Link>

                                            <Button
                                                type="button"
                                                className="bg-red-600"
                                                onClick={() => {
                                                    setSelectedCategoryId(
                                                        category.id,
                                                    );
                                                    setShowConfirmation(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onDelete={() => deleteCategory(categoryId)}
            />
        </>
    );
};

export default Categories;
