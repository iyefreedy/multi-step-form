import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";

interface InputFieldPasswordProps {
    id?: string;
    label?: string;
    name: string;
}

const InputFieldPassword = ({ id, label, name }: InputFieldPasswordProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword((previousValue) => !previousValue);
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="relative">
                <Field
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 px-4 py-2 text-gray-600 focus:outline-none"
                >
                    {showPassword ? (
                        <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                        <EyeIcon className="w-4 h-4" />
                    )}
                </button>
            </div>

            <ErrorMessage
                name={name}
                className="text-red-600"
                component="div"
            />
        </div>
    );
};

export default InputFieldPassword;
