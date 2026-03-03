import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
    base: "text-sm h-12 rounded-lg disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center",

    variants: {
        structure: {
            primary: " text-white bg-blue-base hover:bg-blue-dark",
        },
    },

    defaultVariants: {
        structure: "primary",
    }
})

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>

export function Button({className, structure, children, ...props}: ButtonProps) {
    return (
        <button className={buttonVariants({className, structure})} {...props}>
            {children}
        </button>
    )
}