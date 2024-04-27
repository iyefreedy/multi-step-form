import { ErrorMessage, Field } from "formik";
import React from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
    id?: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    name: string;
    className?: string;
    disabled?: boolean;
}

const InputField = ({
    id,
    name,
    label,
    type,
    className,

    disabled,
}: InputFieldProps) => {
    const mergedClassName = twMerge(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        className,
    );
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <Field
                id={id}
                name={name}
                type={type ?? "text"}
                className={mergedClassName}
                disabled={disabled}
            />
            <ErrorMessage
                name={name}
                className="text-red-600"
                component="div"
            />
        </div>
    );
};

export default InputField;
