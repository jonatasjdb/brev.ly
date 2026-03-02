import type { ComponentProps, ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
    base: "rounded disabled:opacity-50 disabled:pointer-events-none",

    variants: {
        structure: {
            primary: "w-88 h-12 text-white bg-blue-base hover:bg-blue-dark",
            secondary: "flex items-center w-[70px] h-8 bg-gray-200 font-medium text-[12px] text-gray-500 hover:border hover:border-blue-base"
        },
    },

    defaultVariants: {
        structure: "primary",
    }
})

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    icon?: ReactNode
}

export function Button({className, structure, icon, children, ...props}: ButtonProps) {
    return (
        <button className={buttonVariants({className, structure})} {...props}>
        {structure === 'secondary' && icon &&(
            <span className="w-4 h-4 flex items-center justify-center ml-2 mr-1">{icon}</span>
        )}
        {children}
        </button>
    )
}