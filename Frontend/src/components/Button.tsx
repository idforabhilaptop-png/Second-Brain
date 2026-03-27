import type { ReactElement } from "react"

interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement | React.ReactNode,
    endIcon?: ReactElement | React.ReactNode,
    onClick: () => void
}


const variantStyles = {
    primary: "bg-[#5046e4] text-white",
    secondary: "bg-[#e0e7ff] text-[#5046e4]",
};

const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};


const Button = (props: ButtonProps) => {
    const { variant = "primary", size, text, startIcon, endIcon, onClick } = props
    return <button
        onClick={onClick}
        className={`flex justify-center items-center rounded-md gap-4 hover:cursor-pointer font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
        {startIcon && <span>{startIcon}</span>}
        <span>{text}</span>
        {endIcon && <span>{endIcon}</span>}
    </button>
}

export default Button