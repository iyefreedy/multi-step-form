import {
    Category,
    LoginCredential,
    LoginResponse,
    RegisterCredential,
    RegisterResponse,
    User,
} from "@/types";

const API_ENDPOINT = "https://library-crud-sample.vercel.app";

const defaultConfig = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

const apiService = {
    login: async (credential: LoginCredential): Promise<LoginResponse> => {
        const response = await fetch(`${API_ENDPOINT}/api/user/login`, {
            ...defaultConfig,
            method: "POST",
            body: JSON.stringify(credential),
        });

        if (!response.ok) {
            throw new Error("Invalid credential");
        }

        const data = await response.json();

        return data;
    },
    register: async (
        credential: RegisterCredential,
    ): Promise<RegisterResponse> => {
        const response = await fetch(`${API_ENDPOINT}/api/user/register`, {
            ...defaultConfig,
            method: "POST",
            body: JSON.stringify({
                name: credential.fullName,
                email: credential.email,
                password: credential.password,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to register");
        }

        const data = await response.json();

        return data;
    },
    logout: async (accessToken: string | null): Promise<{ status: string }> => {
        const response = await fetch(`${API_ENDPOINT}/api/user/logout`, {
            ...defaultConfig,
            method: "DELETE",
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to logout");
        }

        const data = await response.json();

        return data;
    },
    getUserProfile: async (accessToken: string): Promise<User> => {
        const response = await fetch(`${API_ENDPOINT}/api/user/profile`, {
            ...defaultConfig,
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get profile user");
        }

        const data = await response.json();

        return data;
    },
    getCategories: async (accessToken: string | null): Promise<Category[]> => {
        const response = await fetch(`${API_ENDPOINT}/api/category`, {
            ...defaultConfig,
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const categories = await response.json();

        return categories;
    },
    getCategoryById: async (
        id: string | undefined,
        accessToken: string | null,
    ): Promise<Category> => {
        const response = await fetch(`${API_ENDPOINT}/api/category/${id}`, {
            ...defaultConfig,
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
    },
    saveCategory: async (
        category: Omit<Category, "id">,
        accessToken: string | null,
    ): Promise<Category> => {
        const response = await fetch(`${API_ENDPOINT}/api/category/create`, {
            ...defaultConfig,
            method: "POST",
            body: JSON.stringify(category),
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
    },
    updateCategory: async (
        category: Category,
        accessToken: string | null,
    ): Promise<Category> => {
        const response = await fetch(`${API_ENDPOINT}/api/category/update`, {
            ...defaultConfig,
            method: "PUT",
            body: JSON.stringify(category),
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
    },
    deleteCategory: async (
        id: string | undefined,
        accessToken: string | null,
    ) => {
        const response = await fetch(`${API_ENDPOINT}/api/category/${id}`, {
            ...defaultConfig,
            method: "DELETE",
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return data;
    },
};

export default apiService;
