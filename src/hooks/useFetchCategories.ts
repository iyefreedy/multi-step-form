import { useEffect, useState } from "react";

import API from "@/API";
import { Category } from "@/types";

export const useFetchCategories = () => {
    const [state, setState] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);

            try {
                const token = localStorage.getItem("token");
                const categories = await API.getCategories(token);

                setState(categories);
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetchCategories();
    }, []);

    const deleteCategory = async (id: string) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            await API.deleteCategory(id, token);

            const updatedCategories = state.filter(
                (category) => category.id !== id,
            );

            setState([...updatedCategories]);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return { categories: state, isLoading, deleteCategory };
};
