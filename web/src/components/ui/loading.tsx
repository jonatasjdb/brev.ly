import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"

const loadingVariants = tv({
    slots: {
        container: "flex justify-center items-center",
        content: "flex flex-col items-center",
        spinner: "border-4 border-gray-200 border-t-blue-base rounded-full animate-spin",
        text: "text-sm text-gray-400"
    },
    variants: {
        size: {
            sm: {
                spinner: "w-4 h-4 border-2",
                text: "text-xs"
            },
            md: {
                spinner: "w-10 h-10 border-4",
                text: "text-sm"
            },
            lg: {
                spinner: "w-16 h-16 border-[6px]",
                text: "text-base"
            }
        },
        gap: {
            none: {
                content: "gap-0"
            },
            sm: {
                content: "gap-2"
            },
            md: {
                content: "gap-3"
            },
            lg: {
                content: "gap-4"
            }
        },
        border: {
          secondary: {
            spinner: " border-gray-300 border-t-blue-base"
          }
        }
    },
    defaultVariants: {
        size: "md",
        gap: "md"
    }
})

type LoadingProps = ComponentProps<"div"> & VariantProps<typeof loadingVariants>

export function Loading({
    children,
    size = "md",
    gap = "md",
    border,
    ...props
}: LoadingProps) {
    const { container, content, spinner, text: textStyle } = loadingVariants({ size, gap, border })

    return (
        <div className={container()} {...props}>
            <div className={content()}>
                <div className={spinner()} />
                {children && <span className={textStyle()}>{children}</span>}
            </div>
        </div>
    )
}