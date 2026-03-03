import type { ComponentProps, ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const buttonVariants = tv({
    base: "rounded-lg disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 inline-flex items-center justify-center",

    variants: {
        variant: {
            primary: "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-700",
        },
        size: {
            sm: "p-1.5 text-xs",
            md: "p-2 text-sm",
            lg: "p-2.5 text-base",
        },
        fullWidth: {
            true: "w-full",
        },
    },

    defaultVariants: {
        variant: "primary",
        size: "md",
        fullWidth: false,
    },
})

type ButtonProps = ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        icon: ReactNode
        children?: ReactNode
    }

export function ButtonIcon({
    className,
    variant,
    size,
    fullWidth,
    icon,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonVariants({ variant, size, fullWidth, className })}
            {...props}
        >
            <span className={children ? "mr-2" : ""}>{icon}</span>
            {children && <span>{children}</span>}
        </button>
    )
}