import type { UIComponent } from "@/packages/ui/internal/forward-ref";
import { forwardRef } from "@/packages/ui/internal/forward-ref";
import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { colorSchemes, sizes, variants } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import type { PropsWithChildren } from "react";

export type ButtonVariant = "ghost" | "link" | "outline" | "glass" | "solid";

const buttonClassName = cva("btn", {
	variants: {
		...colorSchemes({
			primary: cx("btn-primary"),
			accent: cx("btn-accent"),
			secondary: cx("btn-secondary"),
			error: cx("btn-error"),
			info: cx("btn-info"),
			success: cx("btn-success"),
			warning: cx("btn-warning"),
		}),
		...variants<ButtonVariant>({
			solid: "",
			ghost: cx("btn-ghost"),
			link: cx("btn-link"),
			outline: cx("btn-outline"),
			glass: cx("glass"),
		}),
		...sizes({
			xs: cx("btn-xs [&>svg]:size-4 gap-0.5"),
			sm: cx("btn-sm [&>svg]:size-5 gap-1"),
			md: cx("btn-md [&>svg]:size-6 gap-1.5"),
			lg: cx("btn-lg [&>svg]:size-7 gap-2"),
		}),
		isLoading: {
			true: cx("loading"),
		},
		disabled: {
			true: cx("btn-disabled"),
		},
		noAnimation: {
			true: cx("no-animation"),
		},
		shape: {
			square: cx("btn-square"),
			circle: cx("btn-circle"),
		},
	},
	defaultVariants: {
		size: "md",
		variant: "solid",
	},
	compoundVariants: [
		// 'link' button variant does not support color schemes
		// out of the box, so we manually add the styles here
		{
			colorScheme: "primary",
			variant: ["ghost", "link"],
			className: cx("text-primary"),
		},
		{
			colorScheme: "accent",
			variant: ["ghost", "link"],
			className: cx("text-accent"),
		},
		{
			colorScheme: "secondary",
			variant: ["ghost", "link"],
			className: cx("text-secondary"),
		},
		{
			colorScheme: "error",
			variant: ["ghost", "link"],
			className: cx("text-error"),
		},
		{
			colorScheme: "info",
			variant: ["ghost", "link"],
			className: cx("text-info"),
		},
		{
			colorScheme: "success",
			variant: ["ghost", "link"],
			className: cx("text-success"),
		},
		{
			colorScheme: "warning",
			variant: ["ghost", "link"],
			className: cx("text-warning"),
		},
	],
});

export type ButtonProps = PropsWithChildren<
	ComponentProps<
		"button",
		typeof buttonClassName,
		{
			leftIcon?: JSX.Element;
			rightIcon?: JSX.Element;
		}
	>
>;

const buttonElement = "button";

export const Button: UIComponent<typeof buttonElement, ButtonProps> =
	forwardRef(
		(
			{
				children,
				className,
				leftIcon,
				rightIcon,
				size,
				variant,
				shape,
				noAnimation,
				disabled,
				isLoading,
				colorScheme,
				as: Component = buttonElement,
				...props
			},
			ref
		) => {
			return (
				<Component
					{...(Component === "button" && { type: "button" })}
					{...props}
					disabled={disabled}
					className={cx(
						buttonClassName({
							size,
							variant,
							shape,
							noAnimation,
							disabled,
							isLoading,
							colorScheme,
						}),
						className
					)}
					ref={ref}
				>
					{leftIcon}
					{children}
					{rightIcon}
				</Component>
			);
		}
	);

Button.displayName = "Button";
