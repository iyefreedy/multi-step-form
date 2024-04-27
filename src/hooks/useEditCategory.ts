import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "@/API";
import { Category } from "@/types";

export const useEditCategory = (id: string | undefined) => {
    const [state, setState] = useState<Category>({
        id: "",
        category_name: "",
        category_description: "",
        is_active: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchCategory = async (id: string | undefined) => {
            setIsLoading(true);

            try {
                const token = localStorage.getItem("token");
                const category = await API.getCategoryById(id, token);

                setState({ ...category });
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetchCategory(id);
    }, [id]);

    const updateCategory = async (value: Category) => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const updatedCategory = await API.updateCategory(value, token);

            setState({ ...updatedCategory });
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);

        navigateTo("/categories");
    };

    const setValue = (key: keyof Category, value: Category[keyof Category]) => {
        setState((previouseValues) => ({ ...previouseValues, [key]: value }));
    };

    return { category: state, isLoading, updateCategory, setValue };
};
