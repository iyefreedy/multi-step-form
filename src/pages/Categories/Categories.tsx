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
                <ProgressIndicator className="w-12 h-12 text-green-600" />
            </div>
        );

    return (
        <>
            <div className="p-6 bg-white rounded-md shadow-md">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="font-bold text-lg">Category List</h2>

                    <div className="max-w-md w-full flex items-center space-x-4">
                        <select
                            onChange={handleCategoryChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6 sm:text-base"
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <Link
                            to={"/categories/create"}
                            type="button"
                            className="flex-shrink-0 p-2 text-white bg-green-600 rounded-md text-sm md:text-base"
                        >
                            Create category
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="border-collapse table-auto w-full text-sm overflow-x-scroll">
                        <thead>
                            <tr className="border-b border-b-slate-400">
                                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800  text-left">
                                    Name
                                </th>
                                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800  text-left">
                                    Description
                                </th>
                                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800  text-left"></th>
                                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-800  text-left"></th>
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
                                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <XMarkIcon className="w-6 h-6 text-red-600" />
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
