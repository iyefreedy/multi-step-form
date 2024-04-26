import { MouseEventHandler, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    children: ReactNode;
    type: "submit" | "button";
    className?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}

type ButtonRef = HTMLButtonElement;

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
    const className = twMerge(
        "py-1.5 px-4 bg-green-600 text-white rounded-md disabled:opacity-60",
        props.className,
    );

    return (
        <button
            ref={ref}
            type={props.type}
            className={className}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
});

export default Button;
