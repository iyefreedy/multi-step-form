import React, { ReactNode, createContext, useEffect, useState } from "react";

import API from "@/API";
import { LoginCredential, RegisterCredential, User } from "@/types";

interface IAuthContext {
    user: User | undefined;
    error: unknown;
    isLoading: boolean;
    attemptLogin: (credential: LoginCredential) => void;
    attemptLogout: () => void;
    attemptRegister: (credential: RegisterCredential) => void;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    error: undefined,
    user: undefined,
    isLoading: false,
    attemptLogin: () => {},
    attemptLogout: () => {},
    attemptRegister: () => {},
});

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token !== null) {
                    const authorizedUser = await API.getUserProfile(token);
                    console.log(authorizedUser);
                    setUser(authorizedUser);
                    setError(undefined);
                } else {
                    setUser(undefined);
                    setError("Session expired");
                }
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchUser();
    }, []);

    const attemptRegister = async (credential: RegisterCredential) => {
        try {
            const response = await API.register(credential);

            attemptLogin({
                email: response.email,
                password: response.password,
            });
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const attemptLogin = async (credential: LoginCredential) => {
        setIsLoading(true);
        try {
            const response = await API.login(credential);

            localStorage.setItem("token", response.token);

            const user = await API.getUserProfile(response.token);

            setUser(user);
        } catch (error) {
            setError((error as Error).message);
        }

        setIsLoading(false);
    };

    const attemptLogout = async () => {
        setIsLoading(true);
        try {
            const authToken = localStorage.getItem("token");

            await API.logout(authToken);

            localStorage.removeItem("token");

            setUser(undefined);
        } catch (error) {
            setError((error as Error).message);
        }

        setIsLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                isLoading,
                attemptLogin,
                attemptLogout,
                attemptRegister,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
