export interface User {
    name: string;
    email: string;
}

export interface Category {
    id: string;
    category_name: string;
    category_description: string;
    is_active: boolean;
}

export interface FormStep {
    step: number;
    label: string;
}

export interface PersonalInformation {
    fullName: string;
    email: string;
}

export interface PasswordInformation {
    password: string;
    confirmPassword: string;
}

export interface LoginCredential {
    email: string;
    password: string;
}

export interface RegisterCredential {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}
