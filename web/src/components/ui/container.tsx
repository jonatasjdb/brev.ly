import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const containerVariants = tv({
	base: "mx-auto",
	variants: {
		size: {
			md: "max-lg:flex max-lg:justify-center max-w-5xl px-6 py-10",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface ContainerProps
	extends VariantProps<typeof containerVariants>,
		React.ComponentProps<"div"> {
	as?: keyof React.JSX.IntrinsicElements;
}

export function Container({
	as = "div",
	className,
	children,
	...props
}: ContainerProps) {
	return React.createElement(
		as,
		{
			className: containerVariants({ size: "md", className }),
			...props,
		},
		children,
	);
}
