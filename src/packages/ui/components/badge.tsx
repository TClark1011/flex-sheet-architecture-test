import type { ComponentProps } from "@/packages/ui/internal/ui-utils";
import { colorSchemes, sizes, variants } from "@/packages/ui/internal/ui-utils";
import { cva, cx } from "class-variance-authority";
import { forwardRef } from "react";

type BadgeVariant = "solid" | "outline" | "ghost";

const badgeClassNames = cva("badge [&>svg]:mr-1", {
	variants: {
		...colorSchemes({
			primary: cx("badge-primary"),
			secondary: cx("badge-secondary"),
			accent: cx("badge-accent"),
			success: cx("badge-success"),
			warning: cx("badge-warning"),
			error: cx("badge-danger"),
			info: cx("badge-info"),
		}),
		...variants<BadgeVariant>({
			ghost: cx("badge-ghost"),
			outline: cx("badge-outline"),
			solid: "",
		}),
		...sizes({
			xs: cx("badge-xs [&>svg]:h-3"),
			sm: cx("badge-sm [&>svg]:h-3"),
			md: cx("badge-md [&>svg]:h-4"),
			lg: cx("badge-lg [&>svg]:h-5"),
		}),
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
	},
});

export type BadgeProps = ComponentProps<
	"span",
	typeof badgeClassNames,
	{
		icon?: JSX.Element;
	}
>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{ className, colorScheme, size, variant, children, icon, ...props },
		ref
	) => (
		<span
			className={cx(
				badgeClassNames({ size, variant, colorScheme, ...props }),
				className
			)}
			{...props}
			ref={ref}
		>
			{icon}
			{children}
		</span>
	)
);

Badge.displayName = "Badge";
