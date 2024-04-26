import { useEffect, useState } from "react";

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

    const updateCategory = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const updatedCategory = await API.updateCategory(state, token);

            setState({ ...updatedCategory });
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    const setValue = (key: keyof Category, value: Category[keyof Category]) => {
        setState((previouseValues) => ({ ...previouseValues, [key]: value }));
    };

    return { category: state, isLoading, updateCategory, setValue };
};
