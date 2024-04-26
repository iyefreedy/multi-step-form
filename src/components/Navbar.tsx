import ProgressIndicator from "./ProgressIndicator";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

import Button from "@components/Button";

import { useAuth } from "@hooks/useAuth";

const Navbar = () => {
    const { user, isLoading, attemptLogout } = useAuth();

    const preventNavigate = (event: React.MouseEvent) => {
        if (isLoading) {
            event.preventDefault();
        }
    };

    return (
        <nav className="bg-white py-4 px-6 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link
                        to={"/categories"}
                        className="w-10 h-10 p-2 rounded-full transition border border-transparent focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
                    >
                        <BookOpenIcon className="w-6 h-6 text-sky-600" />
                    </Link>

                    {user && <div>Hi, {user.name}</div>}
                </div>

                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link
                                to={"/login"}
                                className={`font-medium ${isLoading && "opacity-60 cursor-auto"}`}
                                onClick={preventNavigate}
                            >
                                Login
                            </Link>
                            <Link
                                to={"/register"}
                                className={`font-medium px-4 py-1.5 bg-green-600 text-white rounded-md ${isLoading && "opacity-60 cursor-auto"}`}
                                onClick={preventNavigate}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <Button
                            type="button"
                            className={`inline-block w-32 bg-gray-600 ${isLoading && "opacity-60"}`}
                            onClick={isLoading ? undefined : attemptLogout}
                        >
                            {isLoading ? <ProgressIndicator /> : "Logout"}
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
