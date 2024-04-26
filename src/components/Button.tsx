import { MouseEventHandler, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    children: ReactNode;
    type: "submit" | "button";
    className?: string;
    onClick?: MouseEventHandler;
}

type ButtonRef = HTMLButtonElement;

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
    const className = twMerge(
        "py-1.5 px-4 bg-green-600 text-white rounded-md",
        props.className,
    );

    return (
        <button
            ref={ref}
            type={props.type}
            className={className}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
});

export default Button;
