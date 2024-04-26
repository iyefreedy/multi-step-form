import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "@/API";
import { Category } from "@/types";

export const useCreateCategory = () => {
    const [state, setState] = useState<Omit<Category, "id">>({
        category_name: "",
        category_description: "",
        is_active: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigateTo = useNavigate();

    const saveCategory = async (values: Omit<Category, "id">) => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const createdCategory = await API.saveCategory(values, token);

            setState({ ...createdCategory });
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);

        navigateTo("/categories");
    };

    const setValue = (key: keyof Category, value: Category[keyof Category]) => {
        setState((previouseValues) => ({ ...previouseValues, [key]: value }));
    };

    return { category: state, isLoading, saveCategory, setValue };
};
